import { useState } from 'react';
import { Field, FieldProps } from './';
import { Input } from '-/components/Input';
import { ComponentExample } from '-/utils/demo';
import { randomString } from '-/utils/random';

export const FieldExample: ComponentExample<FieldProps & { value?: string }> = {
    render: ({ props, setState }) => {
        return (
            <Field
                {...props}
                errorMessage="This is an error message."
                helperText="This is an example description."
                label="Example label"
            >
                <Input
                    id={props.controlId}
                    name={`example-${randomString(6)}`}
                    onChange={(next: string) => setState({ value: next })}
                    value={props.value}
                />
            </Field>
        );
    },
};

export const Usage = () => {
    const [state, setState] = useState<string | undefined>(undefined);

    return (
        <Field controlId="example-control-id" helperText="This is an example description." label="Example label">
            <Input
                aria-label="example aria-label"
                id="example-control-id"
                name="example-text"
                onChange={(next) => {
                    setState(next);
                }}
                value={state}
            />
        </Field>
    );
};
