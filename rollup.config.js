import fs from 'fs';
import path from 'path';

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import postcss from 'rollup-plugin-postcss';

/**
 * A Rollup plugin that replaces the import path for 'style-inject' in generated SCSS JavaScript bundles.
 *
 * This plugin should be used after the `postcss()` plugin. It scans the output bundle for files ending with `.scss.js`
 * and replaces occurrences of the relative path to 'style-inject' with just 'style-inject', simplifying the import.
 *
 * @type {import('rollup').Plugin}
 * @name postcssFix
 */
const postcssFix = {
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
};

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
        dir: './dist',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
    },
    plugins: [
        nodeResolve({ preferBuiltins: false }), // or `true`
        commonjs(),
        postcss({
            inject: true,
            use: {
                sass: {
                    silenceDeprecations: ['legacy-js-api'],
                },
            },
        }),
        typescript({
            tsconfig: './rollup.tsconfig.json',
            exclude: ['**/__tests__', '**/*.test.ts'],
        }),
        postcssFix,
    ],
    external: ['react', 'react-dom', 'tslib', 'react/jsx-runtime', '@bspk/icons'],
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
