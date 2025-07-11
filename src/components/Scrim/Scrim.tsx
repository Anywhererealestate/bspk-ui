import { CommonProps } from '-/types/common';
import './scrim.scss';

export type ScrimProps = CommonProps<'data-bspk-owner'> & {
    /**
     * Whether the Scrim should be visible.
     *
     * @default true
     */
    visible?: boolean;
    /**
     * The variant of the Scrim.
     *
     * This determines how the Scrim is used in the application and effects its styling.
     *
     * @required
     */
    variant: 'dialog' | 'dropdown';
    /**
     * A function that is called when the Scrim is clicked.
     *
     * This will typically be used to close a modal or dropdown when the user clicks outside of it.
     *
     * @required;
     */
    onClick: () => void;
};

/**
 * A temporary effect or overlay that can be applied to a user interface to make content less prominent or to draw
 * attention to a modal or sheet.
 *
 * @name Scrim
 *
 * @phase Utility
 */
function Scrim({ visible = true, variant, ...props }: ScrimProps) {
    return (
        <div
            {...props}
            aria-hidden="true"
            data-bspk="scrim"
            data-hidden={!visible || undefined}
            data-variant={variant}
        />
    );
}

Scrim.bspkName = 'Scrim';

export { Scrim };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
