import { SvgAdd } from '@bspk/icons/Add';
import { SvgRemove } from '@bspk/icons/Remove';
import { useLongPress } from '-/hooks/useLongPress';

export type IncrementButtonProps = {
    /** Whether the button is disabled. */
    disabled: boolean;
    /** The kind of increment button, either 'add' or 'remove'. */
    kind: 'add' | 'remove';
    /** The ID of the associated input element. */
    inputId: string;
    /** Function to trigger the increment action. */
    triggerIncrement: (kind: 'add' | 'remove') => boolean;
};

/**
 * A button component for incrementing or decrementing the InputNumber.
 *
 * @name IncrementButton
 * @parent InputNumber
 */
export function IncrementButton({ inputId, kind, disabled, triggerIncrement }: IncrementButtonProps) {
    const { ...pressHandlers } = useLongPress({
        callback: () => triggerIncrement(kind),
    });

    return (
        <button
            {...pressHandlers}
            aria-controls={inputId}
            aria-label={kind === 'add' ? 'Increase value' : 'Decrease value'}
            data-bspk="input-number--increment-button"
            data-kind={kind}
            disabled={disabled}
            tabIndex={-1}
            type="button"
        >
            {kind === 'add' ? <SvgAdd aria-hidden /> : <SvgRemove aria-hidden />}
        </button>
    );
}
