import { DatePickerProps } from '.';
import { Field, FieldDescription, FieldLabel } from '-/components/Field';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<DatePickerProps>[] = [];

export const DatePickerExample: ComponentExample<DatePickerProps> = {
    defaultState: {},
    disableProps: [],
    presets,
    render: ({ props, Component }) => {
        const { value, ...restProps } = props;

        return (
            <Field>
                <FieldLabel>Date</FieldLabel>
                <Component {...restProps} value={value?.getDate ? value : undefined} />
                <FieldDescription>The date picker allows you to select a date.</FieldDescription>
            </Field>
        );
    },
    sections: [],
    variants: false,
};
