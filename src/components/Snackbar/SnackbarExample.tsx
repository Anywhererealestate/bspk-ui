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
            <Button label="open snackbar" onClick={() => setState({ open: true })} size="medium" title="Snackbar" />
        </>
    ),
    sections: [],
    variants: false,
};
