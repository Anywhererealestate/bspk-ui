/* eslint-disable no-console */
/**
 * $ npx tsx .scripts/tasks/correct-sass-imports.ts
 *
 * This script reads all component files in the components directory and ensures the import .*.scss statement is on the
 * first line.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { componentsDir } from '../utils';

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
        };
    });

componentFiles.forEach((file) => {
    const scssMatch = file.content.match(/import '(.*).scss'/);

    const importStatement = scssMatch ? scssMatch[0] : null;

    if (importStatement) {
        const firstLine = file.content.split('\n')[0].trim();
        if (firstLine !== importStatement) {
            console.log(`Correcting import in ${file.fileName}`);
            const newContent = `${importStatement}\n${file.content.replace(importStatement, '').trim()}`;
            fs.writeFileSync(file.filePath, newContent);
        }
    } else {
        console.log(`No SCSS import found in ${file.fileName}`);
    }
});

execSync('npm run pretty && npm run lint:fix', {
    stdio: 'inherit',
});
