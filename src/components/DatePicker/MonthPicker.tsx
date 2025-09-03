import { SvgChevronLeft } from '@bspk/icons/ChevronLeft';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { useEffect, useState } from 'react';
import '-/components/DatePicker/date-picker.scss';
import './month-picker.scss';

/** Represents the year and month of a date. */
export type YearMonth = {
    /** The year of the selected month */
    year: number;
    /** The index of the selected month */
    monthIndex: number;
};
export type MonthPickerProps = {
    /**
     * The currently selected year and month
     *
     * @type YearMonth
     */
    value?: YearMonth;
    /** Fires when the date changes with the new date */
    onChange?: (newValue: YearMonth) => void;
    /**
     * Determines how the MonthPicker will appear.
     *
     * @default flat
     */
    variant?: 'elevated' | 'flat';
};

/**
 * A component or widget that allows customers to select a month within a given calendar year, triggering the date
 * picker post selection of the month.
 *
 * @example
 *     import { MonthPicker } from '@bspk/ui/MonthPicker';
 *
 *     function Example() {
 *         const [date, setDate] = useState<YearMonth | undefined>({ year: 2022, month: 9 });
 *
 *         return <MonthPicker value={date} onChange={setDate} />;
 *     }
 *
 * @name MonthPicker
 * @phase Dev
 */
export function MonthPicker({ onChange, value, variant = 'flat' }: MonthPickerProps) {
    const [internalValue, setInternalValue] = useState<YearMonth>(() => {
        const today = new Date();
        return value || { year: today.getFullYear(), monthIndex: today.getMonth() };
    });
    const [viewMonth, setViewMonth] = useState<YearMonth>(internalValue);

    const handleMonthClick = (monthIndex: number) => {
        const newValue = { year: viewMonth.year, monthIndex };
        setInternalValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    useEffect(() => {
        if (value) {
            setInternalValue(value);
            setViewMonth(value);
        }
    }, [value]);

    return (
        <div data-bspk="month-picker" data-variant={variant}>
            <div data-control-row>
                <button
                    aria-label="Previous Year"
                    data-month-button
                    onClick={() =>
                        setViewMonth((prev) => ({
                            year: prev.year - 1,
                            monthIndex: prev.monthIndex,
                        }))
                    }
                >
                    <SvgChevronLeft fontSize="24px" />
                </button>

                <div data-current-period>{viewMonth.year}</div>

                <button
                    aria-label="Next Year"
                    data-month-button
                    onClick={() =>
                        setViewMonth((prev) => ({
                            year: prev.year + 1,
                            monthIndex: prev.monthIndex,
                        }))
                    }
                >
                    <SvgChevronRight fontSize="24px" />
                </button>
            </div>

            <div data-month-grid>
                {[
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ].map((month, idx) => {
                    const isSelected = internalValue?.monthIndex === idx && internalValue.year === viewMonth.year;
                    return (
                        <div data-month data-selected={isSelected ? '' : undefined} key={month}>
                            <button onClick={() => handleMonthClick(idx)}>{month}</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
