import { NumberInputProps } from './NumberInput';
import { ComponentExample } from '-/utils/demo';

export const NumberInputExample: ComponentExample<NumberInputProps> = {
    render: ({ props, Component }) => <Component {...props} />,
};
