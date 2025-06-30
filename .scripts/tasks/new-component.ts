/* eslint-disable no-console */
/**
 * This script generates a new component with all the expected boilerplate.
 *
 * $ npx tsx .scripts/tasks/new-component.ts ${componentName}
 */

import fs from 'fs';
import path from 'path';

import { componentsDir, kebabCase } from '@utils';

if (!process.argv[2]?.trim()) {
    console.error('Please provide a component name.');
    process.exit(1);
}

const componentName = capitalizeFirstLetter(process.argv[2]);

if (!componentName) {
    console.error('Please provide a component name.');
    process.exit(1);
}

const componentFilePath = path.join(componentsDir, `${componentName}.tsx`);

if (fs.existsSync(componentFilePath)) {
    console.error(`Component ${componentName} already exists.`);
    process.exit(1);
}

const slug = kebabCase(componentName);

fs.writeFileSync(
    componentFilePath,

    `import './${slug}.scss';
import { ReactNode } from 'react';

const DEFAULT = {
    variant: 'none',
} as const;

export type ${componentName}Props = {
    /**
     * The content of the ${slug}.
     *
     * @required
     */
    children: ReactNode;
    /**
     * The variant of the ${slug}.
     *
     * @default none
     */
    variant?: 'none';
};

/**
 * Component description.
 *
 * @example
 *     import { ${componentName} } from '@bspk/ui/${componentName}';
 *
 *     function Example() {
 *         return <${componentName}>Example ${componentName}</${componentName}>;
 *     }
 *
 * @name ${componentName}
 * @phase WorkInProgress
 * 
 */
function ${componentName}({ children, variant = DEFAULT.variant }: ${componentName}Props) {
    return (
        <span data-bspk="${slug}" data-variant={variant || undefined}>
            {children}
        </span>
    );
}

${componentName}.bspkName = '${componentName}';

export { ${componentName} };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`,
);

fs.writeFileSync(
    path.join(componentsDir, `${slug}.scss`),
    `[data-bspk='${slug}'] {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: fit-content;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`,
);

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
