import { useRef, useState } from 'react';
import { TimeInputType } from './Segment';
import { bound } from '-/utils/bound';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { scrollElementIntoView } from '-/utils/scrollElementIntoView';

type TimeInputListboxProps<T> = {
    options: T[];
    selectedValue?: T;
    type: TimeInputType;
    onSelect?: (value: T) => void;
    onTab?: (e: React.KeyboardEvent) => void;
};

export function TimeInputListbox<T>({ options, selectedValue, type: kind, onSelect, onTab }: TimeInputListboxProps<T>) {
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const listRef = useRef<HTMLDivElement | null>(null);

    const handleArrow = (dir: 'down' | 'up') => {
        return (e: React.KeyboardEvent) => {
            e.preventDefault();
            setActiveIndex((prevIndex) => {
                const next = bound({
                    num: prevIndex + (dir === 'down' ? 1 : -1),
                    min: 0,
                    max: options.length - 1,
                    rollover: true,
                });
                scrollElementIntoView(listRef.current?.children[next] as HTMLElement, listRef.current!);
                return next;
            });
        };
    };

    return (
        <div
            aria-label={`Select ${kind}`}
            data-scroll-column={kind}
            onClick={(event) => {
                const target = event.target as HTMLSpanElement;
                if (target.dataset.value) onSelect?.(target.dataset.value as T);
            }}
            onFocus={() => {
                if (activeIndex < 0 && options.length > 0)
                    scrollElementIntoView(listRef.current?.children[activeIndex], listRef.current!);
            }}
            onKeyDown={handleKeyDown({
                ArrowDown: handleArrow('down'),
                ArrowUp: handleArrow('up'),
                ArrowLeft: (e) => {
                    e.preventDefault();
                    const previousSibling = e.currentTarget.previousElementSibling as HTMLSpanElement;
                    if (previousSibling) previousSibling.focus();
                    else (e.currentTarget.parentNode?.lastElementChild as HTMLSpanElement)?.focus();
                },
                ArrowRight: (e) => {
                    e.preventDefault();
                    const nextSibling = e.currentTarget.nextElementSibling as HTMLSpanElement;
                    if (nextSibling) nextSibling.focus();
                    else (e.currentTarget.parentNode?.firstElementChild as HTMLSpanElement)?.focus();
                },
                Enter: (e) => {
                    e.preventDefault();
                    if (activeIndex >= 0 && activeIndex < options.length) onSelect?.(options[activeIndex]);
                },
                Tab: onTab,
            })}
            onMouseMove={(event) => {
                const target = event.target as HTMLSpanElement;
                setActiveIndex(Number(target.dataset.index));
                event.currentTarget.focus();
            }}
            ref={(node) => {
                if (!node) return;
                listRef.current = node;
            }}
            role="listbox"
            tabIndex={0}
        >
            {options.map((val, index) => (
                <span
                    aria-label={`${val} ${kind}`}
                    aria-selected={`${val}` === `${selectedValue}` || undefined}
                    data-active={activeIndex === index || undefined}
                    data-index={index}
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
