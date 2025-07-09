import './alpha.scss';

const DEFAULT = {
    variant: 'none',
} as const;

export type AlphaProps = {
    /**
     * The content of the alpha.
     *
     * @required
     */
    children: string;
    /**
     * The variant of the alpha.
     *
     * @default none
     */
    variant?: 'none';
};

/**
 * Component description.
 *
 * @example
 *     import { Alpha } from '@bspk/ui/Alpha';
 *
 *     function Example() {
 *         return <Alpha>Example Alpha</Alpha>;
 *     }
 *
 * @name Alpha
 * @phase WorkInProgress
 * 
 */
function Alpha({ children, variant = DEFAULT.variant }: AlphaProps) {
    return (
        <span data-bspk="alpha" data-variant={variant || undefined}>
            {children}
        </span>
    );
}

Alpha.bspkName = 'Alpha';

export { Alpha };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
