import { FormField, FormFieldWrapProps } from '-/components/FormField';
import { SelectProps, Select } from '-/components/Select';

export type SelectFieldProps = FormFieldWrapProps<SelectProps>;

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and Select components.
 *
 * @example
 *     import { SelectField } from '@bspk/ui/SelectField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState(['option1']);
 *         return (
 *             <SelectField
 *                 controlId="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={(nextValue) => setState(nextValue)}
 *                 options={[
 *                     { label: 'Option 1', value: 'option1' },
 *                     { label: 'Option 2', value: 'option2' },
 *                     { label: 'Option 3', value: 'option3' },
 *                 ]}
 *                 placeholder="Select one..."
 *                 value={state}
 *             />
 *         );
 *     }
 *
 * @name SelectField
 * @phase UXReview
 */
function SelectField({
    label,
    errorMessage,
    helperText,
    controlId,
    labelTrailing,
    required,
    invalid,
    ...inputProps
}: SelectFieldProps) {
    return (
        <FormField
            controlId={controlId}
            data-bspk="select-field"
            errorMessage={errorMessage}
            helperText={helperText}
            invalid={invalid}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => (
                <Select
                    //
                    {...inputProps}
                    {...fieldProps}
                    errorMessage={errorMessage}
                    id={controlId}
                    invalid={!!errorMessage}
                    label={label}
                />
            )}
        </FormField>
    );
}

SelectField.bspkName = 'SelectField';

export { SelectField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
