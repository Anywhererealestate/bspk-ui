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
    // create a folder for the component if it doesn't exist
    const componentDir = path.resolve(process.cwd(), 'src/components', component.name);
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir);
    }

    // move the component file to the new folder and rename it to index.tsx

    const componentFilePath = path.resolve(process.cwd(), 'src', `${component.name}.tsx`);
    const componentFileNewPath = path.resolve(componentDir, 'index.tsx');
    if (fs.existsSync(componentFilePath)) {
        fs.renameSync(componentFilePath, componentFileNewPath);
    }

    // move the scss file if it exists tp the new component folder
    const scssFilePath = path.resolve(process.cwd(), 'src', `${component.slug}.scss`);
    const scssFileNewPath = path.resolve(componentDir, `${component.slug}.scss`);
    if (fs.existsSync(scssFilePath)) {
        fs.renameSync(scssFilePath, scssFileNewPath);
    }

    // move the demo examples file for each component if it exists to it's new component folder and rename to example.tsx
    const exampleFilePath = path.resolve(process.cwd(), 'src/demo/examples', `${component.name}.tsx`);
    const exampleFileNewPath = path.resolve(componentDir, 'example.tsx');
    if (fs.existsSync(exampleFilePath)) {
        fs.renameSync(exampleFilePath, exampleFileNewPath);
    }

    // move the import scss below other imports in each component file
    const componentFileContent = fs.readFileSync(componentFileNewPath, 'utf-8');
    const scssImport = `import './${component.slug}.scss';\n`;
    const updatedContent = componentFileContent.replace(/import\s+['"]\.\.\/\.\//g, (match) => {
        // Insert the scss import after the first import statement
        return `${match}\n${scssImport}`;
    });
    fs.writeFileSync(componentFileNewPath, updatedContent);

    // update exports in package.json to point to each new component index.tsx file
});

// const tempDir = path.resolve(process.cwd(), '.scripts/.tmp');
// execSync(`npm run meta out=${tempDir} target=local`, { stdio: 'inherit' });
