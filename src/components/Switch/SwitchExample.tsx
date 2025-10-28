import { SwitchProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const SwitchExample: ComponentExample<SwitchProps> = {
    render: ({ props, Component }) => <Component {...props} aria-label={props['aria-label'] || 'switch aria-label'} />,
};
