/* eslint-disable no-console */
/**
 * $ npx tsx .scripts/tasks/lint-components.ts
 *
 * This script checks if all components have a `data-bspk="name"` attribute, a 'bspkName' property.
 */

import fs from 'fs';
import path from 'path';

import { getLocalMeta } from '../utils';

const errors: string[] = [];

const { componentsMeta, typesMeta } = await getLocalMeta();

fs.readdirSync(path.resolve('./src/components'), { withFileTypes: true }).forEach((dirent) => {
    if (!dirent.isDirectory() && dirent.name !== '.DS_Store') {
        errors.push(`❌ ${dirent.name} is in the components directory but is not a directory. Please remove it.`);
        return;
    }

    if (errors.length) return;
});

if (!errors.length)
    componentsMeta.forEach(({ name, slug }) => {
        const indexPath = path.resolve(`./src/components/${name}/index.tsx`);

        const content = fs.readFileSync(path.resolve(`./src/components/${name}/${name}.tsx`), 'utf-8');

        if (!fs.existsSync(indexPath)) {
            errors.push(`❌ ${name} does not have an index.tsx file. Please create one.`);
            return;
        }

        const propNameMatch = content.match(/\.bspkName = '([^']+)'/);
        const dataNameMatch = content.match(/data-bspk="([^"]+)"/);
        const sassNameMatch = content.match(/import '\.\/(.*)\.scss'/);

        const propName = propNameMatch?.[1];
        const dataName = dataNameMatch?.[1];
        const sassName = sassNameMatch?.[1];

        if (sassName && sassName !== slug && sassName !== 'base') {
            errors.push(`❌ ${name} sass name does not match component slug "${sassName}"`);
        }

        if (!propName) {
            errors.push(`❌ ${name} does not have a bspkName property`);
        }

        if (dataName && dataName !== slug) {
            errors.push(`❌ ${name} data-bspk attribute does not match component slug "${sassName}"`);
        }

        // lint component Properties

        const props = typesMeta?.find((t: { name: string }) => t.name === `${propName}Props`);

        if (props?.properties) {
            // does not have duplicate property names
            const duplicatePropertyNames = props.properties.filter(
                (prop: { name: string }, index: number, self: { name: string }[]) =>
                    self.findIndex((prop2) => prop2.name === prop.name) !== index,
            );

            if (duplicatePropertyNames.length > 0) {
                errors.push(
                    `❌ ${name} has duplicate property names: ${duplicatePropertyNames.map((p) => p.name).join(', ')}`,
                );
            }
        }

        console.info(`✅ ${name} passes linting`);
    });

if (errors.length > 0) {
    errors.forEach((error) => console.error(error));
    process.exit(1);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
