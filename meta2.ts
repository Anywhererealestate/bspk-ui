/**
 * Generates TypeMeta data by running TypeDoc on the source files and parsing the output JSON.
 *
 * $ npx tsx meta2.ts
 */
import { execSync } from 'child_process';
import fs from 'fs';
import { ComponentMeta, ComponentPhase } from './src/types/meta';

// create typedoc json
execSync(`typedoc src/**/* --json tmp.json`);

// convert JSON to data
const data = JSON.parse(fs.readFileSync('tmp.json', 'utf-8'));

const getTag = (item: Item, tagName: string) => {
    return item.comment?.blockTags?.find((t) => t.tag === `@${tagName}`)?.content[0];
};

const getTagContent = (item: Item, tagName: string) => {
    return item.comment?.blockTags?.find((t) => t.tag === `@${tagName}`)?.content;
};

type Item = {
    name: string;
    children: Item[];
    signatures?: Item[];
    variant: string;
    kind: number;
    flags: Record<string, unknown>;
    comment: {
        summary: [
            {
                text: string;
            },
        ];
        blockTags: {
            tag: string;
            content: {
                kind: string;
                text: string;
            }[];
        }[];
    };
    sources?:
        | {
              fileName: string;
              line: number;
              character: number;
          }[]
        | undefined;
};

function findComponent(item: Item) {
    return item.variant === 'signature' && getTag(item, 'name')?.text === item.name;
}

function findItems(item: Item, predicate: (i: Item) => boolean): Item[] {
    const children = [...(item.children || []), ...(item.signatures || [])];
    if (!children.length) return predicate(item) ? [item] : [];
    return children.flatMap((child) => findItems(child, predicate));
}

const componentMeta = findItems(data, findComponent).map((item): ComponentMeta => {
    const slug = kebabCase(item.name);

    const cssPath = `src/components/${item.name}/${slug}.scss`;
    const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf-8') : '';

    // strip ```ts ``` from example code
    const exampleCode = getTag(item, 'example')?.text || '';
    const strippedExampleCode = exampleCode
        .replace(/^\s*```ts\n/gm, '')
        .replace(/```$/g, '')
        .replace(/\n[ ]+/g, '\n')
        .trim();

    const exampleDescription = getTag(item, 'exampleDescription')?.text;

    const description = item.comment?.summary?.[0]?.text
        .replace(/\n[ ]+\*([ ]*)/g, '\n')
        .replace(/(\S)\n(\S)/g, (_, a, b) => `${a} ${b}`)
        .trim();

    return {
        description,
        file: item.sources?.[0]?.fileName?.replace(/^src\//, '/') || '',
        name: item.name,
        slug,
        dependencies: [],
        usage:
            strippedExampleCode || exampleDescription
                ? {
                      code: strippedExampleCode,
                      description: exampleDescription,
                  }
                : undefined,
        css,
        hasTouchTarget: false,
        phase: getTag(item, 'phase')?.text as ComponentPhase,
        generated: !!getTagContent(item, 'generated'),
    };
});
fs.writeFileSync('components.json', JSON.stringify(componentMeta, null, 4), 'utf-8');

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
