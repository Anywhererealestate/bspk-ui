/* eslint-disable no-console */
import { exec, execSync as execSyncBase } from 'child_process';
import fs from 'fs';
import path from 'path';

import { watch } from 'chokidar';

const execSync = (command: string) => execSyncBase(command, { stdio: 'inherit' });

const srcPath = path.resolve('./src');
const metaOutDir = path.resolve('../bspk-demo/src/meta');
const tsConfigPath = path.resolve('./tsconfig.json');
const tsConfigDevPath = path.resolve('./.scripts/dev.tsconfig.json');
const tmpPath = path.resolve('./.tmp');

execSync(`mkdir -p ${tmpPath}`);

watch(srcPath).on('all', (event, filePath) => {
    if (event !== 'change') return;

    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        fs.writeFileSync(
            tsConfigDevPath,
            JSON.stringify({
                extends: tsConfigPath,
                skipDefaultLibCheck: true,
                compilerOptions: {
                    declaration: false,
                    sourceMap: false,
                    outDir: tmpPath,
                },
                include: [`../${filePath}`],
            }),
            'utf-8',
        );

        exec(`npm run meta hash=local out=${metaOutDir} update=${filePath}`);

        execSync(`tsc --project ${tsConfigPath} && tsc-alias -p ${tsConfigPath}`);
    }
});

const destPath = (tmpFilePath: string) => tmpFilePath.split('.tmp/')[1];

watch(tmpPath).on('all', (event, filePath) => {
    if (event === 'change') {
        console.log(`File ${filePath} has been ${event}`);

        if (filePath.endsWith('.js')) {
            resolveCssImportsInJsFile(filePath);
        } else {
            execSync(`cp ${filePath} ${destPath(filePath)}`);
        }
    }
});

function resolveCssImportsInJsFile(filePath: string) {
    let fileContent = fs.readFileSync(filePath, 'utf-8');

    // fix css and scss imports, including @bspk/styles imports (copied from build.ts)
    const cssImportMatches = [...fileContent.matchAll(/import '(.*\/)([^.]+).[s]*css';/g)];
    fileContent = cssImportMatches.reduce((nextContent, [full, importPath, name]) => {
        // this only works for jsj in the components directory
        const nextImportPath = importPath.replace('@bspk/styles/', '../../styles/');
        return nextContent.replace(full, `import '${nextImportPath}${name}.css.js';`);
    }, fileContent);

    fs.writeFileSync(destPath(filePath), fileContent, 'utf-8');
}
