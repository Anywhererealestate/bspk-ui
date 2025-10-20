import { Textarea, TextareaProps } from './Textarea';
import { FormField, FormFieldProps } from '-/components/Field';

export type TextareaFieldProps = Omit<FormFieldProps, 'children'> & Omit<TextareaProps, keyof FormFieldProps>;

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and Textarea components.
 *
 * @example
 *     import { TextareaField } from '@bspk/ui/TextareaField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState('option1');
 *
 *         return (
 *             <TextareaField
 *                 id="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={(nextValue) => setState(nextValue)}
 *                 options={[
 *                     { label: 'Option 1', value: 'option1' },
 *                     { label: 'Option 2', value: 'option2' },
 *                     { label: 'Option 3', value: 'option3' },
 *                 ]}
 *                 placeholder="Textarea one..."
 *                 value={state}
 *             />
 *         );
 *     }
 *
 * @name TextareaField
 * @phase UXReview
 *
 * @export
 */
export function TextareaField({ label, helperText, labelTrailing, errorMessage, ...controlProps }: TextareaFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <Textarea {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
