/* eslint-disable no-console */
/**
 * $ npm run meta
 *
 * This script generates the meta file which contains the information about the component, hooks, and utilities. This
 * file scrapes from the JSdoc and also the Typescript types.
 *
 * The output file should not be included in this repo. ⚡️
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import * as TJS from 'typescript-json-schema';

import { ComponentMeta, TypeProperty, UtilityMeta, TypeMeta } from './meta-types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { componentsDir, hooksDir, rootPath } = {
    componentsDir: path.resolve(__dirname, 'src'),
    hooksDir: path.resolve(__dirname, 'src', 'hooks'),
    rootPath: path.resolve(__dirname),
} as const;

function jsDocParse(content: string) {
    try {
        const contentTrimmed = content
            .trim()
            .replace(/^\/\*\*/, '')
            .replace(/\*\/$/, '');

        const chunks: string[] = contentTrimmed.replace(/\n\s*\* @/g, '&&split&&%%variable%%').split('&&split&&');

        const data: Record<string, string> = {};

        chunks.forEach((chunk) => {
            if (chunk.startsWith('%%variable%%')) {
                const chunkMatch = [...(chunk.match(/^%%variable%%([^\s]+)\s(.*)/s) || [])];

                if (!chunkMatch) throw new Error(`Unable to process chunk.`);

                const [, key, value] = chunkMatch;

                if (!value) return;

                data[key] = value
                    .replace(/\n[ ]+\*([ ]*)/g, '\n')
                    .replace(/^\s+\*\s+/, '')
                    .trim()
                    .replace(/;$/, '');

                return;
            }

            data.description = chunk
                .replace(/\n[ ]+\*([ ]*)/g, '\n')
                .replace(/(\S)\n(\S)/g, (_, a, b) => `${a} ${b}`)
                .trim();
        });

        return data;
    } catch (error) {
        console.error(error);
        return {};
    }
}

async function pretty(filePath: string) {
    execSync(`npx prettier --write "${filePath}"`, { stdio: 'inherit' });
}

