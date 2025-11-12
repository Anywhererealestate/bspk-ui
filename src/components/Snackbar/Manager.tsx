import { IconName } from '@bspk/icons';
import { SvgIcon } from '@bspk/icons/SvgIcon';
import { useState } from 'react';
import { SnackbarProps, Snackbar } from './Snackbar';
import { BspkIcon } from '-/types/common';
import { createCustomEvent } from '-/utils/createCustomEvent';

const CLEAR_EVENT = 'bspk-snackbar-clear' as const;

// make onClose optional
export type SendSnackbarProps = Omit<SnackbarProps, 'icon' | 'innerRef' | 'onClose'> & {
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

const SnackbarEvent = createCustomEvent<SendSnackbarProps | string | typeof CLEAR_EVENT>('bspk-snackbar-event');

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
    const { useEventListener } = SnackbarEvent;

    useEventListener((detail) => {
        if (detail === CLEAR_EVENT || !detail) return setSnackbarProps(undefined);

        setSnackbarProps(typeof detail === 'string' ? { text: detail, timeout: defaultTimeout } : detail);
    });

    return snackbarProps ? (
        <Snackbar
            {...snackbarProps}
            icon={snackbarProps.icon ? <SvgIcon name={snackbarProps.icon as IconName} /> : undefined}
            onClose={() => {
                setSnackbarProps(undefined);
                snackbarProps?.onClose?.();
            }}
            open={true}
        />
    ) : null;
}

export const sendSnackbar = (props: SendSnackbarProps | string) => SnackbarEvent.send(props);

export const clearSnackbar = () => SnackbarEvent.send(CLEAR_EVENT);
