/* eslint-disable no-console */
/**
 * $ npm run meta
 *
 * This script generates the tsx file which contains the component definitions data and hooks data scraped from JSdoc
 * comments.
 */
import fs from 'fs';
import path from 'path';

import * as TJS from 'typescript-json-schema';

import { ComponentMeta, TypeProperty, UtilityMeta, TypeMeta } from './build-meta-types';
import { jsDocParse } from './js-doc-parser';
import { kebabCase, prettyLint } from './utils';

const ENUM_SIZE_ORDER = [
    'x-small',
    'small',
    'medium',
    'base',
    'large',
    'x-large',
    'xx-large',
    'xxx-large',
    'xxxx-large',
    'xxxxx-large',
];

const { componentsDir, hooksDir, rootPath, metaFilePath } = {
    componentsDir: path.resolve(__dirname, '..', 'src'),
    hooksDir: path.resolve(__dirname, '..', 'src', 'hooks'),
    rootPath: path.resolve(__dirname, '..'),
    metaFilePath: path.resolve(__dirname, '..', 'src', 'meta.ts'),
} as const;

const componentFiles = fs
    .readdirSync(componentsDir)
    .filter((f) => f.endsWith('.tsx'))
    .map((fileName) => {
        const filePath = path.resolve(componentsDir, fileName);
        return {
            filePath,
            name: fileName.replace(/\.[^.]+$/, ''),
            fileName,
            content: fs.readFileSync(filePath, 'utf-8'),
        };
    });

function generateComponentMeta({
    filePath: componentFile,
    content,
    name,
}: {
    filePath: string;
    content: string;
    name: string;
}): ComponentMeta | null {
    const stats = fs.statSync(componentFile);

    const componentFunctionMatch = content.match(new RegExp(`function ${name}[(<]`));

    if (!componentFunctionMatch) {
        return null;
    }

    if (!content.includes(".bspkName = '")) {
        console.warn(`No bspkName found for component ${name} for ${componentFile}`);
        return null;
    }

    // eslint-disable-next-line no-useless-escape
    const allJSDocMatches = content.match(/\/\*\*\s*\n([^\*]|(\*(?!\/)))*\*\//g);

    const componentDocStr = [...(allJSDocMatches || [])].find((doc) => doc.includes(`@name ${name}`));

    if (!componentDocStr) {
        console.warn(`No JSDoc found for component ${name} for ${componentFile}`);
        return null;
    }

    const componentDoc = jsDocParse(componentDocStr);

    const slug = kebabCase(componentDoc.name);

    const dependencies = [...content.matchAll(/import { ([^}]+) } from '\.\/([a-zA-Z]+)';/g)]
        //
        ?.flatMap((d) => d.slice(1).flatMap((x) => x.split(', ')))
        .filter((d, i, arr) => arr.indexOf(d) === i);

    if (!dependencies?.length) {
        //console.info(`No dependencies OR CSS found for component ${name} for ${componentFile}`);
    }

    return {
        description: componentDoc.description,
        file: componentFile.split(componentsDir)[1],
        name,
        slug,
        dependencies,
        modified: stats.mtime.toISOString(),
    };
}

