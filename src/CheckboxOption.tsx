import { CheckboxProps, Checkbox } from './Checkbox';
import { ToggleOptionProps, ToggleOption } from './ToggleOption';

export type CheckboxOptionProps = Pick<
    CheckboxProps,
    'checked' | 'disabled' | 'indeterminate' | 'invalid' | 'name' | 'onChange' | 'value'
> &
    Pick<ToggleOptionProps, 'description' | 'label'>;

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * @name CheckboxOption
 */
function CheckboxOption({ label, description, ...checkboxProps }: CheckboxOptionProps) {
    return (
        <ToggleOption data-bspk="checkbox-option" description={description} label={label}>
            <Checkbox {...checkboxProps} aria-label={label} />
        </ToggleOption>
    );
}

CheckboxOption.bspkName = 'CheckboxOption';

export { CheckboxOption };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
