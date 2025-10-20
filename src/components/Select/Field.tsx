import { Select, SelectProps } from './Select';
import { FormField, FormFieldProps } from '-/components/Field';

export type SelectFieldProps = Omit<FormFieldProps, 'children'> & Omit<SelectProps, keyof FormFieldProps>;

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and Select components.
 *
 * @example
 *     import { SelectField } from '@bspk/ui/SelectField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState('option1');
 *
 *         return (
 *             <SelectField
 *                 id="Example controlId"
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
 *
 * @export
 */
export function SelectField({ label, helperText, labelTrailing, errorMessage, ...controlProps }: SelectFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <Select {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
