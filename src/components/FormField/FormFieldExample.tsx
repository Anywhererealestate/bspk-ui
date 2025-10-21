import { ComponentType, useState } from 'react';
import { FormFieldProps } from '.';
import { DatePicker } from '-/components/DatePicker';
import { FieldControlProp } from '-/components/Field';
import { Input } from '-/components/Input';
import { InputNumber } from '-/components/InputNumber';
import { InputPhone } from '-/components/InputPhone';
import { Password } from '-/components/Password';
import { Select } from '-/components/Select';
import { Textarea } from '-/components/Textarea';
import { TimePicker } from '-/components/TimePicker';
import { ComponentExample, Preset } from '-/utils/demo';

type ExampleProps = FieldControlProp & FormFieldProps;

export const presets: Preset<Partial<ExampleProps>>[] = [
    {
        label: 'Not Disabled',
        propState: { disabled: false },
    },
    {
        label: 'Disabled',
        propState: { disabled: true },
    },
];

export const FormFieldExample: ComponentExample<ExampleProps> = {
    containerStyle: { width: '100%' },
    defaultState: {
        disabled: false,
    },
    disableProps: [],
    presets: presets as Preset<ExampleProps>[],
    render: ({ props, Component }) => <ExampleRender Component={Component} props={props} />,
    sections: [],
    variants: false,
};

function ExampleRender({ props, Component }: { props: ExampleProps; Component: ComponentType<FormFieldProps> }) {
    const [value, setValue] = useState<unknown>();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sizing-04)' }}>
            <Component {...props} label="DatePicker">
                <DatePicker
                    disabled={props.disabled}
                    name="input"
                    onChange={setValue}
                    placeholder="Example input"
                    value={value as string}
                />
            </Component>
            <Component {...props} label="Input">
                <Input
                    disabled={props.disabled}
                    name="input"
                    onChange={setValue}
                    placeholder="Example input"
                    value={value as string}
                />
            </Component>
            <Component {...props} label="InputNumber">
                <InputNumber disabled={props.disabled} name="input" onChange={setValue} value={value as number} />
            </Component>
            <Component {...props} label="InputPhone">
                <InputPhone disabled={props.disabled} name="input" onChange={setValue} value={value as string} />
            </Component>
            <Component {...props} label="Password">
                <Password disabled={props.disabled} name="input" onChange={setValue} value={value as string} />
            </Component>
            <Component {...props} label="Select">
                <Select
                    disabled={props.disabled}
                    name="input"
                    onChange={setValue}
                    options={[]}
                    placeholder="Example input"
                    value={value as string}
                />
            </Component>
            <Component {...props} label="Textarea">
                <Textarea
                    disabled={props.disabled}
                    name="input"
                    onChange={setValue}
                    placeholder="Example input"
                    value={value as string}
                />
            </Component>
            <Component {...props} label="TimePicker">
                <TimePicker disabled={props.disabled} name="input" onChange={setValue} value={value as string} />
            </Component>
        </div>
    );
}