function kebabCase(str: string): string {
    return (
        str
            .normalize('NFD') // Normalize to decompose accents
            .replace(/[\u0300-\u036f&()']/g, '') // Remove accents
            // Handle camelCase by inserting hyphens between lowercase and uppercase
            .replace(/([a-zA-Z])([A-Z][a-z])/g, '$1-$2')
            // do it again for the next uppercase letter
            .replace(/([a-zA-Z])([A-Z][a-z])/g, '$1-$2')
            .replace(/[^a-zA-Z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/^-+|-+$/g, '') // Trim leading or trailing hyphens
            .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
            .toLowerCase()
    ); // Convert to lowercase
}

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

const metaFileDirectory = process.argv.find((arg) => arg.startsWith('out='))?.substring(4) || '';

const fileChanged = process.argv.find((arg) => arg.startsWith('update='))?.substring(7) || '';

const uiHash = process.argv.find((arg) => arg.startsWith('hash='))?.substring(5) || '';

const build = process.argv.find((arg) => arg.startsWith('build='))?.substring(6) || '0';

if (!metaFileDirectory) {
    console.error('Please provide a path to the meta file.');
    process.exit(1);
}

const componentFiles = fs.readdirSync(componentsDir).flatMap((fileName) => {
    if (!fileName.endsWith('.tsx')) return [];

    const filePath = path.resolve(componentsDir, fileName);

    if (fileChanged && !filePath.includes(fileChanged)) return [];

    const content = fs.readFileSync(filePath, 'utf-8');
    return {
        filePath,
        name: fileName.replace(/\.[^.]+$/, ''),
        fileName,
        content,
        // eslint-disable-next-line no-useless-escape
        jsDocs: content.match(/\/\*\*\s*\n([^\*]|(\*(?!\/)))*\*\//g)?.map((jsDoc) => {
            const doc = jsDocParse(jsDoc);
            return {
                id: kebabCase(doc.description),
                ...doc,
            } as Record<string, string>;
        }),
    };
});

type ComponentFile = (typeof componentFiles)[0];

fs.writeFileSync(path.resolve(__dirname, 'component-files.json'), JSON.stringify(componentFiles, null, 2), {
    encoding: 'utf-8',
});

function generateComponentMeta({
    filePath: componentFile,
    content,
    name,
    jsDocs,
}: ComponentFile): ComponentMeta | null {
    const componentFunctionMatch = content.match(new RegExp(`function ${name}[(<]`));

    if (!componentFunctionMatch) {
        return null;
    }

    if (!content.includes(".bspkName = '")) {
        console.warn(`No bspkName found for component ${name} for ${componentFile}`);
        return null;
    }

    const componentDoc = [...(jsDocs || [])].find((doc) => doc.name === name);

    if (!componentDoc) {
        console.warn(`No JSDoc found for component ${name} for ${componentFile}`);
        return null;
    }

    const slug = kebabCase(componentDoc.name);

    const dependencies = [...content.matchAll(/import { ([^}]+) } from '\.\/([a-zA-Z]+)';/g)]
        //
        ?.flatMap((d) => d.slice(1).flatMap((x) => x.split(', ')))
        .filter((d, i, arr) => arr.indexOf(d) === i);

    if (!dependencies?.length) {
        //console.info(`No dependencies OR CSS found for component ${name} for ${componentFile}`);
    }

    const cssPath = path.join(componentsDir, `${slug}.scss`);

    const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, { encoding: 'utf-8' }) : '';

    const usage = componentDoc.example
        ? {
              code: componentDoc.example,
              description: componentDoc.exampleDescription,
          }
        : undefined;

    return {
        description: componentDoc.description,
        file: componentFile.split(componentsDir)[1],
        name,
        slug,
        dependencies,
        usage,
        css,
        hasTouchTarget: css.includes('data-touch-target'),
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

        const filePath = path.resolve(f.parentPath, f.name);

        if (fileChanged && !filePath.includes(fileChanged)) return [];

        const content = fs.readFileSync(filePath, 'utf-8');

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

    const { definitions } = generator.getSchemaForSymbols(generator.getMainFileSymbols(program), true);

    fs.writeFileSync(path.resolve(__dirname, 'types.json'), JSON.stringify(definitions, null, 2));

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
        definition: TJS.Definition,
        required: string[],
        context: {
            componentFile: ComponentFile | null;
            parent: string;
        },
    ): TypeProperty | undefined => {
        // the auto-generated types aren't always correct, so we need to fix them
        const jsDoc = definition.description
            ? context.componentFile?.jsDocs?.find(({ id }) => id === kebabCase(definition.description!))
            : undefined;

        const next: TypeProperty = {
            name,
            required: required?.includes(name),
            description: jsDoc?.description || definition.description,
            default: definition.default === 'undefined' ? undefined : definition.default,
            type: definition.type?.toString(),
            exampleType: jsDoc?.exampleType,
            minimum: definition.minimum,
            maximum: definition.maximum,
            options: jsDoc?.options?.split(',').map((o) => o.trim()),
            example: jsDoc?.example,
        };

        if (next.name.match(/^on[A-Z]/)) next.type = 'function';

        const defEnum = cleanUpDefinitionEnums(definition);

        if (defEnum) {
            next.type = defEnum?.map((e) => e?.toString());
            next.options = defEnum;
        }

        if (definition.$ref) {
            next.type = definition.$ref.split('/').pop() as string;

            if (definitions && definitions[next.type] && typeof definitions[next.type] !== 'boolean') {
                next.options = cleanUpDefinitionEnums(definitions[next.type] as TJS.Definition) || next.options;
            }
        }

        return next;
    };

    if (definitions)
        Object.entries(definitions).forEach(([definitionName, definition]) => {
            if (typeof definition !== 'object') return;

            let componentFile: ComponentFile | null = null;
            // only care about ComponentProps
            if (definitionName.endsWith('Props')) {
                componentFile =
                    componentFiles.find((f) => f.fileName === `${definitionName.replace(/Props$/, '')}.tsx`) || null;
            }

            const context = { componentFile, parent: definitionName };

            if (!definition?.properties && !definition?.allOf) return;

            if (['React', 'Omit<'].some((n) => definitionName.startsWith(n))) return;

            let properties: TypeProperty[] = [];

            if (definition.allOf) {
                properties = definition.allOf.flatMap((ofDefinition) => {
                    if (typeof ofDefinition !== 'object') return [];

                    if (ofDefinition.properties) {
                        return Object.entries(ofDefinition.properties).flatMap(([refName, refDefinition]) =>
                            typeof refDefinition !== 'object'
                                ? []
                                : defineProperty(refName, refDefinition, ofDefinition.required || [], context) || [],
                        );
                    }

                    if (!ofDefinition['$ref']) return [];

                    const reference = ofDefinition['$ref'].substring(14);

                    const defReference = definitions[reference];

                    if (typeof defReference === 'boolean') return [];

                    return Object.entries(defReference.properties || {}).flatMap(([refName, refDefinition]) => {
                        return typeof refDefinition !== 'object'
                            ? []
                            : defineProperty(refName, refDefinition, defReference.required || [], context) || [];
                    });
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
                    ([propName, prop]) => defineProperty(propName, prop, definition.required || [], context) || [],
                );
            }

            nextTypes.push({
                name: definitionName,
                properties,
                id: kebabCase(definitionName),
                description: definition.description,
                components: componentFile?.name ? [componentFile.name] : [],
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

        if (!references || references.length === 0) return;

        nextType.references = references;

        if (!nextType.components || nextType.components.length === 0) return;

        nextTypes
            .filter((t) => references.includes(t.name))
            .forEach((t) => {
                t.components = t.components || [];
                t.components.push(...nextType.components!);
            });
    });

    const duplicateIds = nextTypes.flatMap((t) => t.id).filter((id, index, arr) => arr.indexOf(id) !== index);

    if (duplicateIds.length > 0) {
        console.error(`Duplicate IDs found: ${duplicateIds.join(', ')}`);
        console.error('Please fix the IDs in the components.');
        process.exit(1);
    }

    return nextTypes;
}

let componentsMeta: ComponentMeta[] = [];
async function createMeta() {
    componentsMeta = componentFiles
        .flatMap((component) => generateComponentMeta(component) || [])
        // filter out dependencies that aren't components
        .map((m, _, arr): ComponentMeta => {
            return {
                ...m,
                dependencies: m.dependencies?.filter((d) => arr.find((c) => c.name === d)),
            };
        });

    componentsMeta.sort((a, b) => a.name.localeCompare(b.name));

    const hookFiles = fs.readdirSync(hooksDir).flatMap((f) => {
        if (!f.endsWith('.tsx') && !f.endsWith('.ts')) return [];

        const filePath = path.resolve(hooksDir, f);

        if (fileChanged && !filePath.includes(fileChanged)) return [];

        return filePath;
    });

    const metaComponentNames: string[] = componentsMeta.map((m) => m.name);

    const utilitiesMeta: UtilityMeta[] = [];
    for (const hookFile of hookFiles) {
        const elementMeta = await generateUtilityMeta(hookFile);
        if (elementMeta) utilitiesMeta.push(elementMeta);
    }
    utilitiesMeta.sort((a, b) => a.name.localeCompare(b.name));

    const typesMeta = generateTypes();
    typesMeta.sort((a, b) => a.name.localeCompare(b.name));

    const componentImport = (name: string) =>
        `${name}: React.lazy(() => import('@bspk/ui/${name}').then((module) => ({ default: module.${name} })))`;

    const uiVersion = `${execSync('npm view @bspk/ui version', { encoding: 'utf-8' }).trim()}`;

    let mode = 'production';

    if (uiHash === 'local' || process.env.DEV_GIT_TOKEN) {
        mode = 'development';
        console.info(`Development meta build.`);
    } else {
        console.info(`Production meta build.`);
    }

    const metaJsonPath = path.join(metaFileDirectory, 'meta.json');

    const updateJsonOnly = fileChanged && fs.existsSync(metaJsonPath);

    if (updateJsonOnly) {
        const {
            componentsMeta: previousComponentMeta,
            utilitiesMeta: previousUtilitiesMeta,
            typesMeta: previousTypesMeta,
        } = JSON.parse(fs.readFileSync(metaJsonPath, { encoding: 'utf-8' })) as {
            componentsMeta: ComponentMeta[];
            utilitiesMeta: UtilityMeta[];
            typesMeta: TypeMeta[];
        };

        const updatedMeta = {
            componentsMeta,
            utilitiesMeta,
            typesMeta,
        };

        updatedMeta.componentsMeta.forEach((component) => {
            const existingIndex = previousComponentMeta.findIndex((c: ComponentMeta) => c.name === component.name);

            if (existingIndex !== -1) {
                previousComponentMeta[existingIndex] = component;
            } else {
                previousComponentMeta.push(component);
            }
        });

        updatedMeta.utilitiesMeta.forEach((utility) => {
            const existingIndex = previousUtilitiesMeta.findIndex((u: UtilityMeta) => u.name === utility.name);

            if (existingIndex !== -1) {
                previousUtilitiesMeta[existingIndex] = utility;
            } else {
                previousUtilitiesMeta.push(utility);
            }
        });

        updatedMeta.typesMeta.forEach((type) => {
            const existingIndex = previousTypesMeta.findIndex((t: TypeMeta) => t.name === type.name);

            if (existingIndex !== -1) {
                previousTypesMeta[existingIndex] = type;
            } else {
                previousTypesMeta.push(type);
            }
        });

        fs.writeFileSync(
            metaJsonPath,
            JSON.stringify(
                {
                    LAST_UPDATED: new Date().toISOString(),
                    VERSION: uiVersion,
                    UI_HASH: uiHash,
                    BUILD: build,
                    MODE: mode,
                    componentsMeta: previousComponentMeta,
                    utilitiesMeta: previousUtilitiesMeta,
                    typesMeta: previousTypesMeta,
                },
                null,
                2,
            ),
        );

        console.info('Update meta complete.');
        process.exit(0);
    }

    fs.writeFileSync(
        metaJsonPath,
        JSON.stringify(
            {
                LAST_UPDATED: new Date().toISOString(),
                VERSION: uiVersion,
                UI_HASH: uiHash,
                BUILD: build,
                MODE: mode,
                componentsMeta,
                utilitiesMeta,
                typesMeta,
            },
            null,
            2,
        ),
    );

    const examplesFilePath = path.join(metaFileDirectory, 'examples.ts');

    const componentsWithExamples = componentFiles.filter(({ name }) =>
        fs.existsSync(path.resolve(__dirname, 'src', 'demo', 'examples', `${name}.tsx`)),
    );

    fs.writeFileSync(
        examplesFilePath,
        `${componentsWithExamples
            .map(({ name }) => `import { ${name}Example as ${name} } from '@bspk/ui/demo/examples/${name}';`)
            .join('\n')}
import { ComponentExample, ComponentExampleFn } from '@bspk/ui/demo/utils';
import { MetaComponentName } from 'src/meta';

export const examples: Partial<Record<MetaComponentName, ComponentExample<any> | ComponentExampleFn<any>>> = {
${componentsWithExamples.map(({ name }) => `    ${name},`).join('\n')}
}`,
    );

    pretty(examplesFilePath);

    const metaFilePath = path.join(metaFileDirectory, 'meta.ts');

    fs.writeFileSync(
        metaFilePath,
        [
            `import React from 'react';
import meta from 'src/meta.json';

export const componentsMeta = meta.componentsMeta as ComponentMeta[];
export const utilitiesMeta = meta.utilitiesMeta as UtilityMeta[];
export const typesMeta = meta.typesMeta as TypeMeta[];
export const MODE = meta.MODE as 'development' | 'production';
export const UI_HASH = meta.UI_HASH as string;
export const VERSION = meta.VERSION as string;
export const BUILD = meta.BUILD as string;`,

            fs.readFileSync(path.resolve(__dirname, 'meta-types.ts'), { encoding: 'utf-8' }),

            `export type MetaComponentName = '${metaComponentNames.join("' | '")}';`,

            `export const components: Partial<Record<MetaComponentName, React.LazyExoticComponent<any>>> = {${metaComponentNames.map(componentImport).join(',')}\n};`,
        ].join('\n\n'),
    );

    pretty(metaFilePath);

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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
