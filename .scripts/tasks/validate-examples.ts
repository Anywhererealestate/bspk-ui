/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/**
 * Example validation script.
 *
 * This script validates the examples in the components by extracting JSDoc examples and writing them to a temporary
 * directory.
 *
 * Npx tsx .scripts/tasks/validate-examples.ts
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { typesMeta } from '../../../bspk-demo/src/meta';
import { componentsDir, kebabCase, prettyLint } from '../utils';

const getDefaultState = (prop: any): any => {
    if (prop.example) return prop.example;

    // if the prop is not required, we don't need to set a default value
    if (!prop.required) return;

    if (prop.type === 'string' || prop.type === 'multiline') return `Example ${prop.name}`;

    if (prop.type === 'number') return '{0}';

    if (prop.type === 'boolean') return '{false}';

    if (prop.type === 'array') return '{[]}';

    if (prop.type === 'object') return '{{}}';

    if (typeof prop.type === 'string' && prop.type.startsWith('Array<')) return '{[]}';

    if (prop.options && prop.options.length > 0) {
        return `"${prop.options[0]}"`;
    }
};

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

const componentFiles = fs
    .readdirSync(componentsDir)
    .filter((f) => f.endsWith('.tsx'))
    .map((fileName) => {
        const filePath = path.resolve(componentsDir, fileName);
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

const generatedExample = (component: (typeof componentFiles)[0]) => {
    const propsDef = typesMeta.find((meta) => meta.name === `${component.name}Props`);

    // const propsStringified = propsDef
    //     ? Object.entries(propsDef.props)
    //           .map(([key, value]) => {

    const propNames = propsDef?.properties?.map((prop) => prop.name) || [];

    const propsStringified =
        propsDef?.properties
            ?.map((prop) => {
                if (prop.name === 'children') return null;

                const strValue = prop.example || prop.default;

                if (!strValue && !prop.required && prop.name !== 'value') return null;

                let value = '';

                if (prop.name === 'value') value = `{state}`;
                else if (prop.type === 'string') value = `"${strValue || getDefaultState(prop) || ''}"`;
                else if (typeof prop.type === 'string' && prop.type.startsWith('Array<')) value = `{${strValue || ''}}`;
                else if (prop.name.match(/^on[A-Z]/)) {
                    if (prop.name !== 'onChange') value = `{() => action('Called "${prop.name}" function')}`;
                    // some props have value and checked properties - we look for checked first
                    else if (propNames.includes('checked')) value = `{(checked) => setState(checked)}`;
                    else if (propNames.includes('value')) value = `{(nextValue) => setState(nextValue) }`;
                    else value = `{() => { console.warn('onChange function called') }}`;
                }

                return value ? `${prop.name}=${value}` : '';
            })
            .filter(Boolean)
            .join(' ') || '';

    let reactStuff = '';

    if (propsStringified.includes('setState')) {
        let stateType = propsDef?.properties?.find((prop) => prop.name === 'value')?.type || 'string';

        if (stateType === 'multiline') stateType = 'string';

        reactStuff = `const [state, setState] = React.useState<${stateType}>();`;
    }

    return `
   import { ${component.name} } from '@bspk/ui/${component.name}';
   
   export function Example() {

        ${reactStuff}

       return (
           ${
               (propNames.includes('children')
                   ? `<${component.name} ${propsStringified}>
               Example ${component.name}
           </${component.name}>`
                   : `<${component.name} ${propsStringified} />`) || ''
           }
       );
   }
    
   `;
};

const examplesDir = path.resolve(__dirname, '../.scripts/temp');
execSync(`mkdir -p ${examplesDir}`, { stdio: 'inherit' });

const exampleNames: string[] = [];

const missingExamples: string[] = [];

componentFiles.forEach((component) => {
    let example: string = '';

    component.jsDocs?.forEach((jsDoc) => {
        if (jsDoc.name === component.name) {
            example = jsDoc.example;
        }
    });

    const exampleFilePath = path.resolve(examplesDir, `${component.name}.tsx`);

    if (!example) {
        missingExamples.push(component.name);
        example = generatedExample(component);
    }

    /// make it pass linter
    example = example.replace('\nfunction', '\nexport function');
    if (example.includes('console.')) example = `/* eslint-disable no-console */${example}`;
    if (example.includes('React.')) example = `import React from 'react';\n${example}`;

    // write the example to a file
    fs.writeFileSync(exampleFilePath, example);

    exampleNames.push(component.name);
});

prettyLint(examplesDir);

if (missingExamples.length > 0) {
    console.error(`\nMissing examples: \n\n`);

    missingExamples.forEach((c) => {
        console.error(` - /src/${c}.tsx\t\t/.scripts/temp/${c}.tsx`);
    });

    process.exit(1);
}

console.log(`Generated examples: ${exampleNames.join(', ')}.`);
