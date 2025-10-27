import { SvgAdd } from '@bspk/icons/Add';
import { SvgRemove } from '@bspk/icons/Remove';
import { useLongPress } from '-/hooks/useLongPress';

export type IncrementButtonProps = {
    disabled: boolean;
    increment: -1 | 1;
    onIncrement: (increment: -1 | 1) => void;
    inputId: string;
};

export function IncrementButton({ increment, disabled, onIncrement, inputId }: IncrementButtonProps) {
    const add = increment === 1;

    const { setTriggerElement, ...handlers } = useLongPress(() => onIncrement(increment), disabled);

    return (
        <button
            {...handlers}
            aria-controls={inputId}
            aria-hidden="true"
            data-increment={increment}
            disabled={disabled}
            ref={setTriggerElement}
            tabIndex={-1}
            type="button"
        >
            {add ? <SvgAdd /> : <SvgRemove />}
        </button>
    );
}
