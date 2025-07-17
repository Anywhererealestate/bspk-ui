import { useCallback, useRef } from 'react';
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

    const initialContent = () => {
        if (kind === 'meridiem') return defaultValue?.toString() || 'AM';
        if (!defaultValue) return NUMBER_PLACEHOLDER;
        const boundedValue = bound({
            num: defaultValue,
            rollover: true,
            ...(kind === 'hours' ? HOUR_BOUNDS : MINUTE_BOUNDS),
        });
        return boundedValue.toString().padStart(2, '0');
    };

    const handleBlur = () => {
        // remove window selection
        window.getSelection()?.removeAllRanges();

        if (kind === 'meridiem') {
            return;
        } else if (kind === 'hours' || kind === 'minutes') {
            // const options = type === 'hours' ? VALID_HOURS : VALID_MINUTES;
            // const existingValue = ref.current?.textContent?.replace(/-/g, '').replace(/^0/g, '') || '';
            // log('existingValue', { existingValue, inputValue });
            // let matchedSingleOption = options.find((o) => o === existingValue + inputValue);
            // if (!matchedSingleOption) {
            //     const matchedOptions = options.filter((o) => o.includes(inputValue));
            //     matchedSingleOption = matchedOptions.length === 1 ? matchedOptions[0] : undefined;
            // }
            // if (matchedSingleOption) {
            //     setContent(matchedSingleOption);
            //
            //     nextElement?.focus();
            //     selectAllText(nextElement);
            //     return;
            // }
        }
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

            if (currentValue === '01' && nextNumber < 3) {
                nextNumber = Number(`${currentValue}${nextNumber}`);
            }

            nextNumber = bound({
                num: nextNumber,
                rollover: true,
                ...(kind === 'minutes' ? MINUTE_BOUNDS : HOUR_BOUNDS),
            });

            onChange(nextNumber as T);
            if (ref.current) ref.current.textContent = nextNumber.toString().padStart(2, '0');

            if (nextNumber > 2) {
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
                element.textContent = initialContent();
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

function bound({
    num,
    max,
    min,
    rollover = false,
}: {
    num: number | string | undefined;
    max: number;
    min: number;
    rollover: boolean;
}): number {
    const parsedNum = typeof num === 'number' ? num : parseInt(num as string, 10);
    if (isNaN(parsedNum)) return min;
    if (parsedNum > max) return rollover ? min : max;
    if (parsedNum < min) return rollover ? max : min;
    return parsedNum;
}
