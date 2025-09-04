import { SvgChevronLeft } from '@bspk/icons/ChevronLeft';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgKeyboardDoubleArrowLeft } from '@bspk/icons/KeyboardDoubleArrowLeft';
import { SvgKeyboardDoubleArrowRight } from '@bspk/icons/KeyboardDoubleArrowRight';
import {
    addDays,
    addMonths,
    addYears,
    endOfMonth,
    endOfWeek,
    format,
    setMonth,
    setYear,
    startOfDecade,
    startOfMonth,
    startOfWeek,
    isValid,
    isSameDay,
} from 'date-fns';
import { useMemo, useState } from 'react';
import { Button, ButtonProps } from '-/components/Button';

import './calendar-picker.scss';

type Direction = '<' | '<<' | '>' | '>>';
type Kind = 'day' | 'month' | 'year';

const DIRECTION_ICONS: Record<Direction, JSX.Element> = {
    '<<': <SvgKeyboardDoubleArrowLeft />,
    '>>': <SvgKeyboardDoubleArrowRight />,
    '>': <SvgChevronRight />,
    '<': <SvgChevronLeft />,
};

const BUTTON_LABELS: Record<Kind, Record<Direction, string>> = {
    day: {
        '<<': 'Previous Year',
        '<': 'Previous Month',
        '>': 'Next Month',
        '>>': 'Next Year',
    },
    month: {
        '<<': '',
        '<': 'Previous Year',
        '>': 'Next Year',
        '>>': '',
    },
    year: {
        '<<': '',
        '<': 'Earlier Years',
        '>': 'Later Years',
        '>>': '',
    },
};

export type CalendarPickerProps = {
    /**
     * The currently selected date
     *
     * @type Date
     */
    value: Date | undefined;
    /** Fires when the date changes with the new date */
    onChange: (newDate: Date) => void;
    /**
     * Determines how the CalendarPicker will appear.
     *
     * @default flat
     */
    variant?: 'elevated' | 'flat';
};

/**
 * A component or widget that allows customers to select the date, month, and year.
 *
 * @example
 *     import { CalendarPicker } from '@bspk/ui/CalendarPicker';
 *
 *     function Example() {
 *         return <CalendarPicker>Example CalendarPicker</CalendarPicker>;
 *     }
 *
 * @name CalendarPicker
 * @phase Dev
 */
export function CalendarPicker({ value: valueProp = new Date(), onChange, variant = 'flat' }: CalendarPickerProps) {
    const [value, setValue] = useState<Date>(isValid(valueProp) ? valueProp : new Date());

    const [kind, setKind] = useState<Kind>('day');

    const body = useMemo(() => {
        let start = value;
        let end = value;
        let increment = (date: Date) => date;
        let formatStr = '';
        const items = [];

        if (kind === 'day') {
            start = startOfWeek(startOfMonth(value), { weekStartsOn: 0 });
            end = endOfWeek(endOfMonth(value), { weekStartsOn: 0 });
            increment = (date: Date) => addDays(date, 1);
            formatStr = 'd';
        }

        if (kind === 'month') {
            start = setMonth(value, 0);
            end = setMonth(value, 11);
            increment = (date: Date) => addMonths(date, 1);
            formatStr = 'MMM';
        }

        if (kind === 'year') {
            const decadeStart = startOfDecade(value).getFullYear() - 1;
            start = setYear(value, decadeStart);
            end = setYear(value, decadeStart + 11);
            increment = (date: Date) => addYears(date, 1);
            formatStr = 'yyyy';
        }

        let date = start;
        while (date <= end) {
            items.push(date);
            date = increment(date);
        }

        return { formatStr, items };
    }, [value, kind]);

    const handleDirectionChange = (direction: Direction) => {
        setValue((current) => {
            if (kind === 'day') {
                if (direction === '<') return addMonths(current, -1);
                if (direction === '<<') return addYears(current, -1);
                if (direction === '>') return addMonths(current, 1);
                if (direction === '>>') return addYears(current, 1);
            }

            if (kind === 'month') {
                if (direction === '<') return addYears(current, -1);
                if (direction === '>') return addYears(current, 1);
            }

            if (kind === 'year') {
                if (direction === '<') return addYears(current, -10);
                if (direction === '>') return addYears(current, 10);
            }
            return current;
        });
    };

    const handleSelect = (next: Date) => {
        if (kind === 'day') {
            setValue(next);
            onChange(next);
            return;
        }

        let nextKind: Kind = kind;
        if (kind === 'month') nextKind = 'day';
        if (kind === 'year') nextKind = 'month';

        setKind(nextKind);
        setValue(next);
    };

    const buttonProps = (direction: Direction): ButtonProps => ({
        icon: DIRECTION_ICONS[direction],
        label: BUTTON_LABELS[kind][direction],
        onClick: () => handleDirectionChange(direction),
        size: 'large',
        variant: 'tertiary',
        iconOnly: true,
    });

    return (
        <div data-bspk="calendar-picker" data-kind={kind} data-variant={variant || 'flat'}>
            <div data-controls>
                {kind === 'day' && <Button {...buttonProps('<<')} />}

                <Button {...buttonProps('<')} />

                <div data-header>
                    {kind === 'day' && (
                        <>
                            <Button
                                data-month
                                iconOnly
                                label={format(value, 'MMMM')}
                                onClick={() => setKind('month')}
                                size="large"
                                variant="tertiary"
                            />
                            <Button
                                data-year
                                iconOnly
                                label={`${value.getFullYear()}`}
                                onClick={() => setKind('year')}
                                size="large"
                                variant="tertiary"
                            />
                        </>
                    )}
                    {kind === 'month' && (
                        <>
                            <Button
                                iconOnly
                                label={`${value.getFullYear()}`}
                                onClick={() => setKind('year')}
                                size="large"
                                variant="tertiary"
                            />
                        </>
                    )}
                    {kind === 'year' && (
                        <>
                            <Button
                                iconOnly
                                label={`${startOfDecade(value).getFullYear() - 1} - ${startOfDecade(value).getFullYear() + 10}`}
                                onClick={() => setKind('year')}
                                size="large"
                                variant="tertiary"
                            />
                        </>
                    )}
                </div>

                <Button {...buttonProps('>')} />

                {kind === 'day' && <Button {...buttonProps('>>')} />}
            </div>
            {kind === 'day' && (
                <div data-headers>
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                </div>
            )}
            <div data-body>
                {body.items.map((date) => (
                    <div data-option key={date.toString()}>
                        <Button
                            data-non-month-day={
                                kind === 'day' && date.getMonth() !== value.getMonth() ? true : undefined
                            }
                            label={format(date, body.formatStr)}
                            onClick={() => handleSelect(date)}
                            size="large"
                            variant={isSameDay(date, value) ? 'primary' : 'tertiary'}
                            width={kind === 'day' ? 'fill' : 'hug'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
