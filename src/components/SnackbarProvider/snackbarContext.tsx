import { createContext } from 'react';

export interface SnackbarData {
    /** Automatically set unique identifier. */
    id: string;
    /** The main body text of the snackbar */
    text: string;
    /**
     * The variant of the snackbar.
     *
     * @default 'default'
     */
    variant?: 'default' | 'error' | 'success' | 'warning';
    /** Time in milliseconds after which the snackbar will auto dismiss. You can also set a default at the UIProvider */
    timeout?: number | null;
    /** Optional action button */
    button?: {
        /**
         * The button text
         *
         * @default 'dismiss'
         */
        text: string;
        /**
         * Either 'close' or a callback function that is called when the button is clicked. If 'close' is provided the
         * snackbar will close when the button is clicked.
         *
         * @default 'close'
         */
        onClick: 'close' | (() => void);
    };
}

export type SnackbarInput = Omit<SnackbarData, 'id'>;

export type SnackbarContextProps = {
    snackbars: SnackbarData[];
    sendSnackbar: (data: Omit<SnackbarData, 'id'>) => void;
    clearSnackbar: (id: SnackbarData['id']) => void;
    clearAll: () => void;
};

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);
