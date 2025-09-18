/* eslint-disable no-console */
import fs from 'fs/promises';

const itemsToRemove = ['/.tmp', '/dist', '.scripts/symbols.json', 'component-files.json', 'types.json'];

(async () => {
    for (const item of itemsToRemove) {
        process.stdout.write(`🕑  ${item}...`);

        const isDirectory = item.startsWith('/');
        const path = isDirectory ? item.slice(1) : item;

        try {
            await fs.access(path); // Check if the item exists

            await fs.rm(path, { recursive: isDirectory, force: true });

            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            console.log(`✅ ${item}`);
        } catch (error) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);

            if (error.code === 'ENOENT') {
                console.log(`⚠️  ${item} not found`);
            } else {
                console.log(`❌  Failed to remove ${item}: ${error.message}`);
            }
        }
    }
})();
