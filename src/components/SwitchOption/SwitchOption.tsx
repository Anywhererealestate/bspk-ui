import { SwitchProps, Switch } from '-/components/Switch';
import { ToggleOption, ToggleOptionControlProps } from '-/components/ToggleOption';

export type SwitchOptionProps = ToggleOptionControlProps<SwitchProps>;

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * If only a switch is needed, consider using the Switch component directly.
 *
 * @name SwitchOption
 * @phase UXReview
 */
export function SwitchOption({ label: labelProp, description, ...checkboxProps }: SwitchOptionProps) {
    const label = labelProp || description;
    const ariaLabel = description ? `${labelProp} - ${description}` : labelProp;

    return (
        label && (
            <ToggleOption data-bspk="switch-option" description={description} label={label}>
                <Switch {...checkboxProps} aria-label={ariaLabel} />
            </ToggleOption>
        )
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
