/**
 * // Move components to folders rename files
 *
 * $ npx tsx .scripts/temp.ts
 */
// import  { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { componentsMeta } from './.tmp/index.ts';

// const componentNames = componentsMeta.map((component) => component.name);

componentsMeta.forEach((component) => {
    // 1. create a folder for the component if it doesn't exist
    const componentDir = path.resolve(process.cwd(), 'src/components', component.name);
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir);
    }

    // 2. move the component file to the new folder and rename it to index.tsx

    const componentFilePath = path.resolve(process.cwd(), 'src/components', `${component.name}.tsx`);
    const componentFileNewPath = path.resolve(componentDir, 'index.tsx');
    if (fs.existsSync(componentFilePath)) {
        fs.renameSync(componentFilePath, componentFileNewPath);
    }

    // move the scss file if it exists tp the new component folder
    const scssFilePath = path.resolve(process.cwd(), 'src/components', `${component.slug}.scss`);
    const scssFileNewPath = path.resolve(componentDir, `${component.slug}.scss`);
    if (fs.existsSync(scssFilePath)) {
        fs.renameSync(scssFilePath, scssFileNewPath);
    }
});

// const tempDir = path.resolve(process.cwd(), '.scripts/.tmp');
// execSync(`npm run meta out=${tempDir} target=local`, { stdio: 'inherit' });
