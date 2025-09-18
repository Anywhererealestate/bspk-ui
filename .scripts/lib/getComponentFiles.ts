import path from 'path';
import fs from 'fs/promises';
import { getComponentsDir } from './getComponentsDir';

interface ComponentFileData {
    name: string;
    filePath: string;
}

/**
 * Generates a list of BSPK components
 *
 * @param componentsDirectory - Optional path to the components directory. Defaults to the value returned from
 *   getComponentsDir.
 * @returns A function that can be used as an event handler for keydown events.
 */
export const getComponentFiles = async (componentsDirectory?: string): Promise<ComponentFileData[]> => {
    const componentsDir = componentsDirectory ?? getComponentsDir();

    const dirs = (await fs.readdir(componentsDir, { withFileTypes: true })).filter((dirent) => dirent.isDirectory());

    const componentFiles: ComponentFileData[] = [];

    for (const dir of dirs) {
        const name = dir.name;

        try {
            const filePath = path.join(componentsDir, name, `${name}.tsx`);

            await fs.access(filePath);
            componentFiles.push({ name, filePath });

            continue;
        } catch (error) {}

        try {
            const indexPath = path.join(componentsDir, name, 'index.tsx');
            await fs.access(indexPath);
            componentFiles.push({ name, filePath: indexPath });
        } catch (error) {}
    }

    return componentFiles;
};
