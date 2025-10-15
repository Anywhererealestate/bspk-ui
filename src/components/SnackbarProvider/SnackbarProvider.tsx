import './snackbar-provider.scss';
import { createContext, useEffect } from 'react';
import { Button } from '-/components/Button';
import { Portal } from '-/components/Portal';
import './snackbar.scss';
import { Txt } from '-/components/Txt';
import { useId } from '-/hooks/useId';
import { CommonProps } from '-/types/common';

export interface SnackbarData {
    /** Automatically set unique identifier. */
    id: string;
    /** The main body text of the snackbar */
    text: string;
    /** Time in milliseconds after which the snackbar will auto dismiss. You can also set a default at the UIProvider */
    timeout?: number | null;
    /**
     * Optional action button
     *
     * @default false
     */
    closeButton?: boolean;
    /**
     * Label for the close button, if enabled
     *
     * @default 'Dismiss'
     */
    closeButtonLabel?: string;
}

export type SnackbarInput = SnackbarData;

export type SnackbarContextProps = {
    snackbars: SnackbarData[];
    sendSnackbar: (data: SnackbarData) => void;
    clearSnackbar: (id: SnackbarData['id']) => void;
    clearAll: () => void;
};

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export type SnackbarProviderProps = CommonProps<'id'> & {
    /** Text to be shown in the snackbar */
    text: string;
    /**
     * Whether to show a close button on the snackbar.
     *
     * Since there is no default timeout, this is true by default. You can provide a timeout to auto-dismiss the
     * snackbar in addition to the close button.
     *
     * @default true
     */

    closeButton?: boolean;
    /**
     * Label for the close button.
     *
     * @default Dismiss
     */
    closeButtonLabel?: string;
    /** Callback when the snackbar is dismissed */
    onClose: () => void;
    /** Content to be rendered inside the snack bar provider, the snackbar trigger element. */
    // children: ReactNode;
    /**
     * Time in milliseconds after which the snackbar will auto dismiss.
     *
     * If no timeout is provided, and closeButton is set to false the snackbar will not be dismissable.
     */
    timeout?: number;
    /**
     * If the snackbar is open or not.
     *
     * @default false
     */
    open?: boolean;
};

/**
 * Snackbar context provider. Snackbars are intended to provide feedback about an action without interrupting the
 * customer experience.
 *
 * @example
 *     import { SnackbarProvider } from '@bspk/ui/SnackbarProvider';
 *     import { Button } from '@bspk/ui/Button';
 *     import { useState } from 'react';
 *
 *     function ExampleComponent(props) {
 *         const [snackbarOpen, setSnackbarOpen] = useState(false);
 *
 *         return (
 *             <>
 *                 <Button label="Show snackbar" onClick={() => setSnackbarOpen(true)} size="medium" title="Snackbar" />
 *                 <SnackbarProvider {...props} open={snackbarOpen} onClose={() => setSnackbarOpen(false)} />
 *             </>
 *         );
 *     }
 *
 * @name SnackbarProvider
 * @phase UXReview
 */
export function SnackbarProvider({
    id: propId,
    text,
    timeout,
    closeButton = true,
    closeButtonLabel = 'Dismiss',
    onClose,
    open = false,
}: SnackbarProviderProps) {
    const id = useId(propId);
    useEffect(() => {
        if (open && timeout) {
            const timer = setTimeout(() => {
                onClose?.();
            }, timeout);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [open, timeout, onClose]);

    if (!open) return null;

    return (
        <Portal>
            <div aria-live="off" data-bspk="snackbar-provider">
                <span data-bspk="snackbar" key={id} role="alert">
                    <Txt variant="body-small">{text}</Txt>
                    {closeButton && <Button label={closeButtonLabel} onClick={onClose} variant="tertiary" />}
                </span>
            </div>
        </Portal>
    );
}
