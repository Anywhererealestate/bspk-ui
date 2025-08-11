import { FormFieldWrapProps, FormField } from './FormField';
import { TextInput, TextInputProps } from '-/components/TextInput';
import { ComponentExample } from '-/utils/demo';

export const FormFieldExample: ComponentExample<FormFieldWrapProps<TextInputProps>> = {
    render: ({ props, setState }) => {
        const {
            invalid,
            errorMessage,
            label,
            controlId = 'example-control-id',
            helperText,
            labelTrailing,
            ...inputProps
        } = props;

        return (
            <FormField
                controlId={controlId}
                errorMessage={errorMessage}
                helperText={helperText}
                invalid={invalid}
                label={label}
                labelTrailing={labelTrailing}
            >
                {(fieldProps) => {
                    return (
                        <TextInput
                            {...inputProps}
                            {...fieldProps}
                            aria-label={label}
                            invalid={invalid}
                            onChange={(next: string) => setState({ value: next })}
                            value={props.value}
                        />
                    );
                }}
            </FormField>
        );
    },
};
