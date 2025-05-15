/* eslint-disable no-console */
/**
 * $ ts-node .scripts/debug.ts
 *
 * This script ensures all debugging code are removed from the components.
 */

import fs from 'fs';

import { typesMeta } from '../src/meta';

const errors: string[] = [];

function removeDebugging() {
    fs.readdirSync('./src').forEach((file) => {
        if (!file.endsWith('.tsx')) return;

        const content = fs.readFileSync(`./src/${file}`, 'utf-8');

        const bspkNameMatch = content.match(/\.bspkName = '([^']+)'/);

        if (!bspkNameMatch) {
            console.error(`What is '${file}'?`);
            return;
        }
        const name = bspkNameMatch[1];

        const whyDidYouRenderLine = `${name}.whyDidYouRender = true;\n`;

        const whyDidYouRenderExists = content.includes(whyDidYouRenderLine);

        if (whyDidYouRenderExists) {
            fs.writeFileSync(`./src/${file}`, content.replace(whyDidYouRenderLine, ``));
        }
    });
}

function checkTypesMeta() {
    typesMeta.forEach((typeMeta) => {
        // find duplicate property names

        const propertyNames = typeMeta?.properties?.map((property) => property.name) || [];

        const duplicatePropertyNames = propertyNames.filter((name, index) => propertyNames.indexOf(name) !== index);

        if (duplicatePropertyNames.length > 0)
            errors.push(`Duplicate property names: ${duplicatePropertyNames} in ${typeMeta.name}`);
    });
}

removeDebugging();

checkTypesMeta();

if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exit(1);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
