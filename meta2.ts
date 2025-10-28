/* eslint-disable no-console */
/**
 * Generates TypeMeta data by running TypeDoc on the source files and parsing the output JSON.
 *
 * $ npx tsx meta2.ts
 */
import { execSync } from 'child_process';
import fs from 'fs';
import { findItems, getTags, Item, kebabCase } from './meta-utils';
import { TypeMeta, TypeProperty } from './src/types/meta';

// const original = JSON.parse(fs.readFileSync('typeMeta-original.json', 'utf-8'));

// // sort original properties by name for easier comparison
// original.forEach((type: TypeMeta) => {
//     type.properties?.sort((a, b) => a.name.localeCompare(b.name));
// });

// fs.writeFileSync('typeMeta-original.json', JSON.stringify(original, null, 4), 'utf-8');

// process.exit(0); // temporarily exit to avoid running the script

// run typedoc to generate json output
execSync(`typedoc --entryPointStrategy expand ./src --json tmp.json`);

// rewrite the tmp.json to add some fixes for easier parsing
// read in the typedoc json
const rawData = JSON.parse(
    // cleanup the JSON a bit
    fs
        .readFileSync('tmp.json', 'utf-8')
        .replace(/```ts\\n/g, '')
        .replace(/\\n```/g, '')
        .replace(/: "true"/g, ': true')
        .replace(/: "false"/g, ': false'),
);

function getTypeMeta() {
    const typesMeta: TypeMeta[] = [];

    const propItems = findItems(rawData, (item) => item.variant === 'declaration' && item.name.endsWith('Props'));

    typesMeta.push(...propItems.map(itemToTypeMeta));

    const allReferences: string[] = typesMeta
        .flatMap((t) => t.references || [])
        .filter((r, i, arr) => arr.indexOf(r) === i);

    const referenceItems = findItems(
        rawData,
        (item) => item.variant === 'declaration' && allReferences.includes(item.name),
    );

    typesMeta.push(...referenceItems.map(itemToTypeMeta));

    return typesMeta.sort((a, b) => a.name.localeCompare(b.name));
}

function itemToTypeMeta(item: Item): TypeMeta {
    const file = item.sources?.[0]?.fileName.replace(/^src/, '') || '';

    const properties: TypeProperty[] = [];

    const ids = item.groups?.find((g) => g.title === 'Properties')?.children;

    const references: string[] = [];

    item.type?.types?.forEach(() => {});

    item.children?.forEach((child) => {
        if (ids && !ids.includes(child.id!)) return;

        let type = '';

        if (child.type?.elementType?.type === 'reference') {
            references.push(child.type.elementType.name!);
        }

        if (child.type?.type === 'array') {
            type = `Array<${child.type?.elementType?.name}>`;
        }

        if (child.type?.name) {
            type = child.type.name;
        }

        type = type === 'ReactNode' ? 'React.ReactNode' : type;

        const tags = getTags(child);

        properties.push({
            name: child.name,
            required: !!tags['required'],
            description: tags?.summary
                ?.replace(/\n[ ]+\*([ ]*)/g, '\n')
                .replace(/(\S)\n(\S)/g, (_, a, b) => `${a} ${b}`)
                .trim(),
            default: tags['default'],
            type,
        });
    });

    const components: string[] = [];

    const match = file.match(/\/components\/([^/]+)/);
    if (match) components.push(match[1]);

    properties.sort((a, b) => a.name.localeCompare(b.name));

    return {
        file,
        name: item.name,
        properties,
        id: kebabCase(item.name),
        components,
        references,
    };
}

// const componentMeta = getComponentMeta();
const typeMeta = getTypeMeta();

fs.writeFileSync('typeMeta.json', JSON.stringify(typeMeta, null, 4), 'utf-8');

const originalTypeMeta = JSON.parse(fs.readFileSync('typeMeta-original.json', 'utf-8'));

// compare with original to see if there are any differences

const warnings: string[] = [];

originalTypeMeta.forEach((originalType: TypeMeta) => {
    if (warnings.length > 10) return; // limit to first 10 warnings

    const newType = typeMeta.find((t) => t.name === originalType.name);
    if (!newType) {
        warnings.push(`Type ${originalType.name} is missing in the new type meta`);
        return;
    }

    originalType.properties?.forEach((originalProp: TypeProperty) => {
        const newProp = newType.properties?.find((p) => p.name === originalProp.name);
        if (!newProp) {
            warnings.push(`  Property ${originalType.name}.${originalProp.name} is missing in the new type meta`);
            return;
        }

        if (originalProp.description !== newProp.description) {
            warnings.push(
                `  Property ${originalType.name}.${originalProp.name} description changed:\n    ORIGINAL: ${originalProp.description}\n    NEW: ${newProp.description}`,
            );
        }

        if (originalProp.default !== newProp.default) {
            warnings.push(
                `  Property ${originalType.name}.${originalProp.name} default changed:\n    ORIGINAL: ${originalProp.default}\n    NEW: ${newProp.default}`,
            );
        }
    });
});

if (warnings.length > 0) {
    console.warn('Warnings found in type meta comparison:');
    warnings.forEach((w) => console.warn(w));
} else {
    console.log('No differences found in type meta comparison.');
}

execSync('prettier --write typeMeta.json');
