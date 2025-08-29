import { PasswordInputProps } from './PasswordInput';
import { ComponentExample } from '-/utils/demo';

export const PasswordInputExample: ComponentExample<PasswordInputProps> = {
    render: ({ props, Component }) => <Component {...props} />,
    //variants: false,
};
