import { ButtonDock, ButtonDockProps } from '.';
import { SnackbarProvider } from '-/components/SnackbarProvider';
import { useSnackbarContext } from '-/hooks/useSnackbarContext';
import { ComponentExample, Preset } from '-/utils/demo';

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

export const ButtonDockExample: ComponentExample<ButtonDockProps> = {
    containerStyle: {
        height: '200px',
        width: '100%',
        maxWidth: 375,
        padding: '0 0 16px 0',
        justifyContent: 'end',
        overflow: 'hidden',
    },
    defaultState: presets[1].propState,
    disableProps: [],
    presets,
    render: ({ props }) => {
        return (
            <SnackbarProvider countLimit={3} timeout={1000}>
                <Example {...props} />
            </SnackbarProvider>
        );
    },
    sections: [],
    variants: false,
};

const Example = (exampleProps: ButtonDockProps) => {
    const { sendSnackbar } = useSnackbarContext();

    const { primaryButton, secondaryButton, ...restProps } = exampleProps;

    if (primaryButton) {
        primaryButton.onClick = () =>
            sendSnackbar({
                text: `Clicked primaryButton with text "${primaryButton.children}"`,
            });
    }

    if (secondaryButton) {
        secondaryButton.onClick = () =>
            sendSnackbar({
                text: `Clicked secondaryButton with text "${secondaryButton.children}"`,
            });
    }

    return <ButtonDock {...restProps} primaryButton={primaryButton} secondaryButton={secondaryButton ?? undefined} />;
};
