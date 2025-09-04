import { useState, ReactNode } from 'react';

import { SnackbarContext, SnackbarData, SnackbarInput } from './snackbarContext';
import { SnackbarContainer } from '-/components/Snackbar/SnackbarContainer';

export type SnackbarProviderProps = {
    children: ReactNode;
    timeout?: number | null;
};

/**
 * SnackbarProvider is a React context provider that manages the snackbar state.
 *
 * @name SnackbarProvider
 */
function SnackbarProvider({ children, timeout }: SnackbarProviderProps) {
    const [snackbars, setSnackbars] = useState<SnackbarData[]>([]);

    const baseTimeout = timeout ?? 0;

    const sendSnackbar = (data: SnackbarInput) => {
        const id = window.crypto.randomUUID();

        setSnackbars((prevState) => prevState.concat([{ id, ...data }]));

        if (data.timeout !== null && (data.timeout ?? baseTimeout)) {
            setTimeout(() => clearSnackbar(id), data.timeout ?? baseTimeout);
        }
    };

    const clearSnackbar = (key: string) => {
        setSnackbars((prevState) => prevState.filter((snackbarData) => snackbarData.id !== key));
    };

    const clearAll = () => {
        setSnackbars([]);
    };

    return (
        <SnackbarContext.Provider
            data-bspk-utility="snackbar-provider"
            value={{
                snackbars,
                sendSnackbar,
                clearSnackbar,
                clearAll,
            }}
        >
            <SnackbarContainer clearSnackbar={clearSnackbar} snackbars={snackbars} />
            {children}
        </SnackbarContext.Provider>
    );
}

SnackbarProvider.bspkName = 'SnackbarProvider';

export { SnackbarProvider };
