import { createContext } from 'react';

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

export type SnackbarInput = Omit<SnackbarData, 'id'>;

export type SnackbarContextProps = {
    snackbars: SnackbarData[];
    sendSnackbar: (data: Omit<SnackbarData, 'id'>) => void;
    clearSnackbar: (id: SnackbarData['id']) => void;
    clearAll: () => void;
};

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);
