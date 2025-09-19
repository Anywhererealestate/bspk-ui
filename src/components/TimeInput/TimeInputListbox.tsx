import { useCallback } from 'react';
import { TimeInputType } from './Segment';
import { useId } from '-/hooks/useId';
import { useKeyNavigation } from '-/hooks/useKeyNavigation';

type TimeInputListboxProps<T extends string> = {
    options: T[];
    selectedValue?: T;
    type: TimeInputType;
    onSelect?: (value: T) => void;
    onTab?: (e: React.KeyboardEvent) => void;
};

export function TimeInputListbox<T extends string>({
    options: optionsProp,
    selectedValue,
    type: kind,
    onSelect,
    onTab,
}: TimeInputListboxProps<T>) {
    const id = useId();

    const optionId = useCallback((value: T) => `${id}-${kind}-${value}`, [id, kind]);

    const options = optionsProp.map((o) => ({
        id: optionId(o),
        value: o,
        label: o.toString().padStart(2, '0'),
    }));

    const { handleKeyDown, activeElementId } = useKeyNavigation({
        ids: options.map((o) => o.id),
        overrides: {
            Tab: onTab,
        },
        defaultActiveElementId: selectedValue ? optionId(selectedValue) : options[0]?.id,
    });

    return (
        <div
            aria-label={`Select ${kind}`}
            data-scroll-column={kind}
            onClick={(event) => {
                const target = event.target as HTMLSpanElement;
                if (target.dataset.value) onSelect?.(target.dataset.value as T);
            }}
            onKeyDown={handleKeyDown}
            role="listbox"
            tabIndex={0}
        >
            {options.map((option, index) => (
                <span
                    aria-label={option.label}
                    aria-selected={option.value === selectedValue || undefined}
                    data-active={activeElementId === option.id || undefined}
                    data-index={index}
                    data-value={option.value}
                    id={option.id}
                    key={option.id}
                    role="option"
                >
                    {`${option.label}`.padStart(2, '0')}
                </span>
            ))}
        </div>
    );
}
