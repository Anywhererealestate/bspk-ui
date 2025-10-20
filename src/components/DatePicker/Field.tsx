import { DatePicker, DatePickerProps } from './DatePicker';
import { FormField, FormFieldProps } from '-/components/Field';

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and DatePicker components.
 *
 * @example
 *     import { DatePickerField } from '@bspk/ui/DatePickerField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState('option1');
 *
 *         return (
 *             <DatePickerField
 *                 id="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={(nextValue) => setState(nextValue)}
 *                 options={[
 *                     { label: 'Option 1', value: 'option1' },
 *                     { label: 'Option 2', value: 'option2' },
 *                     { label: 'Option 3', value: 'option3' },
 *                 ]}
 *                 placeholder="DatePicker one..."
 *                 value={state}
 *             />
 *         );
 *     }
 *
 * @name DatePickerField
 * @phase UXReview
 *
 * @export
 */
export function DatePickerField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    ...controlProps
}: Omit<DatePickerProps, keyof FormFieldProps> & Omit<FormFieldProps, 'children'>) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <DatePicker {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
