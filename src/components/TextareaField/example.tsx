import { ComponentExample } from '@utils';

import { TextareaFieldProps } from '../../TextareaField';

export const TextareaFieldExample: ComponentExample<TextareaFieldProps> = {
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
