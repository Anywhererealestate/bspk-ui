import fs from 'fs';
import path from 'path';

import { componentFiles, prettyLint } from './utils';

const styleImport = componentFiles.flatMap(({ name, content }) =>
    content.includes('export const style') ? [name] : [],
);

const styleImportsFilePath = path.resolve(__dirname, 'style-imports.ts');

fs.writeFileSync(
    styleImportsFilePath,
    `${styleImport.map((file) => `import { style as ${file.replace(/\.tsx$/, '')} } from '../src/${file}';`).join('\n')}  
    export default {${styleImport.map((file) => file.replace(/\.tsx$/, '')).join(', ')}};
    `,
);

prettyLint(styleImportsFilePath);

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */