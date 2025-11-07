import { useState } from 'react';
import { SnackbarProps, Snackbar } from './Snackbar';
import { useEventListener } from '-/hooks/useAddEventListener';
import { useTimeout } from '-/hooks/useTimeout';
import { BspkIcon } from '-/types/common';

const CUSTOM_EVENT_NAME = 'bspk-snackbar-event';

// make onClose optional
export type SendSnackbarProps = Omit<SnackbarProps, 'icon' | 'onClose'> & {
    onClose?: SnackbarProps['onClose'];
    icon?: BspkIcon;
};

export type SnackbarManagerProps = {
    /**
     * Default timeout for snackbars sent via the manager (in milliseconds).
     *
     * @default 5000
     */
    defaultTimeout?: number;
};

/**
 * SnackbarManager is a single use component that listens for snackbar events and displays them to the user.
 *
 * We use a custom event to communicate between components and this manager.
 *
 * We don't store the snackbar props in React.Context to avoid unnecessary re-renders of all components that consume the
 * context. :)
 *
 * @name SnackbarManager
 *
 * @phase UXReview
 */
export function SnackbarManager({ defaultTimeout = 5000 }: SnackbarManagerProps) {
    const [snackbarProps, setSnackbarProps] = useState<SendSnackbarProps | undefined>();

    const timeout = useTimeout();

    useEventListener(
        CUSTOM_EVENT_NAME,
        (event: CustomEvent) => {
            const detail = event.detail as SendSnackbarProps | string;

            // Clear any existing snackbar to ensure that screen readers read the new message
            setSnackbarProps(undefined);

            if (typeof detail === 'string') return; // 'clear' command or invalid payload
            timeout.set(
                () => setSnackbarProps({ ...detail, timeout: 'timeout' in detail ? detail.timeout : defaultTimeout }),
                10,
            );
        },
        document,
    );

    return snackbarProps ? (
        <Snackbar
            {...snackbarProps}
            onClose={() => {
                setSnackbarProps(undefined);
                snackbarProps?.onClose?.();
            }}
            open={true}
        />
    ) : null;
}

export function sendSnackBar(props: SendSnackbarProps) {
    document.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME, { detail: props }));
}

export function clearSnackBar() {
    document.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME, { detail: 'clear' }));
}
