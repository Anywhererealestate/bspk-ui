import { InputNumberProps } from './InputNumber';
import { Field, FieldDescription, FieldLabel } from '-/components/Field';
import { ComponentExample } from '-/utils/demo';

export const InputNumberExample: ComponentExample<InputNumberProps> = {
    render: ({ props, Component }) => (
        <Field>
            <FieldLabel>Example Input Number</FieldLabel>
            <Component {...props} />
            <FieldDescription>The input number allows you to increment or decrement a value.</FieldDescription>
        </Field>
    ),
};
