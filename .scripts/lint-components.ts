/* eslint-disable no-console */
/**
 * $ ts-node .scripts/lint-components.ts
 *
 * This script checks if all components have a `data-bspk-name` attribute.
 */

import fs from 'fs';

import { kebabCase } from './utils';

fs.readdirSync('./src').forEach((file) => {
    if (!file.endsWith('.tsx')) return;

    const content = fs.readFileSync(`./src/${file}`, 'utf-8');

    const match = content.match(/\.bspkName = '([^']+)'/);

    if (!match) {
        console.error(`What is '${file}'?`);
        return;
    }

    const name = match[1];

    const dataAttr = `data-bspk-${kebabCase(name)}`;

    console.info(`Checking ${file}...`);

    if (!content.includes(` ${dataAttr}`)) {
        console.error(`Add ${dataAttr} to ${file}`);
        return;
    }

    console.info(`✅ ${file} contains ${dataAttr}`);
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */