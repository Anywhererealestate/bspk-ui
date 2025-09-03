import { useState } from 'react';
import './date-picker.scss';
import { DayPicker } from './DayPicker';
import { MonthPicker, YearMonth } from './MonthPicker';
import { YearPicker } from './YearPicker';

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
 * A component or widget that allows customers to select a date,
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
    const [visiblePicker, setVisiblePicker] = useState<'day' | 'month' | 'year'>('day');
    const [viewMonth, setViewMonth] = useState<YearMonth>(() => {
        const initial = value ? value : new Date();

        return { year: initial.getFullYear(), monthIndex: initial.getMonth() };
    });

    const selectYearMonth = (newVal: YearMonth) => {
        setViewMonth(newVal);
        setVisiblePicker('day');
    };

    const componentBody = () => {
        switch (visiblePicker) {
            case 'day':
                return (
                    <DayPicker
                        onChange={onChange}
                        onPickerChange={setVisiblePicker}
                        setViewMonth={setViewMonth}
                        value={value}
                        variant={variant}
                        viewMonth={viewMonth}
                    />
                );
            case 'month':
                return <MonthPicker onChange={selectYearMonth} value={viewMonth} variant={variant} />;
            case 'year':
                return (
                    <YearPicker
                        onChange={(newVal) => selectYearMonth({ ...viewMonth, year: newVal })}
                        value={viewMonth.year}
                        variant={variant}
                    />
                );
        }
    };

    return <div data-bspk="date-picker">{componentBody()}</div>;
}
