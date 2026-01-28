/* eslint-disable no-console */
/**
 * This script ensures all CSS variables are defined in all the brand css files.
 *
 * This should be run after the @bspk/styles is updated.
 *
 * $ npx tsx .scripts/tasks/validate-css-vars.ts
 *
 * UI: val-css - Validate that all CSS variables used in the library are defined in the brand CSS files
 */
import { execSync } from 'child_process';
import fs from 'fs';

const STYLES_DIR = execSync(`npm explore @bspk/styles -- pwd`).toString().trim();

function variableTest() {
    const vars: Record<
        string,
        {
            files: string[];
            exists: boolean;
            replacement: string | undefined;
        }
    > = {};

    const brandCssFiles = fs.readdirSync(STYLES_DIR).flatMap((file) => {
        if (!file.endsWith('.css')) return [];
        return [`${STYLES_DIR}/${file}`];
    });

    const allDefinedVariablesInSrc = [
        ...new Set(
            fs
                .readdirSync('src', { recursive: true, encoding: 'utf-8' })
                .filter((file) => file.endsWith('.ts') || file.endsWith('.tsx'))
                .flatMap((file) => {
                    const content = fs.readFileSync(`src/${file}`, { encoding: 'utf-8' });

                    const regexToMatchAllCSSVariablesBeingDefined = /(--[a-zA-Z0-9-]+)[:|']/g;

                    return [...content.matchAll(regexToMatchAllCSSVariablesBeingDefined)].map((i) => i[1]);
                }),
        ),
    ];

    allDefinedVariablesInSrc.sort();

    brandCssFiles.forEach((brandCssFile) => {
        const definedVariablesAll = [
            ...fs.readFileSync(brandCssFile, { encoding: 'utf-8' }).matchAll(/(--[^:]+):/g),
        ].map((i) => i[1]);

        const definedVariables = [...new Set(definedVariablesAll)];

        fs.writeFileSync('.scripts/variables.json', JSON.stringify(definedVariables, null, 2));

        const fixes: ((v: string) => string)[] = [];

        const getFileVariables = (content: string) => {
            return [...content.matchAll(/var\((--[\w-]+)\)/g)].map((i) => i[1]);
        };

        fs.readdirSync('src', { recursive: true, encoding: 'utf-8' }).forEach((file) => {
            if (!file.endsWith('.ts') && !file.endsWith('.tsx')) return;

            const content = fs.readFileSync(`src/${file}`, { encoding: 'utf-8' });
            const variables = getFileVariables(content);

            variables.map((v) => {
                let replacement = undefined as string | undefined;
                let exists =
                    definedVariables.includes(v) || content.includes(`${v}:`) || allDefinedVariablesInSrc.includes(v);

                if (!exists) {
                    let newVariable = v;
                    for (const fix of fixes) {
                        newVariable = fix(newVariable);
                    }
                    exists = definedVariables.includes(newVariable);
                    if (exists) {
                        replacement = newVariable;
                    }
                }

                vars[v] = vars[v] || { files: [], exists, replacement };
                vars[v].files.push(file);
            });
        });

        if (Object.keys(vars).length === 0) {
            console.error('No variables found in the library');
            process.exit(0);
        }

        const fails = Object.entries(vars)
            .filter(([, { exists }]) => !exists)
            .map(([variable, { files }]) => ({ variable, files }));

        if (fails.length) {
            console.error('Some variables are not defined in anywhere.css');
            fails.forEach(({ variable, files }) => {
                console.error(`Variable ${variable} is used in:`);
                files.forEach((file) => console.error(`  - ${file}`));
            });
            process.exit(0);
        }

        const fixedVariables = Object.entries(vars)
            .filter(([, { replacement }]) => replacement)
            .map(([variable, { files, replacement }]) => ({ variable, files, replacement }));

        if (fixedVariables.length) {
            console.info(`Fixing ${fixedVariables.length} variables`);

            const filesToFix: Record<string, string[][]> = {};

            fixedVariables.forEach(({ files, variable, replacement }) => {
                files.forEach((file) => {
                    filesToFix[file] = filesToFix[file] || [];
                    filesToFix[file].push([variable, replacement!]);
                });
            });

            Object.entries(filesToFix).forEach(([file, replacements]) => {
                const content = fs.readFileSync(`src/${file}`, { encoding: 'utf-8' });
                let newContent = content;

                replacements.forEach(([variable, replacement]) => {
                    newContent = newContent.replace(new RegExp(variable, 'g'), replacement);
                });

                fs.writeFileSync(`src/${file}`, newContent, { encoding: 'utf-8' });
            });

            fs.writeFileSync('.scripts/temp.json', JSON.stringify(filesToFix, null, 2));
        }
        console.info(`All CSS variables are defined in ${brandCssFile}`);
    });
}

variableTest();

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
