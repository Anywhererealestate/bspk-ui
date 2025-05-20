import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

execSync('rm -rf dist', { stdio: 'inherit' });

execSync('npm run meta', { stdio: 'inherit' });

execSync('npm run tsc', { stdio: 'inherit' });

execSync('npm run sass', { stdio: 'inherit' });

// inject css into js files
// Adding a bundler is overkill
fs.readdirSync('./dist', { recursive: true }).forEach((fileName) => {
    const filePath = path.join('./dist', fileName);
    if (!filePath.endsWith('.js')) return;

    let fileContent = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    const relativeImportRegex = /from ['"]\.\/([^'"]+)['"];/g;
    const relativeImportMatch = fileContent.match(relativeImportRegex);

    if (relativeImportMatch) {
        fileContent = fileContent.replace(relativeImportRegex, (_, importedFile) => `from './${importedFile}.js';`);
        changed = true;
    }

    const scssMatch = fileContent.match(/import\s+['"]([^'"]+)\.scss['"]/);

    if (scssMatch) {
        const cssContent = fs.readFileSync(path.join('./dist', `${scssMatch[1]}.css`), 'utf-8');
        fileContent = fileContent.replace(
            scssMatch[0],
            `import { styleAdd } from './utils/styleAdd.js';\nstyleAdd(\`${cssContent.trim()}\`)`,
        );
        changed = true;
    }

    if (changed)
        fs.writeFileSync(
            filePath,
            // Replace the import statement with the style-inject code
            fileContent,
            'utf-8',
        );
});

// copy files from root to dist folder
execSync(`cp ./package.json ./dist`, { stdio: 'inherit' });
execSync(`cp ./package-lock.json ./dist`, { stdio: 'inherit' });
execSync(`cp ./README.md ./dist`, { stdio: 'inherit' });
execSync(`cp ./LICENSE ./dist`, { stdio: 'inherit' });
execSync(`cp ./CONTRIBUTING.md ./dist`, { stdio: 'inherit' });
execSync(`cp ./CODE_OF_CONDUCT.md ./dist`, { stdio: 'inherit' });
