import { IconName } from '@bspk/icons';
import { SvgIcon } from '@bspk/icons/SvgIcon';
import { useState } from 'react';
import { SnackbarProps, Snackbar } from './Snackbar';
import { BspkIcon } from '-/types/common';
import { createCustomEvent } from '-/utils/createCustomEvent';

const CUSTOM_EVENT_NAME = 'bspk-snackbar-event';

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

const SnackBarEvent = createCustomEvent<SendSnackbarProps | 'clear'>(CUSTOM_EVENT_NAME);

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
    const { useEventListener } = SnackBarEvent;

    useEventListener((detail) => {
        setSnackbarProps(
            // handle 'clear' event and invalid details OR set
            typeof detail === 'string' ? undefined : { ...detail, timeout: detail.timeout || defaultTimeout },
        );
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

export const sendSnackBar = (props: SendSnackbarProps) => SnackBarEvent.send(props);

export const clearSnackBar = () => SnackBarEvent.send('clear');
