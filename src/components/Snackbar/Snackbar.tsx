import './snackbar.scss';
import { Button } from '-/components/Button';
import { Txt } from '-/components/Txt';
import { SnackbarData } from '-/utils/snackbarContext';

export type SnackbarProps = {
    /** Text to be shown in the snackbar */
    text: string;
    /** Optional action button */
    button?: SnackbarData['button'];
    /** Callback when the snackbar is dismissed */
    onClose: () => void;
};

/**
 * Snackbars are intended to provide feedback about an action without interrupting the customer experience. NOTE: While
 * they can be imported and used directly, they are intended to be used via the SnackbarProvider and the
 * useSnackbarContext hook.
 *
 * @example
 *     import { Snackbar } from '@bspk/ui/Snackbar';
 *
 *     function Example() {
 *         return <Snackbar text="Something happened!" />;
 *     }
 *
 * @name Snackbar
 * @phase Utility
 */
export function Snackbar({ text, button, onClose }: SnackbarProps) {
    return (
        <span data-bspk="snackbar" role="alert">
            <Txt variant="body-small">{text}</Txt>

            {button && (
                <Button
                    label={button.label}
                    onClick={button.onClick === 'close' ? onClose : button.onClick}
                    variant="tertiary"
                >
                    {button.label}
                </Button>
            )}
        </span>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
