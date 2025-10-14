import './snackbar-provider.scss';
import { useState, ReactNode, useRef, useEffect } from 'react';
import { Button } from '-/components/Button';
import { Portal } from '-/components/Portal';
import './snackbar.scss';
import { Txt } from '-/components/Txt';
import { randomString } from '-/utils/random';
import { SnackbarContext, SnackbarData, SnackbarInput } from '-/utils/snackbarContext';

export type SnackbarProviderProps = {
    /** Text to be shown in the snackbar */
    text: string;
    /**
     * Optional action button
     *
     * @default true
     */

    closeButton?: boolean;
    /**
     * Label for the close button
     *
     * @default Dismiss
     */
    closeButtonLabel?: string;
    /** Callback when the snackbar is dismissed */
    onClose: () => void;
    /** Content to be rendered inside the provider */
    children: ReactNode;
    /**
     * Time in milliseconds after which the snackbar will auto dismiss.
     *
     * If you want to disable the timeout for a specific snackbar, set its timeout to zero and set the closeButton prop
     * to true.
     */
    timeout?: number;
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
export function SnackbarProvider({
    text,
    children,
    timeout,
    closeButton = true,
    closeButtonLabel = 'Dismiss',
    onClose,
    countLimit = 10,
}: SnackbarProviderProps) {
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
                        {visibleSnackbars.map(({ id }) => (
                            <span data-bspk="snackbar" key={id} role="alert">
                                <Txt variant="body-small">{text}</Txt>

                                {closeButton && (
                                    <Button
                                        label={closeButtonLabel}
                                        onClick={!onClose ? onClose : () => clearSnackbar(id)}
                                        variant="tertiary"
                                    />
                                )}
                            </span>
                        ))}
                    </div>
                </Portal>
            )}

            {children}
        </SnackbarContext.Provider>
    );
}
