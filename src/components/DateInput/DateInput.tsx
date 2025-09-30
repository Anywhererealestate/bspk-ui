import './date-input.scss';
import { SvgEvent } from '@bspk/icons/Event';
import { format, isValid, parse } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { Button } from '-/components/Button';
import { CalendarPicker } from '-/components/CalendarPicker';
import { Portal } from '-/components/Portal';
import { TextInput, TextInputProps } from '-/components/TextInput';
import { useFloating } from '-/hooks/useFloating';
import { useOutsideClick } from '-/hooks/useOutsideClick';

const parsableDate = (dateString: string) => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString);

export type DateInputProps = Pick<
    TextInputProps,
    'aria-errormessage' | 'aria-label' | 'disabled' | 'id' | 'invalid' | 'name' | 'readOnly' | 'required' | 'size'
> & {
    /** The value of the calendar input */
    value: Date | undefined;
    /** Fires when the date changes with the new date */
    onChange: (newDate: Date | undefined) => void;
    /**
     * If the calendar should close when a date is selected.
     *
     * @default true
     */
    closeCalendarOnChange?: boolean;
    /**
     * The placeholder text for the date input field.
     *
     * @default mm/dd/yyyy
     */
    placeholder?: string;
};

/**
 * An input that allows a customer to manually type in a specific date or triggers a date picker combobox to select a
 * date.
 *
 * @example
 *     import { DateInput } from '@bspk/ui/DateInput';
 *     import { useState } from 'react';
 *
 *     function Example() {
 *         const [date, setDate] = useState<Date | undefined>(new Date());
 *
 *         return <DateInput name="calendar input" aria-label="calendar input" value={date} onChange={setDate} />;
 *     }
 *
 * @name DateInput
 * @phase Utility
 */
export function DateInput({
    value,
    onChange,
    disabled,
    readOnly,
    closeCalendarOnChange = true,
    'aria-label': ariaLabel,
    name,
    placeholder,
    invalid,
    required,
    size,
    'aria-errormessage': ariaErrorMessage,
    id,
}: DateInputProps) {
    const [textValue, setTextValue] = useState(value ? format(value, 'MM/dd/yyyy') : '');
    const [calendarVisible, setCalendarVisible] = useState(false);
    const containerRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const formattedValue = value ? format(value, 'MM/dd/yyyy') : '';
        setTextValue(formattedValue);
    }, [value]);

    const { elements, floatingStyles } = useFloating({
        placement: 'bottom',
        strategy: 'absolute',
        offsetOptions: 4,
        refWidth: true,
    });

    useOutsideClick({
        elements: [elements.floating, containerRef.current],
        callback: () => setCalendarVisible(false),
    });

    const isValidDate = (next: string) => {
        const parsedDate = parse(next, 'MM/dd/yyyy', new Date());
        return isValid(parsedDate) ? parsedDate : undefined;
    };

    const validate = () => {
        let nextDate: Date | undefined;
        let nextTextValue = '';

        if (parsableDate(textValue)) {
            nextDate = isValidDate(textValue);
            if (nextDate) nextTextValue = format(nextDate, 'MM/dd/yyyy');
        }

        setTextValue(nextTextValue);
        onChange(nextDate);
    };

    const handleTextChange = (nextValue: string) => {
        // Add slashes as the user types
        if (/^\d{2}$/.test(nextValue) || /^\d{1,2}\/\d{2}$/.test(nextValue)) nextValue = `${nextValue}/`;

        // Remove extra slashes
        if (nextValue.endsWith('//')) nextValue = nextValue.slice(0, -1);

        setTextValue(nextValue);

        if (parsableDate(nextValue)) {
            const next = isValidDate(nextValue);
            if (next) onChange(next);
        }
    };

    return (
        <span data-bspk="date-input" ref={containerRef}>
            <div
                ref={(node) => {
                    elements.setReference(node);
                }}
            >
                <TextInput
                    aria-errormessage={ariaErrorMessage || undefined}
                    aria-label={ariaLabel}
                    disabled={disabled}
                    id={id}
                    invalid={invalid || undefined}
                    name={name}
                    onBlur={() => validate()}
                    onChange={handleTextChange}
                    onKeyDown={(event) => {
                        // allow select all and other keyboard shortcuts
                        if (event.ctrlKey || event.metaKey) {
                            return;
                        }

                        // handle backspace and delete to remove the slash and the number before it
                        if (event.key === 'Backspace' || (event.key === 'Delete' && textValue.endsWith('/'))) {
                            event.preventDefault();
                            setTextValue((prev) => prev.slice(0, -2));
                        }

                        // if a single key and not a number or forward slash ignore
                        if (event.key.length === 1 && !/[0-9/]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                    placeholder={placeholder || 'mm/dd/yyyy'}
                    readOnly={readOnly}
                    required={required}
                    showClearButton={false}
                    size={size}
                    trailing={
                        !disabled &&
                        !readOnly && (
                            <Button
                                icon={<SvgEvent />}
                                iconOnly
                                label="Toggle calendar"
                                onClick={() => setCalendarVisible((prev) => !prev)}
                                variant="tertiary"
                            />
                        )
                    }
                    value={textValue}
                />
            </div>
            {calendarVisible && (
                <Portal>
                    <div
                        data-placement="bottom"
                        ref={(node) => {
                            elements.setFloating(node);
                        }}
                        style={{ ...floatingStyles, zIndex: 'var( --z-index-dropdown)' }}
                    >
                        <CalendarPicker
                            onChange={(next) => {
                                if (closeCalendarOnChange) setCalendarVisible(false);
                                onChange(next);
                            }}
                            value={value}
                            variant="elevated"
                        />
                    </div>
                </Portal>
            )}
        </span>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
