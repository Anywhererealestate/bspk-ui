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
                {...{
                    invalid,
                    errorMessage,
                    label,
                    controlId,
                    helperText,
                    labelTrailing,
                }}
            >
                {({ 'aria-describedby': ariaDescribedBy, 'aria-errormessage': ariaErrorMessage }) => {
                    return (
                        <TextInput
                            {...inputProps}
                            aria-describedby={ariaDescribedBy}
                            aria-errormessage={ariaErrorMessage}
                            aria-invalid={props.invalid}
                            aria-label={label}
                            invalid={invalid}
                            onChange={(next: string) => {
                                setState({ value: next });
                            }}
                            value={props.value}
                        />
                    );
                }}
            </FormField>
        );
    },
};
