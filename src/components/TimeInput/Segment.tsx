import { useCallback, useEffect, useRef } from 'react';
import { bound } from '-/utils/bound';
import { handleKeyDown } from '-/utils/handleKeyDown';

export const MINUTE_BOUNDS = { min: 0, max: 59 } as const;
export const HOUR_BOUNDS = { min: 1, max: 12 } as const;

export const NUMBER_PLACEHOLDER = '--' as const;

export type TimeInputType = 'hours' | 'meridiem' | 'minutes';

type TimeInputSegmentProps<T extends number | string> = {
    ariaLabel?: string;
    disabled?: boolean;
    name: string;
    readOnly?: boolean;
    defaultValue?: T;
    type: TimeInputType;
    onChange: (value: T | null) => void;
};

export function TimeInputSegment<T extends number | string>({
    ariaLabel,
    disabled,
    name,
    readOnly,
    defaultValue,
    type: kind,
    onChange,
}: TimeInputSegmentProps<T>) {
    const ref = useRef<HTMLSpanElement | null>(null);

    const selectAll = (element: HTMLElement | null = ref.current) => {
        if (!element) return;
        setTimeout(() => {
            window.getSelection()?.selectAllChildren(element);
        }, 10);
    };

    const log = useCallback(
        (arg: object) => {
            // eslint-disable-next-line no-console
            console.log({ type: kind, ...arg });
        },
        [kind],
    );

    const valueToContent = useCallback(
        (value: number | string | undefined) => {
            if (kind === 'meridiem') return value?.toString() || 'AM';
            if (typeof value === 'undefined') return NUMBER_PLACEHOLDER;
            const boundedValue = bound({
                num: value,
                rollover: true,
                ...(kind === 'hours' ? HOUR_BOUNDS : MINUTE_BOUNDS),
            });
            return boundedValue.toString().padStart(2, '0');
        },
        [kind],
    );

    useEffect(() => {
        if (ref.current) ref.current.textContent = valueToContent(defaultValue);
    }, [defaultValue, valueToContent]);

    const handleBlur = () => {
        window.getSelection()?.removeAllRanges();
    };

    const handleIncrement = useCallback(
        (increment: number) => {
            const currentValue = ref.current?.textContent;

            if (kind === 'meridiem') {
                const nextMeridiem = currentValue === 'AM' ? 'PM' : 'AM';
                onChange(nextMeridiem as T);
                return;
            }
            const nextValue = bound({
                num: Number(currentValue) + increment,
                rollover: true,
                ...(kind === 'minutes' ? MINUTE_BOUNDS : HOUR_BOUNDS),
            });
            onChange(nextValue as T);
            if (ref.current) ref.current.textContent = nextValue.toString().padStart(2, '0');
        },
        [kind, onChange],
    );

    const nextSibling = () => getNextSibling(ref.current, '[data-input]');

    const previousSibling = () => getPreviousSibling(ref.current, '[data-input]');

    const handleInputKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            // Prevent default behavior for all keys - we handle them manually
            if (
                handleKeyDown({
                    ArrowRight: () => {
                        nextSibling()?.focus();
                        event.preventDefault();
                    },
                    ArrowLeft: () => {
                        previousSibling()?.focus();
                        event.preventDefault();
                    },
                    ArrowUp: () => {
                        handleIncrement(1);
                        event.preventDefault();
                    },
                    ArrowDown: () => {
                        handleIncrement(-1);
                        event.preventDefault();
                    },
                    Enter: () => ref.current?.blur(),
                    Escape: () => ref.current?.blur(),
                    Backspace: () => onChange(null),
                    Tab: () => {
                        // do nothing
                    },
                })(event)
            )
                return;

            event.preventDefault();

            // if hours only allow digits and if digit is found only once in VALID_HOURS then set the value and move to next element
            if (kind === 'meridiem') {
                const inputValue = event.key.toUpperCase();

                if (inputValue === 'A' || inputValue === 'P') {
                    onChange(`${inputValue}M` as T);
                    nextSibling()?.focus();
                    selectAll();
                    return;
                }

                return;
            }

            // only handle digits from here
            if (!/^\d$/.test(event.key)) return;

            let nextNumber = Number(event.key);
            const currentValue = ref.current?.textContent;

            log({ currentValue, nextNumber });

            const addToExisting =
                (kind === 'hours' && currentValue === '01' && nextNumber < 3) ||
                (kind === 'minutes' && Number(currentValue) < 6);

            if (addToExisting) nextNumber = Number(`${currentValue}${nextNumber}`);

            nextNumber = bound({
                num: nextNumber,
                rollover: true,
                ...(kind === 'minutes' ? MINUTE_BOUNDS : HOUR_BOUNDS),
            });

            onChange(nextNumber as T);
            if (ref.current) ref.current.textContent = nextNumber.toString().padStart(2, '0');

            const moveToNext = (kind === 'hours' && nextNumber > 2) || (kind === 'minutes' && nextNumber > 5);

            if (moveToNext) {
                nextSibling()?.focus();
                selectAll(nextSibling());
            } else {
                selectAll();
            }

            return;
        },
        [log, kind, handleIncrement, onChange],
    );

    return (
        <span
            aria-disabled={disabled}
            aria-label={`${ariaLabel} ${name.charAt(0).toUpperCase() + name.slice(1)}`}
            aria-readonly={readOnly}
            contentEditable={!readOnly && !disabled}
            data-input=""
            data-type={kind}
            data-value={defaultValue || undefined}
            id={`${name}`}
            onBlur={handleBlur}
            onClick={() => {
                if (disabled || readOnly) return;
                selectAll();
            }}
            onFocus={() => {
                if (disabled || readOnly) return;
                selectAll();
            }}
            onKeyDown={handleInputKeyDown}
            ref={(element) => {
                if (!element) return;
                ref.current = element;
                element.textContent = valueToContent(defaultValue);
            }}
            role="spinbutton"
            tabIndex={0}
        />
    );
}

function getNextSibling(elem: HTMLElement | null, selector: string): HTMLElement | null {
    // Get the next sibling element
    let sibling = elem?.nextElementSibling;
    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
        if (sibling.matches(selector)) return sibling as HTMLElement | null;
        sibling = sibling.nextElementSibling;
    }
    return null;
}

function getPreviousSibling(elem: HTMLElement | null, selector: string): HTMLElement | null {
    // Get the previous sibling element
    let sibling = elem?.previousElementSibling;
    // If the sibling matches our selector, use it
    // If not, jump to the previous sibling and continue the loop
    while (sibling) {
        if (sibling.matches(selector)) return sibling as HTMLElement | null;
        sibling = sibling.previousElementSibling;
    }
    return null;
}
