import { execSync } from 'node:child_process';

const filesToClean = [
    './*.js',
    './*.d.ts',
    './*.js.map',
    './src/*.js',
    './src/**/*.js',
    './src/*.d.ts',
    './src/**/*.d.ts',
    './src/**/*.js.map',
    './src/*.js.map',
    './utils',
    './hooks',
    './styles',
];

execSync(`rm -rf ${filesToClean.join(' ')}`, {
    stdio: 'inherit',
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */