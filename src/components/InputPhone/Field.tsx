import { InputPhone, InputPhoneProps } from './InputPhone';
import { FormField, FormFieldProps } from '-/components/Field';

export type InputPhoneFieldProps = Omit<FormFieldProps, 'children'> & Omit<InputPhoneProps, keyof FormFieldProps>;

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and InputPhone components.
 *
 * @example
 *     import { InputPhoneField } from '@bspk/ui/InputPhoneField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState('option1');
 *
 *         return (
 *             <InputPhoneField
 *                 id="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={(nextValue) => setState(nextValue)}
 *                 options={[
 *                     { label: 'Option 1', value: 'option1' },
 *                     { label: 'Option 2', value: 'option2' },
 *                     { label: 'Option 3', value: 'option3' },
 *                 ]}
 *                 placeholder="InputPhone one..."
 *                 value={state}
 *             />
 *         );
 *     }
 *
 * @name InputPhoneField
 * @phase UXReview
 *
 * @export
 */
export function InputPhoneField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    ...controlProps
}: InputPhoneFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <InputPhone {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
