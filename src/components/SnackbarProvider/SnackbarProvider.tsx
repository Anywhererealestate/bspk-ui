import './snackbar-provider.scss';
import { useState, ReactNode, useRef, useEffect } from 'react';
import { Portal } from '-/components/Portal';
import { Snackbar } from '-/components/Snackbar';
import { randomString } from '-/utils/random';
import { SnackbarContext, SnackbarData, SnackbarInput } from '-/utils/snackbarContext';

export type SnackbarProviderProps = {
    /** Content to be rendered inside the provider */
    children: ReactNode;
    /**
     * Default time in milliseconds after which the snackbar will auto dismiss. If a Snackbar is sent with a timeout
     * property that value will be used instead. If you want to disable the timeout for a specific snackbar, set its
     * timeout to null.
     */
    timeout?: number | null;
    /**
     * Maximum number of snackbars to show at once
     *
     * @default 10
     */
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
 *     // You can also programatically dismiss a Snackbar by calling clearSnackbar with the Snackbar's id.
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
 *                 text: 'Without a button or timeout I can only be closed programatically',
 *             });
 *             setSnackbarId(id);
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
 * @phase UXReview
 */
export function SnackbarProvider({ children, timeout, countLimit = 10 }: SnackbarProviderProps) {
    const [snackbars, setSnackbars] = useState<SnackbarData[]>([]);
    const timeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

    const baseTimeout = timeout ?? 0;

    const sendSnackbar = (data: SnackbarInput): string => {
        const id = randomString(8);

        setSnackbars((prevState) => prevState.concat([{ id, ...data }]));

        const nextTimeout = data.timeout ?? baseTimeout;
        if (data.timeout !== null && nextTimeout) {
            timeouts.current.set(
                id,
                setTimeout(() => {
                    clearSnackbar(id);
                    timeouts.current.delete(id);
                }, data.timeout ?? baseTimeout),
            );
        }

        return id;
    };

    const clearSnackbar = (id: string) => {
        setSnackbars((prevState) => prevState.filter((snackbarData) => snackbarData.id !== id));
    };

    const clearAll = () => {
        setSnackbars([]);
    };

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want to run this on dismount
            timeouts.current.forEach((timeoutToClear) => clearTimeout(timeoutToClear));
        };
    }, []);

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
            {visibleSnackbars.length > 0 && (
                <Portal>
                    <div aria-live="off" data-bspk="snackbar-provider">
                        {visibleSnackbars.map(({ button, text, id }) => (
                            <Snackbar button={button} key={id} onClose={() => clearSnackbar(id)} text={text} />
                        ))}
                    </div>
                </Portal>
            )}

            {children}
        </SnackbarContext.Provider>
    );
}
