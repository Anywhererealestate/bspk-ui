import { execSync } from 'child_process';
import path from 'path';

import { watch } from 'chokidar';

const srcPath = path.resolve('./src');

watch(srcPath).on('all', (event, filePath) => {
    if (event !== 'change') return;

    // eslint-disable-next-line no-console
    console.log(`File changed: ${filePath}`);
    execSync(`npm run build`);
});
