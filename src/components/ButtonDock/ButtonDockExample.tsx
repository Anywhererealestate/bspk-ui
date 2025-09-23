import { ButtonDock, ButtonDockProps } from '.';
import { SnackbarProvider } from '-/components/SnackbarProvider';
import { useSnackbarContext } from '-/hooks/useSnackbarContext';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<ButtonDockProps>[] = [
    {
        label: 'One Button',
        propState: {
            mode: 'inline',
            buttonData: [
                {
                    id: '1',
                    props: {
                        children: 'Send',
                        label: 'send',
                    },
                },
            ],
        },
    },
    {
        label: 'Two Buttons',
        propState: {
            mode: 'inline',
            arrangement: 'fill',
            buttonData: [
                {
                    id: '1',
                    props: {
                        children: 'Cancel',
                        label: 'cancel',
                        variant: 'secondary',
                    },
                },
                {
                    id: '2',
                    props: {
                        children: 'Send',
                        label: 'send',
                    },
                },
            ],
        },
    },
    {
        label: 'Two Buttons Spread',
        propState: {
            mode: 'inline',
            arrangement: 'spread',
            buttonData: [
                {
                    id: '1',
                    props: {
                        children: 'Cancel',
                        label: 'cancel',
                        variant: 'secondary',
                    },
                },
                {
                    id: '2',
                    props: {
                        children: 'Send',
                        label: 'send',
                    },
                },
            ],
        },
    },
];

export const ButtonDockExample: ComponentExample<ButtonDockProps> = {
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

    const { buttonData, ...restProps } = exampleProps;

    const buttonDataWithOnClick = buttonData.map(({ props, ...restData }) => ({
        ...restData,
        props: {
            ...props,
            onClick: () => {
                sendSnackbar({
                    text: `Clicked ${props.children}`,
                });
            },
        },
    }));

    return <ButtonDock {...restProps} buttonData={buttonDataWithOnClick} />;
};
