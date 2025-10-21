import { ComponentType, useState } from 'react';
import { FormFieldProps } from '.';
import { DatePicker } from '-/components/DatePicker';
import { Input } from '-/components/Input';
import { InputNumber } from '-/components/InputNumber';
import { InputPhone } from '-/components/InputPhone';
import { Password } from '-/components/Password';
import { Select } from '-/components/Select';
import { Textarea } from '-/components/Textarea';
import { TimePicker } from '-/components/TimePicker';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<FormFieldProps>[] = [];

export const FormFieldExample: ComponentExample<FormFieldProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets,
    render: ({ props, Component }) => <ExampleRender Component={Component} props={props} />,
    sections: [],
    variants: false,
};

function ExampleRender({ props, Component }: { props: FormFieldProps; Component: ComponentType<FormFieldProps> }) {
    const [value, setValue] = useState<unknown>();

    // DatePicker,
    // Input,
    // InputNumber,
    // InputPhone,
    // Password,
    // Select,
    // Textarea,
    // TimePicker,

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sizing-04)' }}>
            <Component {...props} label="DatePicker">
                <DatePicker name="input" onChange={setValue} placeholder="Example input" value={value as string} />
            </Component>
            <Component {...props} label="Input">
                <Input name="input" onChange={setValue} placeholder="Example input" value={value as string} />
            </Component>
            <Component {...props} label="InputNumber">
                <InputNumber name="input" onChange={setValue} value={value as number} />
            </Component>
            <Component {...props} label="InputPhone">
                <InputPhone name="input" onChange={setValue} value={value as string} />
            </Component>
            <Component {...props} label="Password">
                <Password name="input" onChange={setValue} value={value as string} />
            </Component>
            <Component {...props} label="Select">
                <Select
                    name="input"
                    onChange={setValue}
                    options={[]}
                    placeholder="Example input"
                    value={value as string}
                />
            </Component>
            <Component {...props} label="Textarea">
                <Textarea name="input" onChange={setValue} placeholder="Example input" value={value as string} />
            </Component>
            <Component {...props} label="TimePicker">
                <TimePicker name="input" onChange={setValue} value={value as string} />
            </Component>
        </div>
    );
}
