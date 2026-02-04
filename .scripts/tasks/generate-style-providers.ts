/**
 * This script generates the styles provider components for each brand.
 *
 * If we need to change the styles provider we should do it here and run the script to ensure consistency.
 *
 * $ npx tsx .scripts/tasks/generate-style-providers.ts
 *
 * UI: gsp - Generate styles providers for each brand
 */

import { execSync } from 'child_process';
import fs from 'fs';
import { BRANDS } from '@bspk/styles/brands';
import { camelCase } from '.scripts/utils';

function generateStylesProviders() {
    BRANDS.forEach(({ slug, title }) => {
        const componentName = `StylesProvider${camelCase(title)}`;

        execSync(`rm -rf ./src/components/${componentName} && mkdir -p ./src/components/${componentName}`, {
            stdio: 'inherit',
        });

        fs.writeFileSync(
            `./src/components/${componentName}/${componentName}.tsx`,
            `import '@bspk/styles/${slug}.css';
import '-/styles/base.scss';

/**
 * Utility to provide the ${title} styles to the application.
 *
 * @name ${componentName}
 * @phase Utility
 * @generated
 */
export function ${componentName}(): JSX.Element | null {
    return null;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
`,
        );

        fs.writeFileSync(`./src/components/${componentName}/index.tsx`, `export * from './${componentName}';\n`);
    });
}

generateStylesProviders();

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
