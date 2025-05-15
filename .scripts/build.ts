/**
 * $ ts-node .scripts/build.ts
 *
 * This script runs the following commands:
 */

import { execSync } from 'child_process';

[
    `npm run meta`,
    `npm run test`,
    `npm run clean`,
    `echo "Building..."`,
    `npm run rollup`,
    `echo "Copying styles..."`,
    `mkdir -p ./styles`,
    `cp -r ./src/styles/* ./styles`,
]
    // -
    .forEach((command) => {
        execSync(command, { stdio: 'inherit' });
    });

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
