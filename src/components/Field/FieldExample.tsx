import { Field, FieldDescription, FieldError, FieldLabel, FieldProps } from './';
import { Input } from '-/components/Input';
import { ComponentExample } from '-/utils/demo';
import { randomString } from '-/utils/random';

export const FieldExample: ComponentExample<FieldProps & { value?: string }> = {
    render: ({ props, setState }) => {
        return (
            <Field {...props}>
                <FieldLabel>Example label</FieldLabel>
                <Input
                    name={`example-${randomString(6)}`}
                    onChange={(next: string) => setState({ value: next })}
                    value={props.value}
                />
                <FieldDescription>This is an example description.</FieldDescription>
                <FieldError label="This is an error message." />
            </Field>
        );
    },
};
