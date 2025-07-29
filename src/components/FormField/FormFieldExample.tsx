import { FormFieldProps } from './FormField';
import { TextInput } from '-/components/TextInput';
import { ComponentExample } from '-/utils/demo';

export const FormFieldExample: ComponentExample<FormFieldProps & { value: string }> = {
    render: ({ props, setState, Component }) => {
        return (
            <Component {...props}>
                {({ invalid, 'aria-describedby': ariaDescribedBy, 'aria-errormessage': ariaErrorMessage }) => {
                    return (
                        <TextInput
                            aria-describedby={ariaDescribedBy}
                            aria-errormessage={ariaErrorMessage}
                            aria-invalid={invalid}
                            aria-label=""
                            invalid={invalid}
                            name=""
                            onChange={(next: string) => {
                                setState({ value: next });
                            }}
                            placeholder="Placeholder"
                            value={props.value}
                        />
                    );
                }}
            </Component>
        );
    },
};
