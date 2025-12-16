import { ListItem } from '-/components/ListItem';
import { SwitchProps, Switch } from '-/components/Switch';
import { CommonProps } from '-/types/common';

export type SwitchOptionProps = CommonProps<'style'> &
    SwitchProps & {
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
    };

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * If only a switch is needed, consider using the Switch component directly.
 *
 * @name SwitchOption
 * @phase Stable
 */
export function SwitchOption({ label: labelProp, description, disabled, style, ...switchProps }: SwitchOptionProps) {
    const ariaLabel = description ? `${labelProp} - ${description}` : labelProp;

    return (
        <ListItem
            aria-disabled={disabled || undefined}
            as="label"
            label={labelProp}
            leading={<Switch {...switchProps} aria-label={ariaLabel} disabled={disabled} />}
            owner="switch-option"
            style={style}
            subText={description}
            width="hug"
        />
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
