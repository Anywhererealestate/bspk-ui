import fs from 'fs';
import path from 'path';

import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import postcss from 'rollup-plugin-postcss';

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
        treeshake: true,
        dir: './',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
    },
    plugins: [
        postcss({
            inject: true,
            use: {
                sass: {
                    silenceDeprecations: ['legacy-js-api'],
                },
            },
        }),
        typescript({
            tsconfig: './tsconfig.build.json',
            declaration: true,
            declarationDir: './',
            exclude: ['**/__tests__', '**/*.test.ts'],
        }),
        {
            name: 'Replace style-inject Rollup Plugin`', // it has to be after `postcss()`
            generateBundle: (options, bundle) => {
                Object.entries(bundle).forEach((entry) => {
                    if (!entry[0].match(/.*(.scss.js)$/)) {
                        return;
                    }
                    bundle[entry[0]].code = entry[1].code.replace(
                        /[./]*\.\/node_modules\/style-inject\/dist\/style-inject.es.js/,
                        'style-inject',
                    );
                });
            },
        },
    ],
    external: ['react', 'react-dom', 'tslib', 'react/jsx-runtime', '@bspk/icons'],
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
