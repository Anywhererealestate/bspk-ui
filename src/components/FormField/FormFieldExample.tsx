import { useState } from 'react';
import { FormField, FormFieldProps } from '.';
import { Button } from '-/components/Button';
import { CheckboxGroup } from '-/components/CheckboxGroup';
import { DatePicker } from '-/components/DatePicker';
import { Input } from '-/components/Input';
import { InputNumber } from '-/components/InputNumber';
import { InputPhone } from '-/components/InputPhone';
import { Password } from '-/components/Password';
import { RadioGroup } from '-/components/RadioGroup';
import { Select } from '-/components/Select';
import { SwitchOption } from '-/components/SwitchOption';
import { Textarea } from '-/components/Textarea';
import { TimePicker } from '-/components/TimePicker';
import { FieldControlProps } from '-/types/common';
import { ComponentExample, Preset, Syntax } from '-/utils/demo';

export type ExampleProps = Partial<FieldControlProps & FormFieldProps>;

export const presets: Preset<Partial<ExampleProps>>[] = [
    {
        label: 'Control Disabled',
        propState: { disabled: true },
    },
];

export const FormFieldExample: ComponentExample<ExampleProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
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
            content: ({ Syntax: syntax, props }) => (
                <>
                    <p>
                        This example demonstrates the FormField component wrapping various form controls including
                        CheckboxGroup, RadioGroup, DatePicker, Input, InputNumber, InputPhone, Password, Select,
                        Textarea, and TimePicker. It showcases how to manage state and handle form submissions.
                    </p>
                    <p>
                        All the controls have a HTML input element inside of them so they will work with form
                        submissions natively. You can see the raw submitted{' '}
                        <a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">FormData</a> at the bottom
                        after clicking the Submit button.
                    </p>
                    <FormFieldExampleRender {...props} syntax={syntax} />
                </>
            ),
            location: 'afterDemo',
        },
    ],
    variants: false,
};

export function FormFieldExampleRender({ ...props }: ExampleProps & { syntax?: Syntax }) {
    const [value, setValueState] = useState<{ [key: string]: unknown }>({});

    const setValue = (next: { [key: string]: unknown }) => {
        setValueState((prev) => ({ ...prev, ...next }));
    };

    const [formValues, setFormValues] = useState<{ [key: string]: unknown }>({});

    const [disabled, setDisabled] = useState(!!props.disabled);
    const [required, setRequired] = useState(!!props.required);

    const [fieldProps, setFieldProps] = useState<{
        errorMessage: boolean;
        description: boolean;
    }>({
        errorMessage: false,
        description: false,
    });

    const internalProps = (label: string) => {
        return {
            errorMessage: fieldProps.errorMessage ? `This is an error message for the ${label}.` : undefined,
            helperText: fieldProps.description ? `This is a description for the ${label}.` : undefined,
            label,
        };
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <SwitchOption
                    checked={fieldProps.errorMessage}
                    label="Has Error"
                    name="hasError"
                    onChange={(checked) => setFieldProps((prev) => ({ ...prev, errorMessage: checked }))}
                    value="hasError"
                />
                <SwitchOption
                    checked={disabled}
                    label="Disabled"
                    name="disabled"
                    onChange={setDisabled}
                    value="disabled"
                />
                <SwitchOption
                    checked={required}
                    label="Required"
                    name="required"
                    onChange={setRequired}
                    value="required"
                />
                <SwitchOption
                    checked={!!fieldProps.description}
                    label="With Description"
                    name="description"
                    onChange={(checked) => setFieldProps((prev) => ({ ...prev, description: checked }))}
                    value="description"
                />
            </div>
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
                <FormField {...props} as="fieldset" {...internalProps('CheckboxGroup')}>
                    <CheckboxGroup
                        disabled={disabled}
                        name="checkbox-group"
                        onChange={(next) => setValue({ 'checkbox-group': next })}
                        options={[
                            { label: 'Option 1', value: 'option1' },
                            { label: 'Option 2', value: 'option2' },
                            { label: 'Option 3', value: 'option3' },
                        ]}
                        required={required}
                        value={value['checkbox-group'] as string[]}
                    />
                </FormField>
                <FormField {...props} as="fieldset" {...internalProps('RadioGroup')}>
                    <RadioGroup
                        disabled={disabled}
                        name="radio-group"
                        onChange={(next) => setValue({ 'radio-group': next })}
                        options={[
                            { label: 'Option 1', value: 'option1' },
                            { label: 'Option 2', value: 'option2' },
                            { label: 'Option 3', value: 'option3' },
                        ]}
                        required={required}
                        value={value['radio-group'] as string}
                    />
                </FormField>
                <FormField {...props} {...internalProps('DatePicker')}>
                    <DatePicker
                        disabled={disabled}
                        name="date-picker"
                        onChange={(next) => setValue({ 'date-picker': next })}
                        placeholder="Example input"
                        required={required}
                        value={value['date-picker'] as Date}
                    />
                </FormField>
                <FormField {...props} {...internalProps('Input')}>
                    <Input
                        disabled={disabled}
                        name="input"
                        onChange={(next) => setValue({ input: next })}
                        placeholder="Example input"
                        required={required}
                        value={value['input'] as string}
                    />
                </FormField>
                <FormField {...props} {...internalProps('InputNumber')}>
                    <InputNumber
                        disabled={disabled}
                        name="input-number"
                        onChange={(next) => setValue({ 'input-number': next })}
                        required={required}
                        value={value['input-number'] as number}
                    />
                </FormField>
                <FormField {...props} {...internalProps('InputPhone')}>
                    <InputPhone
                        disabled={disabled}
                        name="input-phone"
                        onChange={(next) => setValue({ 'input-phone': next })}
                        required={required}
                        value={value['input-phone'] as string}
                    />
                </FormField>
                <FormField {...props} {...internalProps('Password')}>
                    <Password
                        disabled={disabled}
                        name="password"
                        onChange={(next) => setValue({ password: next })}
                        required={required}
                        value={value['password'] as string}
                    />
                </FormField>
                <FormField {...props} {...internalProps('Select')}>
                    <Select
                        disabled={disabled}
                        name="select"
                        onChange={(next) => setValue({ select: next })}
                        options={[
                            { label: 'Option 1', value: 'option1' },
                            { label: 'Option 2', value: 'option2' },
                            { label: 'Option 3', value: 'option3' },
                        ]}
                        placeholder="Example input"
                        required={required}
                        value={value['select'] as string}
                    />
                </FormField>
                <FormField {...props} {...internalProps('Textarea')}>
                    <Textarea
                        disabled={disabled}
                        name="textarea"
                        onChange={(next) => setValue({ textarea: next })}
                        placeholder="Example input"
                        required={required}
                        value={value['textarea'] as string}
                    />
                </FormField>
                <FormField {...props} {...internalProps('TimePicker')}>
                    <TimePicker
                        disabled={disabled}
                        name="time-picker"
                        onChange={(next) => setValue({ 'time-picker': next })}
                        required={required}
                        value={value['time-picker'] as string}
                    />
                </FormField>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--spacing-sizing-02)' }}>
                    <Button label="Reset" type="reset" variant="secondary" />
                    <Button label="Submit" type="submit" variant="primary" />
                </div>
                <code
                    style={{
                        background: 'var(--surface-neutral-t3-low)',
                        // fontWeight: 'bold',
                        padding: 'var(--spacing-sizing-02)',
                        borderRadius: 'var(--radius-sm)',
                    }}
                >
                    <pre>{`// Raw FormData\n\n${JSON.stringify(formValues, null, 2)}`}</pre>
                </code>
            </form>
        </>
    );
}
