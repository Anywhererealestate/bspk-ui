/* eslint-disable no-console */
import { useContext } from 'react';
import { SnackbarContext } from '-/utils/snackbarContext';

export const useSnackbarContext = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        console.error('useSnackbarContext must be used within a SnackbarProvider!');
    }
    return (
        context ?? {
            snackbars: [],
            sendSnackbar: () => console.error('sendSnackbar must be used within a SnackbarProvider!'),
            clearSnackbar: () => console.error('clearSnackbar must be used within a SnackbarProvider!'),
            clearAll: () => console.error('clearAll must be used within a SnackbarProvider!'),
        }
    );
};
