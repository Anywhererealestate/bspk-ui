import { TextareaProps } from '.';
import { Field, FieldLabel } from '-/components/Field';
import { ComponentExample } from '-/utils/demo';

export const TextareaExample: ComponentExample<TextareaProps> = {
    render: ({ props, Component }) => (
        <Field>
            <FieldLabel>Common</FieldLabel>
            <Component {...props} />
        </Field>
    ),
};
