/* eslint-disable no-console */
/**
 * $ npm run watch:dev
 *
 * This script is used to watch the local development environment.
 */
import fs from 'fs';
import path from 'path';

import Watcher from 'watcher';

import { generateBaseStyleExport } from './build-css';

const filesToWatch: [string, () => void][] = [
    [
        path.resolve(__dirname, './src/styles/base.css'),
        () => {
            generateBaseStyleExport();
        },
    ],
];

filesToWatch.forEach(([file, callback]) => {
    if (!fs.existsSync(file)) {
        console.error(`${file} does not exist.`);
        process.exit(1);
    }

    console.info(`Watching ${file} for changes...`);

    const watcher = new Watcher([file], {
        recursive: true,
    });

    watcher.on('all', (event, targetPath) => {
        console.info(`A ${event} was seen on ${targetPath}`);
        callback();
    });
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */