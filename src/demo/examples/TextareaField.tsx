import { TextareaFieldProps } from '../../TextareaField';
import { ComponentExample } from '../utils';

export const TextareaFieldExample: ComponentExample<TextareaFieldProps> = {
    containerStyle: { width: 343 },
    render: ({ Component, props }) => {
        const tooManyCharacters = Boolean(props.value && props.maxLength && props.value?.length > props.maxLength);

        const invalid = props.invalid || tooManyCharacters;

        return (
            <Component
                {...props}
                errorMessage={invalid ? props.errorMessage || 'Too Many characters' : ''}
                invalid={invalid}
            />
        );
    },
};
