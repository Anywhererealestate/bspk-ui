/* eslint-disable no-console */
/**
 * Rename components.
 *
 * Includes slugs and package.json and files and folders and any other references in the src folder.
 *
 * $ .scripts/tasks/rename-comp.ts OldComponentName NewComponentName
 */
import fs from 'fs';
import path from 'path';
import { kebabCase } from '.scripts/utils';

const [oldNameArg, newNameArg] = process.argv.slice(2);

if (!oldNameArg || !newNameArg) {
    console.error('Please provide the old and new component names.');
    process.exit(1);
}

const oldComponentName = oldNameArg;
const newComponentName = newNameArg;

const oldComponentDir = path.resolve(__dirname, '../../src/components', oldComponentName);
const newComponentDir = path.resolve(__dirname, '../../src/components', newComponentName);

// if components/oldComponentName does not exist, exit
if (!fs.existsSync(oldComponentDir)) {
    console.error(`Component ${oldComponentName} does not exist.`);
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

// Rename the component directory
fs.renameSync(oldComponentDir, newComponentDir);
console.log(`Renamed directory: ${oldComponentDir} -> ${newComponentDir}`);

filesToUpdate.forEach((file) => {
    const filePath = path.join(newComponentDir, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const updatedContent = content
            .replace(new RegExp(`\\b${oldComponentName}\\b`, 'g'), newComponentName)
            .replace(new RegExp(`\\b${oldKebabCase}\\b`, 'g'), newKebabCase);

        fs.writeFileSync(filePath, updatedContent, 'utf-8');
        console.log(`Updated file: ${filePath}`);
    } else {
        console.warn(`File not found, skipping: ${filePath}`);
    }
});

// Update package.json exports
const packageJsonPath = path.resolve(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

if (packageJson.exports) {
    const oldExportKey = `./${oldComponentName}`;
    const newExportKey = `./${newComponentName}`;
    const oldExportWildcardKey = `./${oldComponentName}/*`;
    const newExportWildcardKey = `./${newComponentName}/*`;

    if (packageJson.exports[oldExportKey]) {
        packageJson.exports[newExportKey] = packageJson.exports[oldExportKey];
        delete packageJson.exports[oldExportKey];
        console.log(`Updated package.json export: ${oldExportKey} -> ${newExportKey}`);
    }

    if (packageJson.exports[oldExportWildcardKey]) {
        packageJson.exports[newExportWildcardKey] = packageJson.exports[oldExportWildcardKey];
        delete packageJson.exports[oldExportWildcardKey];
        console.log(`Updated package.json export: ${oldExportWildcardKey} -> ${newExportWildcardKey}`);
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
    console.log(`Updated package.json at ${packageJsonPath}`);
} else {
    console.warn('No exports field found in package.json, skipping export updates.');
}

console.log('Component rename completed successfully.');
