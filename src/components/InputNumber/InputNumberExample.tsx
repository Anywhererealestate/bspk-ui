import { InputNumberProps } from './InputNumber';
import { ComponentExample } from '-/utils/demo';

export const InputNumberExample: ComponentExample<InputNumberProps> = {
    defaultState: {
        'aria-label': 'input number aria-label',
    },
    render: ({ props, Component }) => <Component {...props} />,
    variants: false,
};
