/* eslint-disable no-console */
/**
 * Rename component.
 *
 * Includes slugs and package.json and files and folders and any other references in the src folder and also any
 * references in the ../bspk-demo folder.
 *
 * $ npx tsx .scripts/tasks/rename-comp.ts OldComponentName NewComponentName
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { kebabCase } from '.scripts/utils';

const [oldNameArg, newNameArg] = process.argv.slice(2);

if (!oldNameArg || !newNameArg) {
    console.error('Please provide the old and new component names.');
    process.exit(1);
}

const root = path.resolve(__dirname, '../');

const oldComponentName = oldNameArg;
const newComponentName = newNameArg;

const oldComponentDir = path.resolve(root, 'src/components', oldComponentName);
const newComponentDir = path.resolve(root, 'src/components', newComponentName);

// if components/oldComponentName does not exist, exit
if (!fs.existsSync(oldComponentDir)) {
    console.error(`Component ${oldComponentDir} does not exist.`);
    process.exit(1);
}

const oldKebabCase = kebabCase(oldComponentName);
const newKebabCase = kebabCase(newComponentName);

const filesToUpdate = [
    'index.ts',
    `${oldComponentName}.tsx`,
    `${oldKebabCase}.scss`,
    `${oldComponentName}.rtl.test.tsx`,
    `${oldComponentName}Example.tsx`,
];

fs.renameSync(oldComponentDir, newComponentDir);
console.log(`Renamed directory: ${oldComponentDir} -> ${newComponentDir}`);

// Rename the component directory and all file names
filesToUpdate.forEach((file) => {
    const oldFilePath = path.join(newComponentDir, file);
    if (fs.existsSync(oldFilePath)) {
        const newFileName = file.replace(oldComponentName, newComponentName).replace(oldKebabCase, newKebabCase);
        const newFilePath = path.join(newComponentDir, newFileName);
        fs.renameSync(oldFilePath, newFilePath);
        console.log(`Renamed file: ${oldFilePath} -> ${newFilePath}`);
    } else {
        console.warn(`File not found, skipping: ${oldFilePath}`);
    }
});

// Update package.json exports
const packageJsonPath = path.resolve(root, 'package.json');
const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');

if (packageJsonContent.includes(oldComponentName)) {
    fs.writeFileSync(
        packageJsonPath,
        packageJsonContent.replace(new RegExp(`\\b${oldComponentName}\\b`, 'g'), newComponentName),
        'utf-8',
    );
    execSync(`npx prettier --write ${packageJsonPath}`);
    console.log(`Updated package.json at ${packageJsonPath}`);
} else {
    console.warn('No export found in package.json, skipping export updates.');
}

// Update all references in the src and bspk-demo directories
[path.resolve(root, 'src'), path.resolve(root, '../bspk-demo')].forEach((dir) => {
    fs.readdirSync(dir, { recursive: true, encoding: 'utf-8' }).map((file) => {
        // ignore node_modules and .git and dist folders and any folders
        if (
            file.includes('node_modules') ||
            file.includes('.git') ||
            file.includes('dist') ||
            fs.lstatSync(path.join(dir, file)).isDirectory()
        )
            return;

        const filePath = path.join(dir, file);

        console.log(`checking: ${filePath}`);

        const content = fs.readFileSync(filePath, 'utf-8');
        const containsOldName = content.includes(oldComponentName) || content.includes(oldKebabCase);

        if (!containsOldName) return;
        console.log(`updating: ${file}`);

        const updatedContent = content
            .replace(new RegExp(`\\b${oldComponentName}`, 'g'), newComponentName)
            .replace(new RegExp(`\\b${oldKebabCase}`, 'g'), newKebabCase);

        fs.writeFileSync(filePath, updatedContent, 'utf-8');
    });
});

console.log('Component rename completed successfully.');
