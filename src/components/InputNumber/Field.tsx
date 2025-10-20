import { InputNumber, InputNumberProps } from './InputNumber';
import { FormField, FormFieldControlProps } from '-/components/Field';

export type InputNumberFieldProps = FormFieldControlProps<InputNumberProps>;

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and InputNumber components.
 *
 * @example
 *     import { InputNumberField } from '@bspk/ui/InputNumberField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState('option1');
 *
 *         return (
 *             <InputNumberField
 *                 id="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={(nextValue) => setState(nextValue)}
 *                 options={[
 *                     { label: 'Option 1', value: 'option1' },
 *                     { label: 'Option 2', value: 'option2' },
 *                     { label: 'Option 3', value: 'option3' },
 *                 ]}
 *                 placeholder="InputNumber one..."
 *                 value={state}
 *             />
 *         );
 *     }
 *
 * @name InputNumberField
 * @phase UXReview
 *
 * @export
 */
export function InputNumberField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    ...controlProps
}: InputNumberFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <InputNumber {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
