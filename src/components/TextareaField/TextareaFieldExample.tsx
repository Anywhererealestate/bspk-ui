import { TextareaFieldProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const TextareaFieldExample: ComponentExample<TextareaFieldProps> = {
    render: ({ Component, props }) => {
        const tooManyCharacters = Boolean(props.value && props.maxLength && props.value?.length > props.maxLength);

        const invalid = props.invalid || tooManyCharacters;
        const errorMessage = tooManyCharacters ? 'Too Many characters' : props.errorMessage || '';

        return <Component {...props} errorMessage={errorMessage} invalid={invalid} />;
    },
};
