import { useState } from 'react';
import { FormField, FormFieldProps } from '.';
import { Button } from '-/components/Button';
import { DatePicker } from '-/components/DatePicker';
import { Input } from '-/components/Input';
import { InputNumber } from '-/components/InputNumber';
import { InputPhone } from '-/components/InputPhone';
import { Password } from '-/components/Password';
import { Select } from '-/components/Select';
import { Textarea } from '-/components/Textarea';
import { TimePicker } from '-/components/TimePicker';
import { CommonProps } from '-/types/common';
import { ComponentExample, Preset, Syntax } from '-/utils/demo';

type ExampleProps = Partial<CommonProps<'disabled'> & FormFieldProps>;

export const presets: Preset<Partial<ExampleProps>>[] = [
    {
        label: 'Control Disabled',
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
    render: ({ props, Component }) => (
        <Component {...props}>
            <Input name="input" onChange={() => {}} placeholder="Example input" value="" />
        </Component>
    ),
    sections: [
        {
            title: 'Form Field Example',
            content: ({ Syntax: syntax }) => (
                <>
                    <p>
                        This example demonstrates the FormField component wrapping various form controls including
                        DatePicker, Input, InputNumber, InputPhone, Password, Select, Textarea, and TimePicker. It
                        showcases how to manage state and handle form submissions.
                    </p>
                    <FormFieldExampleRender syntax={syntax} />
                </>
            ),
            location: 'afterDemo',
        },
    ],
    variants: false,
};

export function FormFieldExampleRender({ syntax: Code, ...props }: ExampleProps & { syntax?: Syntax }) {
    const [value, setValueState] = useState<{ [key: string]: unknown }>({});

    const setValue = (next: { [key: string]: unknown }) => {
        setValueState((prev) => ({ ...prev, ...next }));
    };

    const [formValues, setFormValues] = useState<{ [key: string]: unknown }>({});

    return (
        <form
            onReset={() => {
                setValueState({});
                setFormValues({});
            }}
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const next: { [key: string]: unknown[] | unknown } = {};
                // handle multiple form entries with the same name
                formData.forEach((fieldValue, key) => {
                    if (next[key]) {
                        if (Array.isArray(next[key])) {
                            (next[key] as unknown[]).push(fieldValue);
                        } else {
                            next[key] = [next[key], fieldValue];
                        }
                    } else {
                        next[key] = fieldValue;
                    }
                });
                setFormValues(next);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sizing-04)', width: '400px' }}
        >
            <FormField {...props} label="DatePicker">
                <DatePicker
                    disabled={props.disabled}
                    name="date-picker"
                    onChange={(next) => setValue({ 'date-picker': next })}
                    placeholder="Example input"
                    value={value['date-picker'] as string}
                />
            </FormField>
            <FormField {...props} label="Input">
                <Input
                    disabled={props.disabled}
                    name="input"
                    onChange={(next) => setValue({ input: next })}
                    placeholder="Example input"
                    value={value['input'] as string}
                />
            </FormField>
            <FormField {...props} label="InputNumber">
                <InputNumber
                    disabled={props.disabled}
                    name="input-number"
                    onChange={(next) => setValue({ 'input-number': next })}
                    value={value['input-number'] as number}
                />
            </FormField>
            <FormField {...props} label="InputPhone">
                <InputPhone
                    disabled={props.disabled}
                    name="input-phone"
                    onChange={(next) => setValue({ 'input-phone': next })}
                    value={value['input-phone'] as string}
                />
            </FormField>
            <FormField {...props} label="Password">
                <Password
                    disabled={props.disabled}
                    name="password"
                    onChange={(next) => setValue({ password: next })}
                    value={value['password'] as string}
                />
            </FormField>
            <FormField {...props} label="Select">
                <Select
                    disabled={props.disabled}
                    name="select"
                    onChange={(next) => setValue({ select: next })}
                    options={[
                        { label: 'Option 1', value: 'option1' },
                        { label: 'Option 2', value: 'option2' },
                        { label: 'Option 3', value: 'option3' },
                    ]}
                    placeholder="Example input"
                    value={value['select'] as string}
                />
            </FormField>
            <FormField {...props} label="Textarea">
                <Textarea
                    disabled={props.disabled}
                    name="textarea"
                    onChange={(next) => setValue({ textarea: next })}
                    placeholder="Example input"
                    value={value['textarea'] as string}
                />
            </FormField>
            <FormField {...props} label="TimePicker">
                <TimePicker
                    disabled={props.disabled}
                    name="time-picker"
                    onChange={(next) => setValue({ 'time-picker': next })}
                    value={value['time-picker'] as string}
                />
            </FormField>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--spacing-sizing-02)' }}>
                <Button label="Reset" type="reset" variant="secondary" />
                <Button label="Submit" type="submit" variant="primary" />
            </div>

            {Code && <Code code={`// Submitted Form Data\n${JSON.stringify(formValues, null, 2)}`} />}
        </form>
    );
}
