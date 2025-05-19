/**
 * $ ts-node .scripts/build.ts
 *
 * This script runs the following commands:
 */

import { execSync } from 'child_process';

[
    // -
    `npm run meta`,
    `npm run test`,
    `echo "Building..."`,
    `npm run rollup`,
    'npm run sass',
]
    // -
    .forEach((command) => {
        execSync(command, { stdio: 'inherit' });
    });

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */

export {};
