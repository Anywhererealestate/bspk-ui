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

import { componentsDir, kebabCase, prettyLint } from '../utils';

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

const examplesDir = path.resolve(__dirname, '../.scripts/temp');
execSync(`mkdir -p ${examplesDir}`, { stdio: 'inherit' });

const exampleNames: string[] = [];

componentFiles.forEach((component) => {
    let example: string = '';

    component.jsDocs?.forEach((jsDoc) => {
        if (jsDoc.name === component.name) {
            example = jsDoc.example;
        }
    });

    const exampleFilePath = path.resolve(examplesDir, `${component.name}.tsx`);

    if (!example) return;

    /// make it pass linter
    example = example.replace('\nfunction', '\nexport function');
    if (example.includes('console.')) example = `/* eslint-disable no-console */${example}`;
    if (example.includes('React.')) example = `import React from 'react';\n${example}`;

    // write the example to a file
    fs.writeFileSync(exampleFilePath, example);

    exampleNames.push(component.name);
});

prettyLint(examplesDir);

console.info(`\n\nLooking good!\n\n${exampleNames.join('\n')}`);
