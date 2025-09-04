import { useContext } from 'react';
import { SnackbarContext } from '-/components/Snackbar/snackbarContext';

export const useSnackbarContext = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbarContext must be used within a SnackbarProvider');
    }
    return context;
};
