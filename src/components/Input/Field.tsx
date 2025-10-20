import { Input, InputProps } from './Input';
import { FormField, FormFieldControlProps } from '-/components/Field';

export type InputFieldProps = FormFieldControlProps<InputProps>;

/**
 * /** A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and Input components.
 *
 * @example
 *     import { InputField } from '@bspk/ui/InputField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState('option1');
 *
 *         return (
 *             <InputField
 *                 id="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={(nextValue) => setState(nextValue)}
 *                 options={[
 *                     { label: 'Option 1', value: 'option1' },
 *                     { label: 'Option 2', value: 'option2' },
 *                     { label: 'Option 3', value: 'option3' },
 *                 ]}
 *                 placeholder="Input one..."
 *                 value={state}
 *             />
 *         );
 *     }
 *
 * @name InputField
 * @phase UXReview
 *
 * @export
 */
export function InputField({ label, helperText, labelTrailing, errorMessage, ...controlProps }: InputFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <Input {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
