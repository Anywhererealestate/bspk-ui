import './toggle-option.scss';
import { ReactElement } from 'react';
import { ListItem, ListItemProps } from '-/components/ListItem';
import { CommonProps } from '-/types/common';

export type ToggleOptionControlProps<T extends { 'aria-label'?: string }> = Omit<T, 'aria-label'> &
    Pick<ToggleOptionProps, 'description' | 'label'>;

export type ToggleOptionProps = CommonProps<'disabled' | 'readOnly'> &
    Omit<ListItemProps, 'as' | 'label' | 'leading' | 'subtext' | 'trailing'> & {
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
export function ToggleOption({ label, description, children, disabled, readOnly, ...props }: ToggleOptionProps) {
    return (
        <ListItem
            {...props}
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
