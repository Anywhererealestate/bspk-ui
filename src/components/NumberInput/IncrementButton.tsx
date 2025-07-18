import { SvgAdd } from '@bspk/icons/Add';
import { SvgRemove } from '@bspk/icons/Remove';
import { useLongPress } from '-/hooks/useLongPress';

export type IncrementButtonProps = {
    disabled: boolean;
    increment: -1 | 1;
    onIncrement: (increment: -1 | 1) => void;
};

function IncrementButton({ increment, disabled, onIncrement }: IncrementButtonProps) {
    const add = increment === 1;

    const { setTriggerElement, ...handlers } = useLongPress(() => onIncrement(increment), disabled);

    return (
        <button
            aria-label={`${add ? 'Increase' : 'Decrease'} value`}
            data-increment={increment}
            disabled={disabled}
            ref={setTriggerElement}
            type="button"
            {...handlers}
        >
            {add ? <SvgAdd /> : <SvgRemove />}
        </button>
    );
}
export { IncrementButton };
