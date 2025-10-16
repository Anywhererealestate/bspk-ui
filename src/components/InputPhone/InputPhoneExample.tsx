import { InputPhoneProps } from '.';
import { Field, FieldDescription, FieldLabel } from '-/components/Field';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<InputPhoneProps>[] = [];

export const InputPhoneExample: ComponentExample<InputPhoneProps> = {
    variants: false,
    render: ({ props, Component }) => (
        <Field>
            <FieldLabel>Example Input Phone</FieldLabel>
            <Component {...props} />
            <FieldDescription>The phone input allows you to enter a phone number with country code.</FieldDescription>
        </Field>
    ),
};
