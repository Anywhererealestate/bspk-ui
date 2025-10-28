import fs from 'fs';
import { ComponentMeta, ComponentPhase } from './src/types/meta';

export type Item = {
    id?: number;
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

    type?: {
        type: string;
        name?: string;
        elementType?: {
            name: string;
            type: string;
        };
        types?: Item[];
    };
    groups?: {
        title: string;
        children: number[];
    }[];
};

export function getTag(item: Item, tagName: string) {
    const content = item.comment?.blockTags
        ?.find((t) => t.tag === `@${tagName}`)
        ?.content.map((c) => c.text)
        .join('\n');

    if (content === undefined) return undefined;
    return content || true;
}

export function getTags(item: Item): Record<string, boolean | string | undefined> & { summary: string } {
    const tags = Object.fromEntries(
        item.comment?.blockTags?.map((t) => {
            const contents = t.content.map((c) => c.text);

            let content: boolean | string = contents.every((c) => typeof c === 'boolean')
                ? contents.every((c) => c)
                : contents.join('\n');

            if (content === '') content = true;

            return [t.tag.replace('@', ''), content];
        }) || [],
    );

    const summary = item.comment?.summary
        .map((s) => s.text)
        .join('\n')
        .trim();

    return {
        ...tags,
        summary,
    };
}

export function findItems(item: Item, predicate: (i: Item) => boolean): Item[] {
    const children = [...(item.children || []), ...(item.signatures || [])];

    if (predicate(item)) {
        return [item];
    }

    if (!children.length) return predicate(item) ? [item] : [];
    return children.flatMap((child) => findItems(child, predicate));
}

export function getComponentMeta(rawData: Item): ComponentMeta[] {
    const metaItems = findItems(rawData, (item) => item.variant === 'signature' && getTag(item, 'name') === item.name);

    const componentNames = metaItems.map((item) => item.name);

    return metaItems.map((item): ComponentMeta => {
        const slug = kebabCase(item.name);

        const cssPath = `src/components/${item.name}/${slug}.scss`;
        const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf-8') : '';
        const file = item.sources?.[0]?.fileName.replace(/^src\//, '') || '';

        const tags = getTags(item);

        // strip ```ts ``` from example code
        const exampleCode = tags.example || '';
        const strippedExampleCode = exampleCode
            .toString()
            .replace(/^\s*```ts\n/gm, '')
            .replace(/```$/g, '')
            .replace(/\n[ ]+/g, '\n')
            .trim();

        const exampleDescription = tags.exampleDescription?.toString();

        const description = tags.summary
            .replace(/\n[ ]+\*([ ]*)/g, '\n')
            .replace(/(\S)\n(\S)/g, (_, a, b) => `${a} ${b}`)
            .trim();

        const content = fs.readFileSync(`src/${file}`, 'utf-8');

        const componentImports = [...content.matchAll(/import { ([^}]+) } from '-\/components\/.*';/g)]
            //
            ?.flatMap((d) => d.slice(1).flatMap((x) => x.split(', ')));

        const dependencies = componentImports.filter((d, i, arr) => arr.indexOf(d) === i && componentNames.includes(d));

        return {
            description,
            file,
            name: item.name,
            slug,
            dependencies,
            usage:
                strippedExampleCode || exampleDescription
                    ? {
                          code: strippedExampleCode,
                          description: exampleDescription,
                      }
                    : undefined,
            css,
            hasTouchTarget: css.includes('data-touch-target'),
            phase: getTag(item, 'phase') as ComponentPhase,
            generated: !!getTag(item, 'generated'),
        };
    });
}

export function kebabCase(str: string): string {
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
