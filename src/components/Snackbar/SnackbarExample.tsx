import { clearSnackBar, sendSnackBar } from './Manager';
import { Snackbar, SnackbarProps } from './Snackbar';
import { Button } from '-/components/Button';
import { ComponentExample } from '-/utils/demo';

export const SnackbarExample: ComponentExample<SnackbarProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props, setState }) => (
        <>
            <Snackbar {...props} onClose={() => setState({ open: false })} />
            <Button
                label="Launch Inline Snackbar"
                onClick={() => setState({ open: true })}
                size="medium"
                title="Snackbar"
            />
            <br />
            <Button label="Launch Managed Snackbar" onClick={() => sendSnackBar({ text: 'Managed Snackbar' })} />
            <br />
            <Button label="Clear Managed Snackbar" onClick={() => clearSnackBar()} />
        </>
    ),
    sections: [],
    variants: false,
};
