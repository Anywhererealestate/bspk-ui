import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { prettyLint } from '../utils';

// get all files in src that end wth .tsx, .ts, .scss

const files = fs.readdirSync('./src', { recursive: true }).flatMap((fileName: Buffer | string): string[] | string => {
    const filePath = path.join('./src', fileName.toString());

    // check if file is a directory
    if (fs.lstatSync(filePath).isDirectory()) return [];

    // check if file ends with .tsx, .ts, .scss

    return filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.scss') ? filePath : [];
});

files.forEach((file) => {
    // make sure they all have the copyright notice

    const content = fs.readFileSync(file, 'utf-8');
    const copyrightNotice = `/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */`;

    if (content.includes(copyrightNotice)) return;

    // if not, add it to the bottom of the file

    fs.writeFileSync(file, `${content}\n\n${copyrightNotice}\n`);

    // lint and prettier

    if (file.endsWith('.tsx') || file.endsWith('.ts')) prettyLint(file);

    if (file.endsWith('.scss'))
        execSync(
            //
            `npx prettier --write '${file}' && npx stylelint '${file}' --fix`,
            { stdio: 'inherit' },
        );

    // eslint-disable-next-line no-console
    console.log(`Added copyright notice to ${file}`);
});
