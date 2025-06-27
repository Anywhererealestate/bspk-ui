/**
 * $ npx tsx .scripts/tasks/lint-components.ts
 *
 * This script checks if all components have a `data-bspk="name"` attribute, a 'bspkName' property.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { kebabCase } from '../utils';

const errors: string[] = [];

const tempPath = path.resolve('./.scripts/.tmp');

execSync(`mkdir -p ${tempPath} && npm run meta out=${tempPath}`);

fs.readdirSync(path.resolve('./src')).forEach((file) => {
    if (!file.endsWith('.tsx')) return;

    const content = fs.readFileSync(path.resolve(`./src/${file}`), 'utf-8');

    const propNameMatch = content.match(/\.bspkName = '([^']+)'/);
    const dataNameMatch = content.match(/data-bspk="([^"]+)"/);
    const sassNameMatch = content.match(/import '\.\/(.*)\.scss'/);

    const propName = propNameMatch?.[1];
    const dataName = dataNameMatch?.[1];
    const sassName = sassNameMatch?.[1];

    const componentName = file.replace('.tsx', '');
    const slug = kebabCase(componentName);

    if (sassName && sassName !== slug && sassName !== 'base') {
        errors.push(`❌ ${file} sass name does not match component slug "${sassName}"`);
    }

    if (!propName) {
        errors.push(`❌ ${file} does not have a bspkName property`);
    }

    if (dataName && dataName !== slug) {
        errors.push(`❌ ${file} data-bspk attribute does not match component slug "${sassName}"`);
    }

    // lint component Properties

    const data = JSON.parse(fs.readFileSync(path.resolve(`${tempPath}/data.json`), 'utf-8'));

    const props = data?.typesMeta?.find((t: { name: string }) => t.name === `${propName}Props`);

    if (props) {
        // does not have duplicate property names
        const duplicatePropertyNames = props.properties.filter(
            (prop: { name: string }, index: number, self: { name: string }[]) =>
                self.findIndex((prop2) => prop2.name === prop.name) !== index,
        );

        if (duplicatePropertyNames.length > 0) {
            errors.push(
                `❌ ${file} has duplicate property names: ${duplicatePropertyNames.map((p) => p.name).join(', ')}`,
            );
        }
    }

    //console.info(`✅ ${file} passes linting`);
});

execSync(`rm -rf ${tempPath}`);

if (errors.length > 0) {
    // eslint-disable-next-line no-console
    errors.forEach((error) => console.error(error));
    process.exit(1);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
