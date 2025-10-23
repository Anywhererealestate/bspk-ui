import fs from 'fs';
import path from 'path';

const metaPath = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../out/data.json');
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const { componentsMeta, typesMeta } = meta;

// CSV header
console.log('Component,Props');

componentsMeta.forEach((component) => {
    const propsMeta = typesMeta.find((type) => type.components && type.components.includes(component.name));
    const propsList = propsMeta && propsMeta.properties ? propsMeta.properties.map((p) => p.name).join('; ') : '';
    // Wrap in quotes in case of commas or special characters
    console.log(`"${component.name}","${propsList}"`);
});

// first run meta generation script to create out/data.json
// npm run meta -- out=out
// To run this script, use the command:
// node .scripts/tasks/component-props-table.js > component-props.csv
