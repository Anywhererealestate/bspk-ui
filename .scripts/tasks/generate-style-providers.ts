/**
 * This script generates the styles provider components for each brand.
 *
 * If we need to change the styles provider we should do it here and run the script to ensure consistency.
 */

import fs from 'fs';

import { BRANDS } from '../../src';
import { camelCase } from '../utils';

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
