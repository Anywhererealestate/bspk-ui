import { useState } from 'react';
import { Textarea, TextareaProps } from '.';
import { Field, FieldDescription, FieldLabel } from '-/components/Field';
import { ComponentExample } from '-/utils/demo';

export const TextareaExample: ComponentExample<TextareaProps> = {
    defaultState: {
        'aria-label': 'textarea aria-label',
    },
    render: ({ props, Component }) => <Component {...props} />,
    containerStyle: {
        width: 320,
        padding: 0,
    },
};

export const Usage = () => {
    const [value, setValue] = useState<string | undefined>('');

    return (
        <div style={{ width: 320 }}>
            <Field>
                <FieldLabel>Example Textarea</FieldLabel>
                <Textarea name="example-name" onChange={setValue} value={value} />
                <FieldDescription>This is an example textarea field.</FieldDescription>
            </Field>
        </div>
    );
};
