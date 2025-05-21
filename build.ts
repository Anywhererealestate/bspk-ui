/* eslint-disable no-console */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('\n');
console.log('⚡️\t Cleaning /dist');
execSync('rm -rf dist', { stdio: 'inherit' });

console.log('⚡️\t Generating Meta File');
execSync('npm run meta', { stdio: 'inherit' });

console.log('⚡️\t Compiling Typescript');
execSync('npm run tsc', { stdio: 'inherit' });

console.log('⚡️\t Compiling Sass');
execSync('npm run sass', { stdio: 'inherit' });

console.log('⚡️\t Injecting CSS into JS files');
fs.readdirSync('./dist', { recursive: true, encoding: 'utf-8' }).forEach((fileName) => {
    const filePath = path.join('./dist', fileName);

    if (!filePath.endsWith('.js')) return;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const scssMatch = fileContent.match(/import\s+['"]([^'"]+)\.scss['"]/);

    if (!scssMatch) return;

    const importRequire = `import { styleAdd } from './utils/styleAdd';`;
    const cssContent = fs.readFileSync(path.join('./dist', `${scssMatch[1]}.css`), 'utf-8');

    fs.writeFileSync(
        filePath,
        // Replace the import statement with the style-inject code
        fileContent.replace(scssMatch[0], `${importRequire}\nstyleAdd(\`${cssContent.trim()}\`);`),
        'utf-8',
    );
});

console.log('\n⚡️\t Done!\n');
