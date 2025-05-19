import { RadioProps, Radio } from './Radio';
import { ToggleOptionProps, ToggleOption } from './ToggleOption';

export type RadioOptionProps = Pick<RadioProps, 'checked' | 'disabled' | 'invalid' | 'name' | 'onChange' | 'value'> &
    Pick<ToggleOptionProps, 'description' | 'label'>;

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * @name RadioOption
 */
function RadioOption({ label, description, ...checkboxProps }: RadioOptionProps) {
    return (
        <ToggleOption data-bspk="radio-option" description={description} label={label}>
            <Radio {...checkboxProps} aria-label={label} />
        </ToggleOption>
    );
}

RadioOption.bspkName = 'RadioOption';

export { RadioOption };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
