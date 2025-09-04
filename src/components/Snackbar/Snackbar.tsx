import { SnackbarData } from './snackbarContext';
import { Txt } from '-/components/Txt';
import './snackbar.scss';

export type SnackbarProps = {
    data: SnackbarData;
    onClose: () => void;
};

/**
 * Component description.
 *
 * @example
 *     import { Snackbar } from '@bspk/ui/Snackbar';
 *
 *     function Example() {
 *         return <Snackbar>Example Snackbar</Snackbar>;
 *     }
 *
 * @name Snackbar
 * @phase Dev
 */
function Snackbar({ data, onClose }: SnackbarProps) {
    const { button, text, variant } = data;

    return (
        <span data-bspk="snackbar" data-variant={variant || 'default'}>
            <Txt variant="body-small">{text}</Txt>

            {button && (
                <button
                    aria-label={button.text}
                    data-bspk="snackbar-button"
                    onClick={button.onClick === 'close' ? onClose : button.onClick}
                    type="button"
                >
                    {button.text}
                </button>
            )}
        </span>
    );
}

Snackbar.bspkName = 'Snackbar';

export { Snackbar };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
