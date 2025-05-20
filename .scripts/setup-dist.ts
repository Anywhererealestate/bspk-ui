// copy files from root to dist folder
import { execSync } from 'child_process';

// copy files from root to dist folder
execSync(`cp ./package.json ./dist`, { stdio: 'inherit' });
execSync(`cp ./README.md ./dist`, { stdio: 'inherit' });
execSync(`cp ./LICENSE ./dist`, { stdio: 'inherit' });
execSync(`cp ./CONTRIBUTING.md ./dist`, { stdio: 'inherit' });
execSync(`cp ./CODE_OF_CONDUCT.md ./dist`, { stdio: 'inherit' });

// write an .npmignore file to the dist folder
// with the following content: "!*"
execSync(`echo "!*" > dist/.npmignore`, {
    stdio: 'inherit',
});

// copy declaration files from dist/src to dist
execSync(`cp -r dist/src/. dist && rm -rf dist/src`, {
    stdio: 'inherit',
});
