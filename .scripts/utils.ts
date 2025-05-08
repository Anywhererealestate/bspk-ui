/* eslint-disable no-console */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function pretty(filePath: string) {
    execSync(`npx prettier --write "${filePath}" && echo 'prettier done ${filePath}'`, { stdio: 'inherit' });
}

export async function prettyLint(filePath: string) {
    execSync(`npx prettier --write "${filePath}" && echo 'prettier done ${filePath}'`, { stdio: 'inherit' });
    execSync(`npx eslint --fix "${filePath}" && echo 'eslint done ${filePath}'`, { stdio: 'inherit' });
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

export function titleCase(toTransform: string) {
    return toTransform.replace(/\b([a-z])/g, function (_, initial) {
        return initial.toUpperCase();
    });
}

export function camelCase(str: string, lowerFirst = false) {
    return kebabCase(str)
        .replace(/-([\w])/g, (_, char) => char.toUpperCase())
        .replace(/^([a-zA-Z])/, (_, char) => (lowerFirst ? char.toLowerCase() : char.toUpperCase()));
}

export const { componentsDir, hooksDir, rootPath, metaFilePath } = {
    componentsDir: path.resolve(__dirname, '..', 'src'),
    hooksDir: path.resolve(__dirname, '..', 'src', 'hooks'),
    rootPath: path.resolve(__dirname, '..'),
    metaFilePath: path.resolve(__dirname, '..', 'src', 'meta.ts'),
} as const;

export const componentFiles = fs
    .readdirSync(componentsDir)
    .filter((f) => f.endsWith('.tsx'))
    .map((fileName) => {
        const filePath = path.resolve(componentsDir, fileName);
        return {
            filePath,
            name: fileName.replace(/\.[^.]+$/, ''),
            fileName,
            content: fs.readFileSync(filePath, 'utf-8'),
        };
    });

export function generateBaseStyleExport() {
    console.info(`\nGenerating Base style export...`);

    const baseCssFile = path.resolve(__dirname, `../src/styles/base.css`);
    const destTsFile = path.resolve(__dirname, `../src/styles/base.ts`);

    fs.writeFileSync(destTsFile, `export default \`${fs.readFileSync(baseCssFile, 'utf8')}\`;`);
    prettyLint(destTsFile);

    console.info(`complete`);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */