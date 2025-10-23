import './date-picker.scss';
import { SvgEvent } from '@bspk/icons/Event';
import { format, isValid, parse } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '-/components/Button';
import { Calendar } from '-/components/Calendar';
import { useFieldInit } from '-/components/Field';
import { InputElement, InputProps } from '-/components/Input';
import { Portal } from '-/components/Portal';
import { useFloating } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';

const parsableDate = (dateString: string) => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString);

export type DatePickerProps = Pick<
    InputProps,
    | 'aria-describedby'
    | 'aria-errormessage'
    | 'aria-label'
    | 'disabled'
    | 'id'
    | 'invalid'
    | 'name'
    | 'readOnly'
    | 'required'
    | 'size'
> & {
    /**
     * The value of the calendar input
     *
     * @type Date
     */
    value: Date | string | undefined;
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
 * An input that allows a customer to manually type in a specific date or triggers a the Calendar component to select a
 * date.
 *
 * For a more complete example with field usage, see the DatePickerField component.
 *
 * @example
 *     import { DatePicker } from '@bspk/ui/DatePicker';
 *     import { Field, FieldLabel } from '@bspk/ui/Field';
 *     import { useState } from 'react';
 *
 *     function ExampleStandalone() {
 *         const [date, setDate] = useState<Date | undefined>(new Date());
 *         return <DatePicker aria-label="Date" name="date2" value={date} onChange={setDate} />;
 *     }
 *
 *     function ExampleWithField() {
 *         const [date, setDate] = useState<Date | undefined>(new Date());
 *
 *         return (
 *             <Field>
 *                 <FieldLabel>Date</FieldLabel>
 *                 <DatePicker name="date1" value={date} onChange={setDate} />
 *                 <FieldDescription>The date picker allows you to select a date.</FieldDescription>
 *             </Field>
 *         );
 *     }
 *
 * @name DatePicker
 * @phase UXReview
 */
export function DatePicker({
    value: valueProp,
    onChange,
    disabled,
    readOnly,
    closeCalendarOnChange = true,
    name,
    placeholder,
    invalid: invalidProp,
    required,
    size,
    id: idProp,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedByProp,
    'aria-errormessage': ariaErrorMessageProp,
}: DatePickerProps) {
    const id = useId(idProp);
    const fieldProps = useFieldInit({ required });
    const invalid = !disabled && !readOnly && (invalidProp || !!fieldProps.ariaErrorMessage);

    const value = useMemo(() => {
        if (typeof valueProp === 'string') {
            const parsedDate = new Date(valueProp);
            return isValid(parsedDate) ? parsedDate : undefined;
        }
        return valueProp instanceof Date && isValid(valueProp) ? valueProp : undefined;
    }, [valueProp]);

    useEffect(() => {
        const formattedValue = value ? format(value, 'MM/dd/yyyy') : '';
        setTextValue(formattedValue);
    }, [value]);
    const [textValue, setTextValue] = useState(() => (value ? format(value, 'MM/dd/yyyy') : ''));

    const [calendarVisible, setCalendarVisible] = useState(false);
    const containerRef = useRef<HTMLSpanElement | null>(null);

    const { elements, floatingStyles } = useFloating({
        placement: 'bottom',
        strategy: 'absolute',
        offsetOptions: 4,
        refWidth: true,
    });

    useOutsideClick({
        elements: [elements.floating, containerRef.current],
        callback: () => setCalendarVisible(false),
        disabled: !calendarVisible,
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
        <div
            data-bspk="date-picker"
            ref={(node) => {
                containerRef.current = node;
                elements.setReference(node);
            }}
        >
            <InputElement
                aria-describedby={ariaDescribedByProp || fieldProps.ariaDescribedBy || undefined}
                aria-errormessage={ariaErrorMessageProp || fieldProps.ariaErrorMessage || undefined}
                aria-label={ariaLabel}
                disabled={disabled || undefined}
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
            {calendarVisible && (
                <Portal>
                    <div
                        data-placement="bottom"
                        ref={(node) => {
                            elements.setFloating(node);
                        }}
                        style={{ ...floatingStyles, zIndex: 'var( --z-index-dropdown)' }}
                    >
                        <Calendar
                            focusTrap={true}
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
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
