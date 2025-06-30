/**
 * This script generates the styles provider components for each brand.
 *
 * If we need to change the styles provider we should do it here and run the script to ensure consistency.
 *
 * $ npx tsx .scripts/tasks/generate-style-providers.ts
 */

import fs from 'fs';

import { camelCase } from '@utils';

import { BRANDS } from '../../src';

function generateStylesProviders() {
    BRANDS.forEach(({ slug, title }) => {
        const componentName = `StylesProvider${camelCase(title)}`;

        fs.writeFileSync(
            `./src/${componentName}.tsx`,
            `import '@bspk/styles/${slug}.css';
import './base.scss';

/**
 * Utility to provide the ${title} styles to the application.
 *
 * @name ${componentName}
 */
function ${componentName}() {
    return <></>;
}

${componentName}.bspkName = '${componentName}';

export { ${componentName} };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */

`,
        );
    });
}

generateStylesProviders();

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
