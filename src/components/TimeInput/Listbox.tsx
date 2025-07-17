import { TimeInputType } from './Segment';
import { handleKeyDown } from '-/utils/handleKeyDown';

type TimeInputListboxProps<T> = {
    options: T[];
    selectedValue?: T;
    type: TimeInputType;
    onSelect?: (value: T) => void;
};

export function TimeInputListbox<T>({ options, selectedValue, type: kind, onSelect }: TimeInputListboxProps<T>) {
    return (
        <div
            aria-label={`Select ${kind}`}
            data-scroll-column={kind}
            onClick={(event) => {
                const target = event.target as HTMLSpanElement;
                if (target.dataset.value) onSelect?.(target.dataset.value as T);
            }}
            onKeyDown={(e) => {
                const element = e.currentTarget as HTMLSpanElement;
                element.removeAttribute('data-active');
                handleKeyDown({
                    ArrowDown: () => {
                        const nextActive =
                            element.nextElementSibling || (element.parentElement?.firstElementChild as HTMLSpanElement);
                        nextActive.setAttribute('data-active', '');
                    },
                    ArrowUp: () => {
                        const previousActive =
                            element.previousElementSibling ||
                            (element.parentElement?.lastElementChild as HTMLSpanElement);
                        previousActive.setAttribute('data-active', '');
                    },
                });
            }}
            role="listbox"
            tabIndex={0}
        >
            {options.map((val) => (
                <span
                    aria-label={`${val} ${kind}`}
                    aria-selected={val === selectedValue || undefined}
                    data-value={val}
                    key={`${val}`}
                    role="option"
                >
                    {`${val}`.padStart(2, '0')}
                </span>
            ))}
        </div>
    );
}
