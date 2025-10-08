import './toggle-option.scss';
import { ReactElement } from 'react';
import { CommonProps } from '-/types/common';

export type ToggleOptionControlProps<T extends { 'aria-label'?: string }> = Omit<T, 'aria-label'> &
    Pick<ToggleOptionProps, 'description' | 'label'>;

export type ToggleOptionProps = CommonProps<'disabled' | 'readOnly'> & {
    /**
     * The label of the option. Also used as the aria-label of the control.
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
export function ToggleOption({ label, description, children, disabled, readOnly }: ToggleOptionProps) {
    return (
        <label aria-disabled={!!disabled || !!readOnly || undefined} data-bspk="toggle-option">
            <span data-control>{children}</span>
            <span data-label>{label}</span>
            {description && <span data-description>{description}</span>}
        </label>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
