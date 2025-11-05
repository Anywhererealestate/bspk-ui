import { TooltipProps } from './Tooltip';
import { ComponentExample } from '-/utils/demo';

export const TooltipExample: ComponentExample<TooltipProps> = {
    defaultState: {
        children: (triggerProps) => <span {...triggerProps}>Hover me</span>,
    },
    presets: [
        {
            label: 'Long Label Tooltip',
            propState: {
                label: 'This is a longer tooltip label to demonstrate how the tooltip handles more content.',
                placement: 'top',
                children: (triggerProps) => <span {...triggerProps}>Long Tooltip Label</span>,
            },
        },
        {
            label: 'No Label',
            propState: {
                label: '',
                placement: 'top',
                children: (triggerProps) => <span {...triggerProps}>No Label</span>,
            },
        },
    ],
    render: ({ props, Component }) => {
        return <Component {...props}>{props.children || (() => <span>No Hover</span>)}</Component>;
    },
};
