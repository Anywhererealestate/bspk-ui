import { SvgChevronLeft } from '@bspk/icons/ChevronLeft';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgKeyboardDoubleArrowLeft } from '@bspk/icons/KeyboardDoubleArrowLeft';
import { SvgKeyboardDoubleArrowRight } from '@bspk/icons/KeyboardDoubleArrowRight';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameDay, isSameMonth } from 'date-fns';
import { useEffect, useState } from 'react';
import './date-picker.scss';
import { YearMonth } from './MonthPicker';

export type DayPickerProps = {
    /** The currently selected date */
    value?: Date;
    /** Fires when the date changes with the new date */
    onChange?: (newDate: Date) => void;
    /**
     * Determines how the DayPicker will appear.
     *
     * @default flat
     */
    variant?: 'elevated' | 'flat';
    /** Fires when the visible picker changes. Useful when the DayPicker is part of the DatePicker component. */
    onPickerChange?: (picker: 'day' | 'month' | 'year') => void;
    /** The month and year currently being viewed */
    viewMonth?: YearMonth;
    /** Sets the month and year currently being viewed */
    setViewMonth?: React.Dispatch<React.SetStateAction<YearMonth>>;
};

/**
 * A component or widget that allows customers to select a day,
 *
 * @example
 *     import { DayPicker } from '@bspk/ui/DayPicker';
 *
 *     function Example() {
 *         const [date, setDate] = useState<Date | undefined>(new Date());
 *
 *         return <DayPicker value={date} onChange={setDate} />;
 *     }
 *
 * @name DayPicker
 * @phase Dev
 */
export function DayPicker({
    onChange,
    value,
    variant = 'flat',
    onPickerChange,
    viewMonth,
    setViewMonth,
}: DayPickerProps) {
    const [viewMonthInternal, setViewMonthInternal] = useState<YearMonth>(() => {
        const initial = value ? value : new Date();

        return { year: initial.getFullYear(), monthIndex: initial.getMonth() };
    });

    const viewDate = new Date(viewMonthInternal.year, viewMonthInternal.monthIndex, 1);

    useEffect(() => {
        if (viewMonth && setViewMonth) {
            setViewMonthInternal(viewMonth);
        }
    }, [viewMonth, setViewMonth]);

    const setter = setViewMonth ? setViewMonth : setViewMonthInternal;

    const controlRow = () => (
        <div data-control-row="">
            <button
                aria-label="Previous Year"
                data-month-button=""
                onClick={() =>
                    setter((prev) => ({
                        year: prev.year - 1,
                        monthIndex: prev.monthIndex,
                    }))
                }
            >
                <SvgKeyboardDoubleArrowLeft fontSize="24px" />
            </button>

            <button
                aria-label="Previous Month"
                data-month-button=""
                onClick={() =>
                    setter((prev) => ({
                        year: prev.monthIndex === 0 ? prev.year - 1 : prev.year,
                        monthIndex: (prev.monthIndex + 11) % 12,
                    }))
                }
            >
                <SvgChevronLeft fontSize="24px" />
            </button>

            <div data-current-period="">
                {onPickerChange ? (
                    <>
                        <button onClick={() => onPickerChange('month')}>{format(viewDate, 'MMMM')}</button>{' '}
                        <button onClick={() => onPickerChange('year')}>{viewDate.getFullYear()}</button>
                    </>
                ) : (
                    format(viewDate, 'MMMM yyyy')
                )}
            </div>

            <button
                aria-label="Next Month"
                data-month-button=""
                onClick={() =>
                    setter((prev) => ({
                        year: prev.monthIndex === 11 ? prev.year + 1 : prev.year,
                        monthIndex: (prev.monthIndex + 1) % 12,
                    }))
                }
            >
                <SvgChevronRight fontSize="24px" />
            </button>

            <button
                aria-label="Next Year"
                data-month-button=""
                onClick={() =>
                    setter((prev) => ({
                        year: prev.year + 1,
                        monthIndex: prev.monthIndex,
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
        <div data-bspk="day-picker" data-variant={variant}>
            {controlRow()}
            {weekdayElements()}
            {dayElements()}
        </div>
    );
}
