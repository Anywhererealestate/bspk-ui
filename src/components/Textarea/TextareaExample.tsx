import { TextareaProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const TextareaExample: ComponentExample<TextareaProps> = {
    render: ({ props, Component }) => <Component {...props} />,
};