async function generateUtilityMeta(utilityFile: string): Promise<UtilityMeta | null> {
    const content = fs.readFileSync(utilityFile, 'utf-8');

    const fileName = path.basename(utilityFile).replace(/\.[^.]+$/, '');

    const utility = fileName;

    const comment = content.match(/\/\*\*[\s\S]+?\*\//);

    if (!comment?.[0]) {
        console.info(`No JSDoc found for hook ${utility} for ${hooksDir}/${utility}.tsx`);
        return null;
    }

    const utilityDoc = jsDocParse(comment[0]);

    if (!utilityDoc.example) {
        // console.info(`No example found for hook ${utility} for ${hooksDir}/${utility}.tsx`);
        return null;
    }

    return {
        description: utilityDoc.description,
        example: utilityDoc.example,
        file: utilityFile.split(componentsDir)[1],
        name: utility,
    };
}

function generateTypes() {
    const files = fs.readdirSync(componentsDir, { recursive: true, withFileTypes: true }).flatMap((f) => {
        if (!f.isFile()) return [];

        if (!f.name.endsWith('.tsx') && !f.name.endsWith('.ts')) return [];

        const content = fs.readFileSync(path.resolve(f.parentPath, f.name), 'utf-8');

        // we want to ignore some problematic utility components
        return content.includes('export type') || content.includes('export interface')
            ? [`${f.parentPath}/${f.name}`]
            : [];
    });

    const program = TJS.getProgramFromFiles(
        files,
        {
            module: 'ES2020',
            target: 'ES2020',
            lib: ['es5', 'dom'],
            sourceMap: true,
            jsx: 'react-jsx',
            moduleResolution: 'node',
            noImplicitReturns: true,
            noImplicitThis: true,
            noImplicitAny: true,
            strictNullChecks: true,
            esModuleInterop: true,
            baseUrl: '.',
        },
        rootPath,
    );

    const generator = TJS.buildGenerator(program, {
        required: true,
        defaultProps: true,
        noExtraProps: false,
    })!;

    const symbols = generator.getSchemaForSymbols(generator.getMainFileSymbols(program), true);

    const definitions = symbols.definitions as {
        [key: string]: TJS.Definition;
    };

    // fs.writeFileSync(`./.scripts/symbols.json`, JSON.stringify({ generated: new Date(), definitions }, null, 4));

    const nextTypes: TypeMeta[] = [];

    const cleanUpDefinitionEnums = (def: TJS.Definition): number[] | string[] | undefined => {
        // IF all enums are numerical, fix numerical sorting
        if (def.enum?.every((e) => typeof e === 'number')) {
            def.enum.sort((a, b) => a - b);
            return def.enum;
        }

        const defEnum = def.enum?.flatMap((e) => (typeof e === 'string' ? e : e?.toString() || []));
        if (!defEnum || !defEnum.length) return undefined;

        if (defEnum.some((e) => ENUM_SIZE_ORDER.includes(e)))
            defEnum.sort((a, b) => ENUM_SIZE_ORDER.indexOf(a) - ENUM_SIZE_ORDER.indexOf(b));

        return defEnum;
    };

    const defineProperty = (
        name: string,
        definition: TJS.DefinitionOrBoolean,
        required?: string[],
    ): TypeProperty | undefined => {
        if (typeof definition !== 'object') return undefined;

        const next: TypeProperty = {
            name,
            required: required?.includes(name),
            description: definition.description,
            default: definition.default === 'undefined' ? undefined : definition.default,
            type: definition.type,
            properties:
                definition.properties &&
                Object.entries(definition.properties)?.flatMap(
                    ([name2, definition2]) => defineProperty(name2, definition2, definition.required) || [],
                ),
            minimum: definition.minimum,
            maximum: definition.maximum,
        };

        const defEnum = cleanUpDefinitionEnums(definition);

        if (defEnum) {
            next.type = defEnum?.map((e) => e?.toString());
            next.options = defEnum;
        }

        if (definition.$ref) {
            next.type = definition.$ref.split('/').pop() as string;

            if (definitions[next.type]) {
                next.options = cleanUpDefinitionEnums(definitions[next.type]);
            }
        }

        return next;
    };

    if (definitions)
        Object.entries(definitions).forEach(([definitionName, definition]) => {
            if (typeof definition !== 'object') return;

            if (!definition?.properties && !definition?.allOf) return;

            if (['React', 'Omit<'].some((n) => definitionName.startsWith(n))) return;

            let properties: TypeProperty[] = [];

            if (definition.allOf) {
                properties = definition.allOf.flatMap((ofDefinition) => {
                    if (typeof ofDefinition !== 'object') return [];

                    if (ofDefinition.properties) {
                        return Object.entries(ofDefinition.properties).flatMap(
                            ([refName, refDefinition]) =>
                                defineProperty(refName, refDefinition, ofDefinition.required) || [],
                        );
                    }

                    if (!ofDefinition['$ref']) return [];

                    const reference = ofDefinition['$ref'].substring(14);

                    const defReference = definitions[reference];

                    if (!defReference) return [];

                    return Object.entries(defReference.properties || {}).flatMap(
                        ([refName, refDefinition]) =>
                            defineProperty(refName, refDefinition, defReference.required) || [],
                    );
                });
            }

            if (definition.properties) {
                const props = definition.properties as Record<string, TJS.Definition>;
                const hasDescription = Object.values(props).some((p) => p.description);
                if (!hasDescription) {
                    // probably a type that is only used as a reference
                    // console.error(`${definitionName} has no description`);
                    return;
                }
                properties = Object.entries(props).flatMap(
                    ([propName, prop]) => defineProperty(propName, prop, definition.required) || [],
                );
            }

            nextTypes.push({
                name: definitionName,
                properties,
                id: kebabCase(definitionName),
                description: definition.description,
            });
        });

    // we don't reference types that have names less than 3 characters long
    const nextTypeNames = nextTypes.flatMap((t) => (t.name.length > 3 ? t.name : []));

    nextTypes.forEach((nextType) => {
        const references = nextType.properties
            ?.flatMap((prop) =>
                nextTypeNames.filter((name) => prop.description?.includes(name) || prop.type?.includes(name)),
            )
            ?.filter((name, index, arr) => arr.indexOf(name) === index);

        if (references && references.length > 0) nextType.references = references;
    });

    const duplicateIds = nextTypes.flatMap((t) => t.id).filter((id, index, arr) => arr.indexOf(id) !== index);

    if (duplicateIds.length > 0) {
        console.error(`Duplicate IDs found: ${duplicateIds.join(', ')}`);
        console.error('Please fix the IDs in the components.');
        process.exit(1);
    }

    return nextTypes;
}

async function createMeta() {
    const componentsMeta: ComponentMeta[] = componentFiles
        .flatMap((component) => generateComponentMeta(component) || [])
        // filter out dependencies that aren't components
        .map((m, _, arr): ComponentMeta => {
            return {
                ...m,
                dependencies: m.dependencies?.filter((d) => arr.find((c) => c.name === d)),
            };
        });

    componentsMeta.sort((a, b) => a.name.localeCompare(b.name));

    const hookFiles = fs
        .readdirSync(hooksDir)
        .map((f) => `${hooksDir}/${f}`)
        .filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'));

    const metaComponentNames: string[] = componentsMeta.map((m) => m.name);

    const utilitiesMeta: UtilityMeta[] = [];
    for (const hookFile of hookFiles) {
        const elementMeta = await generateUtilityMeta(hookFile);
        if (elementMeta) utilitiesMeta.push(elementMeta);
    }
    utilitiesMeta.sort((a, b) => a.name.localeCompare(b.name));

    const typesMeta = generateTypes();
    typesMeta.sort((a, b) => a.name.localeCompare(b.name));

    fs.writeFileSync(
        metaFilePath,
        [
            `/** This file is generated by the ./scripts/build-meta.ts script. This file contains data scraped from the library. */`,

            fs.readFileSync(path.resolve(__dirname, 'build-meta-types.ts'), { encoding: 'utf-8' }),

            `export const componentsMeta: ComponentMeta[] = ${JSON.stringify(componentsMeta, null, 2)} as const;`,

            `export const utilitiesMeta: UtilityMeta[] = ${JSON.stringify(utilitiesMeta, null, 2)} as const;`,

            `export const typesMeta: TypeMeta[] = ${JSON.stringify(typesMeta, null, 2)} as const;`,

            `export type MetaTypeName = '${typesMeta.map((t) => t.name).join("' | '")}';`,

            `export type MetaComponentName = '${metaComponentNames.join("' | '")}';`,
        ].join('\n\n'),
    );

    prettyLint(metaFilePath);

    console.info('Create meta complete.');

    return {
        componentsMeta,
        utilitiesMeta,
        typesMeta,
    };
}

async function main() {
    await createMeta();

    process.exit(0);
}

main();

export {};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
