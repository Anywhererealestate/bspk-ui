import { CheckboxProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const CheckboxExample: ComponentExample<CheckboxProps> = {
    defaultState: {
        'aria-label': 'checkbox aria-label',
    },
    render: ({ props, Component }) => <Component {...props} />,
};
