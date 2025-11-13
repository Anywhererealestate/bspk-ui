import './scrim.scss';
import { CommonProps } from '-/types/common';

export type ScrimProps = CommonProps<'owner'> & {
    /**
     * Whether the Scrim should be visible.
     *
     * @default true
     */
    visible?: boolean;
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
 * @phase Utility
 */
export function Scrim({ visible = true, owner, ...props }: ScrimProps) {
    return (
        <div
            {...props}
            aria-hidden="true"
            data-bspk="scrim"
            data-bspk-owner={owner || undefined}
            data-hidden={!visible || undefined}
        />
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
