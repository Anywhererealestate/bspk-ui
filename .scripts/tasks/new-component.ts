/* eslint-disable no-console */
/**
 * This script generates a new component with all the expected boilerplate.
 *
 * $ npx tsx .scripts/tasks/new-component.ts ${componentName}
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { kebabCase } from '../utils';

const componentsDir = path.resolve(__dirname, '../src/components');

if (!process.argv[2]?.trim()) {
    console.error('Please provide a component name.');
    process.exit(1);
}

const componentName = capitalizeFirstLetter(process.argv[2]);

if (!componentName) {
    console.error('Please provide a component name.');
    process.exit(1);
}

const componentDirectoryPath = path.resolve(componentsDir, componentName);

const componentFilePath = path.join(componentDirectoryPath, `${componentName}.tsx`);

if (fs.existsSync(componentFilePath)) {
    if (process.argv[3] !== 'force') {
        console.error(`Component ${componentName} already exists at ${componentFilePath}.`);
        process.exit(1);
    }
    execSync(`rm -rf ${componentDirectoryPath}`, { stdio: 'inherit' });
}

execSync(`mkdir -p ${componentDirectoryPath}`, { stdio: 'inherit' });

const slug = kebabCase(componentName);

fs.writeFileSync(
    componentFilePath,

    `import './${slug}.scss';

const DEFAULT = {
    variant: 'none',
} as const;

export type ${componentName}Props = {
    /**
     * The content of the ${slug}.
     *
     * @required
     */
    children: string;
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
    path.join(componentDirectoryPath, `${slug}.scss`),
    `[data-bspk='${slug}'] {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: fit-content;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`,
);

fs.writeFileSync(path.join(componentDirectoryPath, 'index.tsx'), `export * from './${componentName}';\n`);

const packageJsonData = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf-8'));

// add the component export to package.json
packageJsonData.exports[`./${componentName}`] = `./dist/components/${componentName}/index.js`;
packageJsonData.exports[`./${componentName}/*`] = `./dist/components/${componentName}/*.js`;

// sort the object by keys alphabetically
packageJsonData.exports = Object.fromEntries(
    Object.entries(packageJsonData.exports).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
);

fs.writeFileSync(path.resolve('./package.json'), JSON.stringify(packageJsonData, null, 4) + '\n');

console.info(`\n${componentName} component generated at ${componentFilePath}`);

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
