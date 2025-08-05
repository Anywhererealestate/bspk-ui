import { ReactElement } from 'react';

import './toggle-option.scss';
import { CommonProps } from '-/types/common';

export type ToggleOptionProps = CommonProps<'disabled'> & {
    /**
     * The label of the option. Also used as the aria-label of the checkbox.
     *
     * @required
     */
    label: string;
    /**
     * The description of the option.
     *
     * @type multiline
     * @type multiline
     */
    description?: string;
    /** The control element to use. */
    children?: ReactElement;
};

/**
 * A utility component that wraps a checkbox, radio, and switch.
 *
 * @name ToggleOption
 * @phase Utility
 */
function ToggleOption({ label, description, children, disabled }: ToggleOptionProps) {
    return (
        <label aria-disabled={!!disabled || undefined} data-bspk="toggle-option">
            <span data-control>{children}</span>
            <span data-label>{label}</span>
            {description && <span data-description>{description}</span>}
        </label>
    );
}

ToggleOption.bspkName = 'ToggleOption';

export { ToggleOption };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
