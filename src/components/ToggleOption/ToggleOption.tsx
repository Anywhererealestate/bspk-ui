import './toggle-option.scss';
import { ReactElement } from 'react';
import { ListItem } from '-/components/ListItem';
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
        <ListItem
            as="label"
            data-disabled={disabled}
            data-readonly={readOnly}
            label={label}
            leading={children}
            subText={description}
            width="hug"
        />
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
