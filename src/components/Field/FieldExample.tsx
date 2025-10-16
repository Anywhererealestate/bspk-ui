import { Field, FieldDescription, FieldError, FieldLabel, FieldProps } from './';
import { Input } from '-/components/Input';
import { ComponentExample } from '-/utils/demo';

export const FieldExample: ComponentExample<FieldProps & { value?: string }> = {
    render: ({ props, setState }) => {
        return (
            <Field {...props}>
                <FieldLabel>Example label</FieldLabel>
                <Input onChange={(next: string) => setState({ value: next })} value={props.value} />
                <FieldDescription>This is an example description.</FieldDescription>
                <FieldError>This is an error message.</FieldError>
            </Field>
        );
    },
};
