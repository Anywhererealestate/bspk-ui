import { RadioProps, RadioGroupItem } from './RadioGroupItem';
import { ToggleOption, ToggleOptionControlProps } from '-/components/ToggleOption';

export type RadioOptionProps = ToggleOptionControlProps<RadioProps>;

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * If only a radio-group-item button is needed, consider using the RadioGroupItem component directly.
 *
 * * @name RadioOption * * @phase Utility
 */
export function RadioOption({ label: labelProp, description, disabled, ...radioProps }: RadioOptionProps) {
    const label = labelProp || description;
    const ariaLabel = description ? `${labelProp} - ${description}` : labelProp;
    return (
        label && (
            <ToggleOption
                data-bspk="radio-group-item-option"
                description={description}
                disabled={disabled}
                label={label}
            >
                <RadioGroupItem {...radioProps} aria-label={ariaLabel} disabled={disabled} />
            </ToggleOption>
        )
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
