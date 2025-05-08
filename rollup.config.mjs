import fs from 'fs';
import path from 'path';

import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig({
    input: fs
        .readdirSync('./src', { recursive: true, withFileTypes: true })
        .flatMap((entry) =>
            entry.isDirectory() ||
            (!entry.name.endsWith('.ts') && !entry.name.endsWith('.tsx')) ||
            entry.name.endsWith('.test.ts')
                ? []
                : [path.resolve(entry.parentPath, entry.name)],
        ),
    output: {
        dir: './',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
    },
    plugins: [
        typescript({
            tsconfig: './tsconfig.build.json',
            declaration: true,
            declarationDir: './',
            exclude: ['**/__tests__', '**/*.test.ts'],
        }),
    ],
    external: ['react', 'react-dom', 'tslib'],
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
