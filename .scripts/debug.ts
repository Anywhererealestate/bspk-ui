/* eslint-disable no-console */
/**
 * $ tsx .scripts/debug.ts
 *
 * This script adds the `whyDidYouRender` flag to all components.
 */

import fs from 'fs';

function debug() {
    fs.readdirSync('./src').forEach((file) => {
        if (!file.endsWith('.tsx')) return;

        const content = fs.readFileSync(`./src/${file}`, 'utf-8');

        const bspkNameMatch = content.match(/\.bspkName = '([^']+)'/);

        if (!bspkNameMatch) {
            console.error(`What is '${file}'?`);
            return;
        }
        const name = bspkNameMatch[1];

        const whyDidYouRenderExists = content.includes(`${name}.whyDidYouRender = true;`);

        if (!whyDidYouRenderExists)
            fs.writeFileSync(
                `./src/${file}`,
                content.replace(
                    `.bspkName = '${name}';\n`,
                    `.bspkName = '${name}';\n` + `${name}.whyDidYouRender = true;\n`,
                ),
            );

        console.info({ name, file, whyDidYouRenderExists });
    });
}

debug();

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
