import { SvgArrowLeft } from '@bspk/icons/ArrowLeft';
import { SvgArrowRight } from '@bspk/icons/ArrowRight';
import { SvgKeyboardDoubleArrowLeft } from '@bspk/icons/KeyboardDoubleArrowLeft';
import { SvgKeyboardDoubleArrowRight } from '@bspk/icons/KeyboardDoubleArrowRight';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameDay, isSameMonth } from 'date-fns';
import { useState } from 'react';
import './date-picker.scss';

export type DatePickerProps = {
    /** The currently selected date */
    value?: Date;
    /** Fires when the date changes with the new date */
    onChange?: (newDate: Date) => void;
    /**
     * Determines how the DatePicker will appear.
     *
     * @default flat
     */
    variant?: 'elevated' | 'flat';
};

/**
 * A component or widget that allows customers to select a day,
 *
 * @example
 *     import { DatePicker } from '@bspk/ui/DatePicker';
 *
 *     function Example() {
 *         const [date, setDate] = useState<Date | undefined>(new Date());
 *
 *         return <DatePicker value={date} onChange={setDate} />;
 *     }
 *
 * @name DatePicker
 * @phase Dev
 */
export function DatePicker({ onChange, value, variant = 'flat' }: DatePickerProps) {
    const [viewMonth, setViewMonth] = useState(() => {
        const initial = value ? value : new Date();

        return { year: initial.getFullYear(), month: initial.getMonth() };
    });

    const viewDate = new Date(viewMonth.year, viewMonth.month, 1);

    const controlRow = () => (
        <div data-control-row="">
            <button
                aria-label="Previous Year"
                data-month-button=""
                onClick={() =>
                    setViewMonth((prev) => ({
                        year: prev.year - 1,
                        month: prev.month,
                    }))
                }
            >
                <SvgKeyboardDoubleArrowLeft fontSize="24px" />
            </button>

            <button
                aria-label="Previous Month"
                data-month-button=""
                onClick={() =>
                    setViewMonth((prev) => ({
                        year: prev.month === 0 ? prev.year - 1 : prev.year,
                        month: (prev.month + 11) % 12,
                    }))
                }
            >
                <SvgArrowLeft fontSize="24px" />
            </button>

            <div data-current-period="">{format(viewDate, 'MMMM yyyy')}</div>

            <button
                aria-label="Next Month"
                data-month-button=""
                onClick={() =>
                    setViewMonth((prev) => ({
                        year: prev.month === 11 ? prev.year + 1 : prev.year,
                        month: (prev.month + 1) % 12,
                    }))
                }
            >
                <SvgArrowRight fontSize="24px" />
            </button>

            <button
                aria-label="Next Year"
                data-month-button=""
                onClick={() =>
                    setViewMonth((prev) => ({
                        year: prev.year + 1,
                        month: prev.month,
                    }))
                }
            >
                <SvgKeyboardDoubleArrowRight fontSize="24px" />
            </button>
        </div>
    );

    const weekdayElements = () => {
        const days = [];
        const start = startOfWeek(viewDate);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div data-weekday="" key={i}>
                    {format(addDays(start, i), 'EEE')}
                </div>,
            );
        }
        return <div data-weekdays="">{days}</div>;
    };

    const dayElements = () => {
        const monthStart = startOfMonth(viewDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const dayCopy = new Date(day);
                const formattedDate = format(dayCopy, 'd');
                const isOtherMonth = !isSameMonth(dayCopy, monthStart);

                days.push(
                    <span
                        data-day=""
                        data-other-month={isOtherMonth ? '' : undefined}
                        data-selected={value && isSameDay(dayCopy, value) ? '' : undefined}
                        data-today={isSameDay(dayCopy, new Date()) ? '' : undefined}
                        key={dayCopy.getDate()}
                    >
                        <button
                            disabled={isOtherMonth}
                            key={dayCopy.getDate()}
                            onClick={
                                !isOtherMonth
                                    ? () => {
                                          if (onChange) {
                                              onChange(dayCopy);
                                          }
                                      }
                                    : undefined
                            }
                        >
                            {formattedDate}
                        </button>
                    </span>,
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div data-period-row="" key={day.getDate()}>
                    {days}
                </div>,
            );
            days = [];
        }

        return <div data-days="">{rows}</div>;
    };

    return (
        <div data-bspk="date-picker" data-variant={variant}>
            {controlRow()}
            {weekdayElements()}
            {dayElements()}
        </div>
    );
}

DatePicker.bspkName = 'DatePicker';
