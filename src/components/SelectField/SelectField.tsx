import { FormFieldProps, FormField } from '-/components/FormField';
import { SelectProps, Select } from '-/components/Select';

export type SelectFieldProps = Pick<
    SelectProps,
    | 'disabled'
    | 'itemDisplayCount'
    | 'label'
    | 'name'
    | 'onChange'
    | 'options'
    | 'placeholder'
    | 'readOnly'
    | 'size'
    | 'value'
> &
    Pick<FormFieldProps, 'controlId' | 'errorMessage' | 'helperText' | 'labelTrailing' | 'required'>;

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
 * @phase EngineeringReview
 */
function SelectField({
    label,
    errorMessage: errorMessageProp,
    helperText,
    controlId: id,
    labelTrailing,
    required,
    ...selectProps
}: SelectFieldProps) {
    const errorMessage = (!selectProps.readOnly && !selectProps.disabled && errorMessageProp) || undefined;

    return (
        <FormField
            controlId={id}
            data-bspk="select-field"
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => <Select {...selectProps} {...fieldProps} id={id} invalid={!!errorMessage} label={label} />}
        </FormField>
    );
}

SelectField.bspkName = 'SelectField';

export { SelectField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
