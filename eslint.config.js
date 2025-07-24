import cspellESLintPluginRecommended from '@cspell/eslint-plugin/recommended';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['src/**/*.ts', 'src/**/*.tsx', 'src/*.ts', 'src/*.tsx', 'build.ts'],
    },
    {
        settings: {
            'import/resolver': {
                node: true,
                typescript: true,
            },
            react: {
                version: 'detect',
            },
        },
    },
    { languageOptions: { globals: globals.browser } },
    js.configs.recommended,
    ...tsEslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    eslintConfigPrettier,
    importPlugin.flatConfigs.recommended,
    jsxA11y.flatConfigs.recommended,
    cspellESLintPluginRecommended,
    {
        plugins: { 'react-hooks': reactHooks },
    },
    {
        ignores: [
            '*.js',
            '**/*.js',
            '*.d.ts',
            '**/*.d.ts',
            'node_modules/**/*',
            '.github',
            'dist/**/*',
            '.scripts/**/*',
        ],
    },
    {
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['../*'],
                            message: 'Relative imports are not allowed. Use alias imports instead.',
                        },
                    ],
                    paths: [
                        {
                            name: 'react',
                            importNames: ['useId'],
                            message: 'Avoid using useId from React.',
                        },
                    ],
                },
            ],
            '@typescript-eslint/member-ordering': 'error',
            'react/self-closing-comp': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'TSEnumDeclaration',
                    message: "Don't declare enums",
                },
            ],
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    disallowTypeAnnotations: true,
                    fixStyle: 'inline-type-imports',
                    prefer: 'no-type-imports',
                },
            ],
            '@typescript-eslint/member-ordering': 'error',
            '@typescript-eslint/sort-type-constituents': 'error',
            '@cspell/spellchecker': [
                'error',
                {
                    configFile: new URL('./cspell.config.yaml', import.meta.url).toString(),
                },
            ],
            'react/no-unused-prop-types': 'error',
            'no-explicit-any': 'off',
            'import/first': 'warn',
            'import/named': 'off',
            'import/newline-after-import': 'warn',
            'import/no-absolute-path': 'warn',
            'import/no-duplicates': 'error',
            'import/no-empty-named-blocks': 'warn',
            'import/no-unresolved': 'off',
            'import/order': [
                'warn',
                {
                    alphabetize: { order: 'asc' },
                },
            ],
            'no-alert': 'error',
            'no-console': 'error',
            'no-debugger': 'error',
            'no-shadow': 'warn',
            'no-template-curly-in-string': 'error',
            'prefer-template': 'warn',
            'react/jsx-curly-brace-presence': ['warn', { children: 'never', props: 'never' }],
            'react/jsx-sort-props': 'warn',
            'react/no-multi-comp': 'error',
            'react/no-unknown-property': ['warn', { ignore: ['css'] }],
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
];

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
