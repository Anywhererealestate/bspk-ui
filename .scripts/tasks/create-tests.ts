/* eslint-disable no-console */
/**
 * This script generates a new component test with all the expected boilerplate.
 *
 * $ npx tsx .scripts/tasks/.scripts/tasks/create-tests.ts
 */

import path from 'path';
import fs from 'fs';

const componentsDir = path.resolve('src', 'components');

function getComponentFiles(): { name: string; filePath: string }[] {
    return fs
        .readdirSync(componentsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => {
            const name = dirent.name;
            const filePath = path.join(componentsDir, name, `${name}.tsx`);
            if (fs.existsSync(filePath)) {
                return { name, filePath };
            }
            const indexPath = path.join(componentsDir, name, 'index.tsx');
            if (fs.existsSync(indexPath)) {
                return { name, filePath: indexPath };
            }
            return null;
        })
        .filter((item): item is { name: string; filePath: string } => item !== null);
}

export const generateAndWriteTestFileForComponent = (componentName: string, filePath: string) => {
    const testFileContent = generateTestFile(componentName);
    fs.writeFileSync(filePath, testFileContent, 'utf-8');
};

export function generateTestFile(componentName: string) {
    return `import { ${componentName} } from './${componentName}';
import { presets } from './${componentName}Example';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('${componentName} (RTL)', () => {
    presets.forEach((preset) => {
        it(\`has no basic a11y issues - \${preset.label}\`, hasNoBasicA11yIssues(<${componentName} {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<${componentName} {...presets[0].propState} />);

        expect(getByText('whoop there it is')).toBeInTheDocument();
\    });
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`;
}

function main() {
    const components = getComponentFiles();
    components.forEach(({ name }) => {
        const testFilePath = path.join(componentsDir, name, `${name}.rtl.test.tsx`);
        if (fs.existsSync(testFilePath)) {
            console.log(`🆒 \x1b[33m${name}\x1b[0m Test already exists\x1b[90m at ${testFilePath}\x1b[0m`);
        } else {
            generateAndWriteTestFileForComponent(name, testFilePath);
            console.log(`✅ \x1b[32m${name}\x1b[0m Generated\x1b[90m at ${testFilePath}\x1b[0m`);
        }
    });
}

main();
