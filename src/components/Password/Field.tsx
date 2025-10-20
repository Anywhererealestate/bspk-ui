import { Password, PasswordProps } from './Password';
import { FormField, FormFieldProps } from '-/components/Field';

export type PasswordFieldProps = Omit<FormFieldProps, 'children'> & Omit<PasswordProps, keyof FormFieldProps>;

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and Password components.
 *
 * @example
 *     import { PasswordField } from '@bspk/ui/PasswordField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState('option1');
 *
 *         return (
 *             <PasswordField
 *                 id="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={(nextValue) => setState(nextValue)}
 *                 options={[
 *                     { label: 'Option 1', value: 'option1' },
 *                     { label: 'Option 2', value: 'option2' },
 *                     { label: 'Option 3', value: 'option3' },
 *                 ]}
 *                 placeholder="Password one..."
 *                 value={state}
 *             />
 *         );
 *     }
 *
 * @name PasswordField
 * @phase UXReview
 *
 * @export
 */
export function PasswordField({ label, helperText, labelTrailing, errorMessage, ...controlProps }: PasswordFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <Password {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
