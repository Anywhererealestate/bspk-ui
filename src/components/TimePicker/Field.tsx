import { TimePicker, TimePickerProps } from './TimePicker';
import { FormField, FormFieldControlProps } from '-/components/Field';

export type TimePickerFieldProps = FormFieldControlProps<TimePickerProps>;

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and TimePicker components.
 *
 * @example
 *     import { TimePickerField } from '@bspk/ui/TimePickerField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState('option1');
 *
 *         return (
 *             <TimePickerField
 *                 id="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={(nextValue) => setState(nextValue)}
 *                 options={[
 *                     { label: 'Option 1', value: 'option1' },
 *                     { label: 'Option 2', value: 'option2' },
 *                     { label: 'Option 3', value: 'option3' },
 *                 ]}
 *                 placeholder="TimePicker one..."
 *                 value={state}
 *             />
 *         );
 *     }
 *
 * @name TimePickerField
 * @phase UXReview
 *
 * @export
 */
export function TimePickerField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    ...controlProps
}: TimePickerFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <TimePicker {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
