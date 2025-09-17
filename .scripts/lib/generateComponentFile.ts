import { kebabCase } from '../utils';
import fs from 'fs/promises';

/** Generates and writes a boilerplate component file for a component name and destination file path. */
export const generateAndWriteComponentFile = async (componentName: string, filePath: string) => {
    const componentFileContent = generateComponentFile(componentName);
    await fs.writeFile(filePath, componentFileContent);
};

export const generateComponentFile = (componentName: string) => {
    const slug = kebabCase(componentName);

    return `import './${slug}.scss';
    
    const DEFAULT = {
        variant: 'none',
    } as const;
    
    export type ${componentName}Props = {
        /**
         * The content of the ${slug}.
         *
         * @required
         */
        children: string;
        /**
         * The variant of the ${slug}.
         *
         * @default none
         */
        variant?: 'none';
    };
    
    /**
     * Component description.
     *
     * @example
     *     import { ${componentName} } from '@bspk/ui/${componentName}';
     *
     *     function Example() {
     *         return <${componentName}>Example ${componentName}</${componentName}>;
     *     }
     *
     * @name ${componentName}
     * @phase Dev
     * 
     */
    export function ${componentName}({ children, variant = DEFAULT.variant }: ${componentName}Props) {
        return (
            <span data-bspk="${slug}" data-variant={variant || undefined}>
                {children}
            </span>
        );
    }
    
    /** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
    `;
};
