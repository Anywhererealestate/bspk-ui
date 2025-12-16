import { RadioProps, Radio } from '-/components/Radio';
import { ListItem } from '-/components/ListItem';
import { ReactElement } from 'react';

export type RadioOptionProps = RadioProps & {
    /** The label of the option. Also used as the aria-label of the control. */
    label: string;
    /** The description of the option. */
    description?: string;
    /** The control element to use. */
    children?: ReactElement;
};

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * If only a radio button is needed, consider using the Radio component directly.
 *
 * @name RadioOption
 * @phase Utility
 */
export function RadioOption({ label: labelProp, description, disabled, ...radioProps }: RadioOptionProps) {
    const ariaLabel = description ? `${labelProp} - ${description}` : labelProp;
    return (
        <ListItem
            aria-disabled={disabled || undefined}
            as="label"
            label={labelProp}
            leading={<Radio {...radioProps} aria-label={ariaLabel} disabled={disabled} />}
            owner="radio-option"
            subText={description}
            width="hug"
        />
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
