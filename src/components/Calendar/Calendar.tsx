import './calendar.scss';
import { SvgChevronLeft } from '@bspk/icons/ChevronLeft';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgKeyboardDoubleArrowLeft } from '@bspk/icons/KeyboardDoubleArrowLeft';
import { SvgKeyboardDoubleArrowRight } from '@bspk/icons/KeyboardDoubleArrowRight';
import {
    addMonths,
    addYears,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isValid,
    startOfMonth,
    startOfToday,
    startOfWeek,
} from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useKeyDownCaptures, optionIdGenerator } from './utils';
import { Button } from '-/components/Button';
import { useId } from '-/hooks/useId';
import { getElementById } from '-/utils/dom';

export type CalendarProps = {
    /**
     * The currently selected date
     *
     * @type Date
     */
    value: Date | undefined;
    /** Fires when the date changes with the new date */
    onChange: (newDate: Date) => void;
    /**
     * When true, keyboard focus is trapped within the calendar component on initial render.
     *
     * Only applicable if the Calendar is used in a popover like in DatePicker.
     *
     * @default false
     */
    focusInit?: boolean;
    /** The id of the calendar component. */
    id?: string;
};

/**
 * Allows customers to select the date, month, and year.
 *
 * @name Calendar
 * @phase UXReview
 */
export function Calendar({ id, value: valueProp, onChange, focusInit = false }: CalendarProps) {
    const baseId = useId(id);

    const [activeDate, setActiveDate] = useState<Date>(valueProp && isValid(valueProp) ? valueProp : startOfToday());

    // we don't need to recreate the rows unless the active month changes
    const activeMonth = useMemo(() => startOfMonth(activeDate), [activeDate]);
    const rows = useMemo(
        () =>
            // generate all days to be shown in the month view
            eachDayOfInterval({
                start: startOfWeek(activeMonth, { weekStartsOn: 0 }),
                end: endOfWeek(endOfMonth(activeMonth), { weekStartsOn: 0 }),
            })
                // create groups of 7 for each week
                .reduce<Date[][]>((row, item) => {
                    const previousRow = row[row.length - 1];
                    if (row.length === 0 || previousRow.length === 7) return [...row, [item]];
                    previousRow.push(item);
                    return row;
                }, []),
        [activeMonth],
    );

    const { handleKeyDownCapture } = useKeyDownCaptures({
        activeDate,
        setActiveDate,
        rows,
    });

    const generateOptionId = useMemo(() => optionIdGenerator(baseId), [baseId]);

    const [isDayFocused, setIsDayFocused] = useState<boolean>(false);

    useEffect(() => {
        if (isDayFocused) getElementById(generateOptionId(activeDate))?.focus({ preventScroll: true });
    }, [activeDate, isDayFocused, generateOptionId]);

    return (
        <div data-bspk="calendar" id={baseId}>
            <div data-header>
                <Button
                    icon={<SvgKeyboardDoubleArrowLeft />}
                    iconOnly={true}
                    label="Previous Year"
                    onClick={() => setActiveDate(addYears(activeDate, -1))}
                    size="large"
                    variant="tertiary"
                />
                <Button
                    icon={<SvgChevronLeft />}
                    iconOnly={true}
                    label="Previous Month"
                    onClick={() => setActiveDate(addMonths(activeDate, -1))}
                    size="large"
                    variant="tertiary"
                />
                <span data-title>{format(activeDate, 'MMMM yyyy')}</span>
                <Button
                    icon={<SvgChevronRight />}
                    iconOnly={true}
                    label="Next Month"
                    onClick={() => setActiveDate(addMonths(activeDate, 1))}
                    size="large"
                    variant="tertiary"
                />
                <Button
                    icon={<SvgKeyboardDoubleArrowRight />}
                    iconOnly={true}
                    label="Next Year"
                    onClick={() => setActiveDate(addYears(activeDate, 1))}
                    size="large"
                    variant="tertiary"
                />
            </div>
            <table role="grid">
                <thead>
                    <tr>
                        <th abbr="Sunday" scope="col">
                            Sun
                        </th>
                        <th abbr="Monday" scope="col">
                            Mon
                        </th>
                        <th abbr="Tuesday" scope="col">
                            Tue
                        </th>
                        <th abbr="Wednesday" scope="col">
                            Wed
                        </th>
                        <th abbr="Thursday" scope="col">
                            Thu
                        </th>
                        <th abbr="Friday" scope="col">
                            Fri
                        </th>
                        <th abbr="Saturday" scope="col">
                            Sat
                        </th>
                    </tr>
                </thead>
                <tbody
                    onBlurCapture={() => setIsDayFocused(false)}
                    onFocusCapture={() => setIsDayFocused(true)}
                    onKeyDownCapture={handleKeyDownCapture}
                >
                    {rows.map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((date) => {
                                const label = format(date, 'd');
                                const optionId = generateOptionId(date);
                                const isActive = isSameDay(date, activeDate);
                                return (
                                    <td
                                        aria-label={format(date, 'do MMMM yyyy')}
                                        data-selected={isActive || undefined}
                                        id={optionId}
                                        key={date.toString()}
                                        onClick={() => onChange(date)}
                                        ref={(node) => {
                                            if (focusInit && isActive && node) {
                                                setTimeout(() => {
                                                    node.focus({ preventScroll: true });
                                                }, 0);
                                            }
                                        }}
                                        role={isActive ? 'gridcell' : undefined}
                                        tabIndex={isActive ? 0 : -1}
                                    >
                                        {label}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
