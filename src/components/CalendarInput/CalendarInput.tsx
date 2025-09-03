import { SvgEvent } from '@bspk/icons/Event';
import { format } from 'date-fns';
import { useState } from 'react';
import { parseAndFormatTypedDate } from './helpers';
import { DatePicker, DatePickerProps } from '-/components/DatePicker';
import { Portal } from '-/components/Portal';
import { TextInput, TextInputProps } from '-/components/TextInput';
import { useFloating } from '-/hooks/useFloating';
import './calendar-input.scss';
import { useOutsideClick } from '-/hooks/useOutsideClick';

export type CalendarInputProps = Pick<
    TextInputProps,
    'aria-label' | 'disabled' | 'invalid' | 'name' | 'readOnly' | 'required' | 'size'
> &
    Pick<DatePickerProps, 'onChange' | 'value'> & {
        /**
         * If the calendar should close when a date is selected.
         *
         * @default true
         */
        closeCalendarOnChange?: boolean;
    };

/**
 * An input field that allows a customer to manually type in a specific date or triggers a date picker combobox to
 * select a date.
 *
 * @example
 *     import { CalendarInput } from '@bspk/ui/CalendarInput';
 *     import { useState } from 'react';
 *
 *     function Example() {
 *         const [date, setDate] = useState<Date | undefined>(new Date());
 *
 *         return <CalendarInput name="calendar input" aria-label="calendar input" value={date} onChange={setDate} />;
 *     }
 *
 * @name CalendarInput
 * @phase Dev
 */
function CalendarInput({
    value,
    onChange,
    disabled,
    readOnly,
    closeCalendarOnChange = true,
    ...restProps
}: CalendarInputProps) {
    const [textValue, setTextValue] = useState(value ? format(value, 'MM/dd/yyyy') : '');
    const [calendarVisible, setCalendarVisible] = useState(false);

    const { elements, floatingStyles } = useFloating({
        placement: 'bottom',
        strategy: 'absolute',
        offsetOptions: 4,
        hide: !calendarVisible,
    });

    useOutsideClick({
        elements: [elements.floating],
        callback: () => setCalendarVisible(false),
    });

    const handleChange = (date: Date) => {
        if (onChange) {
            onChange(date);
        }

        if (closeCalendarOnChange) {
            setCalendarVisible(false);
        }

        setTextValue(format(date, 'MM/dd/yyyy'));
    };

    const handleTextChange = (newValue: string) => {
        const { formatted, date } = parseAndFormatTypedDate(newValue, newValue.length < textValue.length);

        setTextValue(formatted);

        if (date && onChange) {
            handleChange(date);
        }
    };

    return (
        <span data-bspk="calendar-input">
            <div
                ref={(node) => {
                    elements.setReference(node);
                }}
            >
                <TextInput
                    disabled={disabled}
                    onChange={handleTextChange}
                    readOnly={readOnly}
                    value={textValue}
                    {...restProps}
                    showClearButton={false}
                    trailing={
                        calendarVisible || disabled || readOnly ? undefined : (
                            <button aria-label="Toggle calendar" onClick={() => setCalendarVisible(true)}>
                                <SvgEvent />
                            </button>
                        )
                    }
                />
            </div>
            <Portal>
                <div
                    data-placement="bottom"
                    ref={(node) => {
                        elements.setFloating(node);
                    }}
                    style={{ ...floatingStyles, zIndex: 'var( --z-index-dropdown)' }}
                >
                    <DatePicker onChange={handleChange} value={value} variant="elevated" />
                </div>
            </Portal>
        </span>
    );
}

CalendarInput.bspkName = 'CalendarInput';

export { CalendarInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
