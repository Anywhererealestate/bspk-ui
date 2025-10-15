import { useState } from 'react';
import { Snackbar, SnackbarProps } from './Snackbar';
import { Button } from '-/components/Button';
import { ComponentExample } from '-/utils/demo';

function SnackbarDemo(props: SnackbarProps) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    return (
        <>
            <Snackbar {...props} onClose={() => setSnackbarOpen(false)} open={snackbarOpen} />
            <Button label="open snackbar" onClick={() => setSnackbarOpen(true)} size="medium" title="Snackbar" />
        </>
    );
}

export const SnackbarExample: ComponentExample<SnackbarProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props }) => <SnackbarDemo {...props} />,
    sections: [],
    variants: {},
};
