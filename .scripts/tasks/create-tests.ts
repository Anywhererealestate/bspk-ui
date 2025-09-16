/* eslint-disable no-console */
/**
 * This script generates a new component test with all the expected boilerplate.
 *
 * $ npx tsx .scripts/tasks/.scripts/tasks/create-tests.ts
 */

import path from 'path';
import fs from 'fs';
import { generateAndWriteTestFileForComponent } from '../lib/generateTestFile';

const componentsDir = path.resolve('src', 'components');
const blackList: { [key: string]: true } = {};

function getComponentFiles(): { name: string; filePath: string }[] {
    return fs
        .readdirSync(componentsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => {
            const name = dirent.name;
            const filePath = path.join(componentsDir, name, `${name}.tsx`);
            if (fs.existsSync(filePath)) {
                return { name, filePath };
            }
            const indexPath = path.join(componentsDir, name, 'index.tsx');
            if (fs.existsSync(indexPath)) {
                return { name, filePath: indexPath };
            }
            return null;
        })
        .filter((item): item is { name: string; filePath: string } => item !== null);
}

const filterNonPertinentComponents = ({ name }: { name: string }) => {
    if (name.startsWith('StylesProvider')) {
        return false;
    }

    if (blackList[name]) return false;

    return true;
};

function main() {
    const components = getComponentFiles().filter(filterNonPertinentComponents);
    components.forEach(({ name }) => {
        const testFilePath = path.join(componentsDir, name, `${name}.rtl.test.tsx`);
        if (fs.existsSync(testFilePath)) {
            console.log(`🆒 \x1b[33m${name}\x1b[0m Test already exists\x1b[90m at ${testFilePath}\x1b[0m`);
        } else {
            generateAndWriteTestFileForComponent(name, testFilePath);
            console.log(`✅ \x1b[32m${name}\x1b[0m Generated\x1b[90m at ${testFilePath}\x1b[0m`);
        }
    });
}

main();
