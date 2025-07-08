import { ElementProps } from '-';
import { cssWithVars } from '-/utils/cwv';
import './divider.scss';

export type DividerProps = {
    /**
     * The orientation of the divider.
     *
     * @default horizontal
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The thickness of the divider.
     *
     * @default light
     */
    thickness?: 'heavy' | 'light';
    /**
     * If the divider padding is shown.
     *
     * @default true
     */
    padding?: boolean;
    /**
     * The inset (margin) of the divider. The value is a number between 0 and 12, which corresponds to the spacing
     * sizing variables defined in the theme. The inset is applied to the left and right sides of the divider when the
     * orientation is horizontal, and to the top and bottom when the orientation is vertical.
     *
     * @default 0
     */
    inset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

const insetToVariable = (insetProp: number | string) => {
    const inset = Number(insetProp);
    if (inset === undefined || inset === null || inset < 1 || inset > 12) return '0px';
    return `var(--spacing-sizing-${inset.toString().padStart(2, '0')})`;
};

/**
 * Horizontal thin lines that separates grouped content in a list or other containers with an optional section/group
 * label.
 *
 * Vertical thin lines that separates grouped content or other visual elements within a container.
 *
 * @example
 *     import { Divider } from '@bspk/ui/Divider';
 *
 *     function Example() {
 *         return (
 *             <div>
 *                 <p>Content above the divider</p>
 *                 <Divider orientation="horizontal" />
 *                 <p>Content below the divider</p>
 *             </div>
 *         );
 *     }
 *
 * @name Divider
 * @phase DesignReview
 */
function Divider({
    padding = true,
    orientation = 'horizontal',
    thickness = 'light',
    inset = 0,
    ...props
}: ElementProps<DividerProps, 'div'>) {
    return (
        <div
            {...props}
            aria-orientation={orientation}
            data-bspk="divider"
            data-hide-padding={!padding || undefined}
            data-orientation={orientation}
            data-thickness={thickness}
            role="separator"
            style={cssWithVars({
                ...props.style,
                '--inset': insetToVariable(inset),
            })}
        />
    );
}

Divider.bspkName = 'Divider';

export { Divider };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
