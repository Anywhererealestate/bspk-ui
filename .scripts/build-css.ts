/* eslint-disable no-console */
/**
 * $ npm run build:css
 *
 * Generates the `TxtVariants.ts` and `colorVariants.ts` file from the `anywhere.css` file.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { BRANDS } from '../src';

import { prettyLint, camelCase, generateBaseStyleExport } from './utils';

const STYLES_PKG_DIR = path.resolve(__dirname, '../node_modules/@bspk/styles');

const anywhereCssFile = path.resolve(__dirname, '../node_modules/@bspk/styles/anywhere.css');

const STYLES_PROVIDER_PREFIX = path.resolve(__dirname, '../src/StylesProvider');

function generateFileLinted(filePath: string, content: string) {
    fs.writeFileSync(filePath, content);

    execSync(`eslint --fix ${filePath} && npx prettier --write ${filePath} `, {
        stdio: 'inherit',
    });

    console.info(`\n${filePath} generated`);
}

function copyUpdatedCssFromStyles() {
    BRANDS.forEach(({ slug }) => {
        const brandCssFile = `${STYLES_PKG_DIR}/${slug}.css`;
        const destCssFile = `src/styles/${slug}.css`;
        const destTsFile = `src/styles/${slug}.ts`;

        execSync(`rm -rf ${destCssFile} && rm -rf ${destTsFile} && cp ${brandCssFile} ${destCssFile}`, {
            stdio: 'inherit',
        });

        fs.writeFileSync(destTsFile, `export default \`${fs.readFileSync(destCssFile, 'utf8')}\`;`);
    });

    execSync(`npx prettier --write src/styles/*.ts && echo 'prettier done - src/styles'`, { stdio: 'inherit' });
    execSync(`npx eslint --fix src/styles/*.ts && echo 'eslint done - src/styles'`, { stdio: 'inherit' });

    console.info(`\nCSS files copied from ${STYLES_PKG_DIR} to src/styles`);

    generateBaseStyleExport();
}

function generateTxtVariants(variables: Record<string, string>) {
    const txtVariables = Object.entries(variables)
        // text variable values start with weight value
        .filter(([, value]) => /^\d{3}\s/.test(value));

    const variants = new Set<string>();

    txtVariables.forEach(([variable]) => {
        const variant = variable
            .substring(2)
            .replace(/^desktop-/, '')
            .replace(/^mobile-/, '');

        variants.add(variant);
    });

    generateFileLinted(
        path.resolve(__dirname, '../src/utils/txtVariants.ts'),
        [
            `export type TxtVariant = '${[...variants].join("' | '")}';`,
            `export const TXT_VARIANTS: TxtVariant[] = ${JSON.stringify([...variants])} as const;`,
        ].join('\n'),
    );
}

function generateColorVariants(variables: Record<string, string>) {
    const surfaceVariables = Object.keys(variables).filter((variable) => variable.includes('surface-spectrum'));
    const foregroundVariables = Object.keys(variables).filter((variable) => variable.includes('foreground-spectrum'));

    const manualVariants = {
        grey: {
            foreground: '--foreground-neutral-on-surface-variant-01',
            surface: '--surface-neutral-t2-lowest',
        },
        white: {
            foreground: '--foreground-neutral-on-surface-variant-01',
            surface: '--surface-neutral-t1-base',
        },
        primary: {
            foreground: '--foreground-brand-primary-depth',
            surface: '--surface-brand-primary-highlight',
        },
        secondary: {
            foreground: '--foreground-brand-secondary-depth',
            surface: '--surface-brand-secondary-highlight',
        },
    };

    const manualVariantErrors: string[] = Object.entries(manualVariants)
        .flatMap(([variant, { foreground, surface }]) =>
            [
                !variables[foreground] ? `Missing foreground variable for ${variant}` : [],
                !variables[surface] ? `Missing surface variable for ${variant}` : [],
            ].flat(),
        )
        .filter(Boolean);

    if (manualVariantErrors.length) {
        console.error(manualVariantErrors.join('\n'));
        process.exit(1);
    }

    const foundVariants: Record<string, unknown> = Object.fromEntries(
        surfaceVariables.map((surfaceVariable) => {
            const variant = surfaceVariable.replace('--surface-spectrum-', '');
            const foregroundVariable = foregroundVariables.find((variable) => variable.endsWith(variant));

            return [
                variant,
                {
                    foreground: foregroundVariable,
                    surface: surfaceVariable,
                },
            ];
        }),
    );

    const variants = { ...manualVariants, ...foundVariants };

    const content = `export type ColorVariant = '${Object.keys(variants).join("' | '")}';

export const COLOR_VARIABLES:Record<ColorVariant, {foreground: string; surface:string}> = ${JSON.stringify(variants, null, 2)} as const;
`;

    generateFileLinted('src/utils/colorVariants.ts', content);
}

function generateBrandStylesProviders() {
    const fileNames: string[] = [];

    BRANDS.forEach(({ title, slug }) => {
        const componentName = camelCase(title);

        const brandStylesProviderFilePath = `${STYLES_PROVIDER_PREFIX}${componentName}.tsx`;

        fileNames.push(brandStylesProviderFilePath);

        execSync(`rm -rf ${brandStylesProviderFilePath}`, {
            stdio: 'inherit',
        });

        fs.writeFileSync(
            brandStylesProviderFilePath,
            `import { useEffect, useRef } from 'react';

import baseStyle from './styles/base';
import brandStyle from './styles/${slug}';

/**
 * Utility to provide the ${title} styles to the application.
 *
 * @name StylesProvider${componentName}
 */
function  StylesProvider${componentName}() {
  const styleEmentRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    styleEmentRef.current = document.createElement('style');
    styleEmentRef.current.setAttribute('data-bspk', '${slug}');
    styleEmentRef.current.innerHTML = brandStyle + baseStyle;
    document.head.appendChild(styleEmentRef.current);
    document.body.style.display = '';

    return () => {
      if (styleEmentRef.current) document.head.removeChild(styleEmentRef.current);
    };
  }, []);

  return <></>;
}

StylesProvider${componentName}.bspkName = 'StylesProvider${componentName}';

export { StylesProvider${componentName} };
`,
        );
    });

    prettyLint(fileNames.join('" "'));

    console.info(`\nBrand style providers generated`);
}

function main() {
    const variableMatches = fs.readFileSync(anywhereCssFile, 'utf8').matchAll(/(--[^:]+):\s*([^\n;]+)/g);
    const variables = Object.fromEntries([...variableMatches].map((match) => [match[1], match[2]]));

    generateTxtVariants(variables);

    generateColorVariants(variables);

    copyUpdatedCssFromStyles();

    generateBrandStylesProviders();
}

main();

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
