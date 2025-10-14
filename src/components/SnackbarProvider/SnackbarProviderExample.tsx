import { SnackbarProvider, SnackbarProviderProps } from './SnackbarProvider';
import { Button } from '-/components/Button';
import { useSnackbarContext } from '-/hooks/useSnackbarContext';
import { ComponentExample } from '-/utils/demo';

function SnackbarDemo(props: SnackbarProviderProps) {
    const label = 'Open Snackbar';
    const { sendSnackbar } = useSnackbarContext();

    const onButtonClick = () => {
        sendSnackbar({
            text: props.text,
            timeout: props.timeout,
            closeButton: props.closeButton,
            closeButtonLabel: props.closeButtonLabel,
        });
    };

    return <Button label={label} onClick={onButtonClick} size="medium" title="Snackbar" />;
}

export const SnackbarProviderExample: ComponentExample<SnackbarProviderProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props }) => (
        <SnackbarProvider
            {...props}
            closeButton={props.closeButton}
            closeButtonLabel={props.closeButtonLabel}
            countLimit={props.countLimit}
            onClose={() => {}}
            text={props.text}
            timeout={props.timeout}
        >
            <SnackbarDemo {...props} />
        </SnackbarProvider>
    ),
    sections: [],
    variants: {},
};
