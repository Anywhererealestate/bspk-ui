import { SwitchProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const SwitchExample: ComponentExample<SwitchProps> = {
    defaultState: {
        'aria-label': 'switch aria-label',
    },
    render: ({ props, Component }) => <Component {...props} />,
};
