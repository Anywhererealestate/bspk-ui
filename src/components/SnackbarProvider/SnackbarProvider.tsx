import { useState, ReactNode } from 'react';

import { SnackbarContext, SnackbarData, SnackbarInput } from './snackbarContext';
import { Portal } from '-/components/Portal';
import { Snackbar } from '-/components/Snackbar';
import './snackbar-provider.scss';

export type SnackbarProviderProps = {
    /** Content to be rendered inside the provider */
    children: ReactNode;
    /**
     * Default time in milliseconds after which the snackbar will auto dismiss. Sending a snackbar with a specific
     * timeout or null will override this value
     */
    timeout?: number | null;
    /** Maximum number of snackbars to show at once */
    countLimit?: number;
};

/**
 * Snackbar context provider. Snackbars are intended to provide feedback about an action without interrupting the
 * customer experience.
 *
 * @example
 *     import { SnackbarProvider } from '@bspk/ui/SnackbarProvider';
 *
 *     // In your application root
 *     function Example() {
 *         return (
 *             <SnackbarProvider timeout={5000} countLimit={1}>
 *                 <App />
 *             </SnackbarProvider>
 *         );
 *     }
 *
 *     // In a descendent component
 *     import { useSnackbarContext } from '@bspk/ui/hooks/useSnackbarContext';
 *
 *     function ExampleComponent() {
 *         // The useSnackbarContext provides access to the sendSnackbar function
 *         const { sendSnackbar } = useSnackbarContext();
 *
 *         return (
 *             <button
 *                 onClick={() =>
 *                     sendSnackbar({
 *                         text: 'Example snackbar',
 *                         button: { text: 'Dismiss', onClick: 'close' },
 *                         timeout: 3000,
 *                     })
 *                 }
 *             >
 *                 Show snackbar
 *             </button>
 *         );
 *     }
 *
 *     // You can also programatically dismiss a Snackbar by calling clearSnackbar with the Snackbar's id returned from sendSnackbar.
 *     import { useSnackbarContext } from '@bspk/ui/hooks/useSnackbarContext';
 *     import { useState } from 'react';
 *
 *     function ExampleClearComponent() {
 *         const [snackbarId, setSnackbarId] = useState<string | null>(null);
 *
 *         const { sendSnackbar, clearSnackbar } = useSnackbarContext();
 *
 *         const sendAndStoreId = () => {
 *             const id = sendSnackbar({
 *                 text: 'Without a button or timeout can only be closed programatically',
 *             });
 *         };
 *
 *         const clear = () => {
 *             if (snackbarId) {
 *                 clearSnackbar(snackbarId);
 *                 setSnackbarId(null);
 *             }
 *         };
 *
 *         return snackbarId ? (
 *             <button onClick={clear}>Clear snackbar</button>
 *         ) : (
 *             <button onClick={sendAndStoreId}>Send snackbar</button>
 *         );
 *     }
 *
 * @name SnackbarProvider
 * @phase Dev
 */
export function SnackbarProvider({ children, timeout, countLimit }: SnackbarProviderProps) {
    const [snackbars, setSnackbars] = useState<SnackbarData[]>([]);

    const baseTimeout = timeout ?? 0;

    const sendSnackbar = (data: SnackbarInput): string => {
        const id = window.crypto.randomUUID();

        setSnackbars((prevState) => prevState.concat([{ id, ...data }]));

        if (data.timeout !== null && (data.timeout ?? baseTimeout)) {
            setTimeout(() => clearSnackbar(id), data.timeout ?? baseTimeout);
        }

        return id;
    };

    const clearSnackbar = (key: string) => {
        setSnackbars((prevState) => prevState.filter((snackbarData) => snackbarData.id !== key));
    };

    const clearAll = () => {
        setSnackbars([]);
    };

    const visibleSnackbars = countLimit ? snackbars.slice(0, countLimit) : snackbars;

    return (
        <SnackbarContext.Provider
            value={{
                snackbars,
                sendSnackbar,
                clearSnackbar,
                clearAll,
            }}
        >
            <Portal>
                <div data-bspk="snackbar-provider">
                    {visibleSnackbars.map(({ button, text, id }) => (
                        <Snackbar button={button} key={id} onClose={() => clearSnackbar(id)} text={text} />
                    ))}
                </div>
            </Portal>

            {children}
        </SnackbarContext.Provider>
    );
}
