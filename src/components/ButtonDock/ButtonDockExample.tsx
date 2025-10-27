import { ButtonDockProps } from '.';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<ButtonDockProps>[] = [
    {
        label: 'One Button',
        propState: {
            mode: 'inline',
            primaryButton: {
                children: 'Send',
                label: 'send',
            },
            secondaryButton: undefined,
        },
    },
    {
        label: 'Two Buttons',
        propState: {
            mode: 'inline',
            arrangement: 'fill',
            secondaryButton: {
                children: 'Cancel',
                label: 'cancel',
            },
            primaryButton: {
                children: 'Send',
                label: 'send',
            },
        },
    },
    {
        label: 'Two Buttons Spread',
        propState: {
            mode: 'inline',
            arrangement: 'spread',
            secondaryButton: {
                children: 'Cancel',
                label: 'cancel',
            },
            primaryButton: {
                children: 'Send',
                label: 'send',
            },
        },
    },
];

export const ButtonDockExample: ComponentExampleFn<ButtonDockProps> = ({ action }) => ({
    containerStyle: {
        height: '200px',
        width: '100%',
        padding: '0 0 16px 0',
        justifyContent: 'end',
        overflow: 'hidden',
    },
    defaultState: presets[1].propState,
    disableProps: [],
    presets,
    render: ({ props, Component }) => {
        const newProps = { ...props };
        if (newProps.primaryButton) {
            newProps.primaryButton = {
                ...newProps.primaryButton,
                onClick: () => action('Primary button clicked!'),
            };
        }
        if (newProps.secondaryButton) {
            newProps.secondaryButton = {
                ...newProps.secondaryButton,
                onClick: () => action('Secondary button clicked!'),
            };
        }
        return <Component {...newProps} />;
    },
    variants: false,
});
