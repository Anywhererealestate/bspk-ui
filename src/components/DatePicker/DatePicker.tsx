import './date-picker.scss';
import { SvgEvent } from '@bspk/icons/Event';
import { format, startOfToday } from 'date-fns';
import { useMemo, useState } from 'react';
import { Button } from '-/components/Button';
import { Calendar, parseDate } from '-/components/Calendar';
import { useFieldInit } from '-/components/Field';
import { InputElement, InputProps } from '-/components/Input';
import { useFloating } from '-/hooks/useFloating';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { FieldControlProps } from '-/types/common';

export type DatePickerProps = Omit<FieldControlProps, 'aria-label' | 'onChange' | 'value'> &
    Pick<InputProps, 'size'> & {
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
        /**
         * The currently selected date
         *
         * String formatted as 'MM/dd/yyyy'.
         *
         * @type string
         */
        value?: string;
        /** Fires when the date changes with the new date */
        onChange: (next: string) => void;
        /**
         * The aria-label attribute for the date input field.
         *
         * @default Enter or choose date
         */
        'aria-label'?: string;
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
 *     () => {
 *         const [standaloneDate, setStandaloneDate] = useState<Date | undefined>();
 *         const [standaloneError, setStandaloneError] = useState<string | undefined>();
 *
 *         const [fieldDate, setFieldDate] = useState<Date | undefined>(new Date());
 *
 *         return (
 *             <>
 *                 // standalone date picker example
 *                 <DatePicker
 *                     aria-label="Date"
 *                     name="date2"
 *                     value={standaloneDate}
 *                     onChange={setStandaloneDate}
 *                     onError={setStandaloneError}
 *                     invalid={!!standaloneError}
 *                     required
 *                     aria-errormessage={standaloneError ? 'standalone-error' : undefined}
 *                 />
 *                 {standaloneError && <div id="standalone-error">{standaloneError}</div>}
 *                 <br />
 *                 // date picker used within a field
 *                 <Field>
 *                     <FieldLabel>Date</FieldLabel>
 *                     <DatePicker required name="date1" value={fieldDate} onChange={setFieldDate} />
 *                     <FieldDescription>The date picker allows you to select a date.</FieldDescription>
 *                     <FieldError />
 *                 </Field>
 *             </>
 *         );
 *     };
 *
 * @name DatePicker
 * @phase UXReview
 */
export function DatePicker({
    value,
    onChange,
    disabled,
    readOnly,
    closeCalendarOnChange = true,
    name,
    placeholder,
    invalid: invalidProp,
    required = false,
    size,
    id: idProp,
    'aria-label': ariaLabel = 'Enter or choose date',
}: DatePickerProps) {
    const { id, ariaDescribedBy, ariaErrorMessage, invalid } = useFieldInit({
        idProp,
        required,
        disabled,
        readOnly,
        invalidProp,
    });

    const [calendarVisible, setCalendarVisible] = useState(false);

    const { elements, floatingStyles } = useFloating({
        placement: 'bottom-start',
        strategy: 'absolute',
        offsetOptions: 4,
        refWidth: false,
    });

    useOutsideClick({
        elements: [elements.floating],
        callback: () => setCalendarVisible(false),
        disabled: !calendarVisible,
    });

    const calendarId = `${id}-calendar`;

    const activeDate = useMemo(() => parseDate(value) || startOfToday(), [value]);

    return (
        <div
            data-bspk="date-picker"
            ref={(node) => {
                elements.setReference(node);
            }}
        >
            <InputElement
                aria-describedby={ariaDescribedBy || undefined}
                aria-errormessage={ariaErrorMessage || undefined}
                aria-label={ariaLabel}
                disabled={disabled || undefined}
                id={id}
                invalid={invalid || undefined}
                name={name}
                onChange={onChange}
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
                value={typeof value === 'string' ? value : ''}
            />
            {calendarVisible && (
                <div
                    aria-label="Choose Date"
                    aria-modal="true"
                    data-bspk="calendar-popup"
                    ref={(node) => elements.setFloating(node)}
                    role="dialog"
                    style={{ ...floatingStyles }}
                >
                    <Calendar
                        focusTrap
                        id={calendarId}
                        onChange={(next) => {
                            if (closeCalendarOnChange) setCalendarVisible(false);
                            onChange(format(next, 'MM/dd/yyyy'));
                        }}
                        value={activeDate}
                    />
                </div>
            )}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
