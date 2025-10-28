import { CheckboxProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const CheckboxExample: ComponentExample<CheckboxProps> = {
    render: ({ props, Component }) => (
        <Component {...props} aria-label={props['aria-label'] || 'checkbox aria-label'} />
    ),
};
