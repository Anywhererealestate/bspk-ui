import { TextareaProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const TextareaExample: ComponentExample<TextareaProps> = {
    defaultState: {
        'aria-label': 'textarea aria-label',
    },
    render: ({ props, Component }) => <Component {...props} />,
};
