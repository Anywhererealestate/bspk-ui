import React, { useState } from 'react';
import { SnackbarProvider, SnackbarProviderProps } from './SnackbarProvider';
import { Button } from '-/components/Button';
// import { useSnackbarContext } from '-/hooks/useSnackbarContext';
import { ComponentExample } from '-/utils/demo';

function SnackbarDemo(props: SnackbarProviderProps) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    return (
        <>
            <SnackbarProvider
                {...props}
                closeButton={props.closeButton}
                closeButtonLabel={props.closeButtonLabel}
                onClose={() => setSnackbarOpen(false)}
                open={snackbarOpen}
                text={props.text}
                timeout={props.timeout}
            />
            <Button label="open snackbar" onClick={() => setSnackbarOpen(true)} size="medium" title="Snackbar" />
        </>
    );
}

export const SnackbarProviderExample: ComponentExample<SnackbarProviderProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props }) => <SnackbarDemo {...props} />,
    sections: [],
    variants: {},
};
