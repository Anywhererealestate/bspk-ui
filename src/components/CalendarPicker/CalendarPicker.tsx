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
    startOfDecade,
    startOfMonth,
    startOfWeek,
    isValid,
    isSameDay,
    isSameMonth,
    isSameYear,
    setMonth,
    endOfDecade,
} from 'date-fns';
import { FocusTrap } from 'focus-trap-react';
import { useCallback, useMemo, useState, KeyboardEvent, ReactNode, useEffect } from 'react';
import { Button, ButtonVariant } from '-/components/Button';
import { ListItemProps } from '-/components/ListItem';
import { useId } from '-/hooks/useId';
import { handleKeyDown } from '-/utils/handleKeyDown';

import './calendar-picker.scss';

type Direction = '<' | '<<' | '>' | '>>';
type Kind = 'day' | 'month' | 'year';

const HEADER_BTNS: ('label' | { direction: Direction; svg: ReactNode; label: string })[] = [
    { direction: '<<', svg: <SvgKeyboardDoubleArrowLeft />, label: 'Previous Year' },
    { direction: '<', svg: <SvgChevronLeft />, label: 'Previous Month' },
    'label',
    { direction: '>', svg: <SvgChevronRight />, label: 'Next Month' },
    { direction: '>>', svg: <SvgKeyboardDoubleArrowRight />, label: 'Next Year' },
];

type ConfigKind = {
    headerBtns: Partial<
        Record<
            Direction,
            {
                label: string;
                fn: (date: Date, amount: number) => Date;
            }
        >
    >;
    columns: number;
    range: {
        start: (date: Date) => Date;
        end: (date: Date) => Date;
    };
    compare: (dateLeft: Date, dateRight: Date) => boolean;
    nextKind?: Kind;
    incrementFn: (date: Date, amount: number) => Date;
    formatStr: string;
    rows?: number;
    label: string;
    ariaFormatStr: string;
    headerLabel: (baseDate: Date, setKind: (next: Kind) => void) => ReactNode;
    listBoxHeader?: ReactNode;
};

/**
 * Mappings for all kinds of calendar values
 *
 * Prevents repeating the same data in multiple places and a lot of if/else statements
 */
const CONFIG: Record<Kind, ConfigKind> = {
    day: {
        headerBtns: {
            '<<': { label: 'Previous Year', fn: addYears },
            '<': { label: 'Previous Month', fn: addMonths },
            '>': { label: 'Next Month', fn: addMonths },
            '>>': { label: 'Next Year', fn: addYears },
        },
        columns: 7,
        range: {
            start: (date: Date) => startOfWeek(startOfMonth(date), { weekStartsOn: 0 }),
            end: (date: Date) => endOfWeek(endOfMonth(date), { weekStartsOn: 0 }),
        },
        compare: isSameDay,
        incrementFn: addDays,
        formatStr: 'd',
        label: 'Select Date',
        ariaFormatStr: 'do MMMM yyyy',
        headerLabel: (baseDate, setKind) => (
            <>
                <Button
                    aria-label={`Change Month, currently ${format(baseDate, 'MMMM')}`}
                    data-month
                    iconOnly
                    label={format(baseDate, 'MMMM')}
                    onClick={() => setKind('month')}
                    size="large"
                    variant="tertiary"
                />
                <Button
                    aria-label={`Change Year, currently ${baseDate.getFullYear()}`}
                    data-year
                    iconOnly
                    label={`${baseDate.getFullYear()}`}
                    onClick={() => setKind('year')}
                    size="large"
                    variant="tertiary"
                />
            </>
        ),
        listBoxHeader: (
            <div data-day-headers>
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
            </div>
        ),
    },
    month: {
        headerBtns: {
            '<': { label: 'Previous Year', fn: addYears },
            '>': { label: 'Next Year', fn: addYears },
        },
        columns: 3,
        rows: 4,
        range: {
            start: (date: Date) => setMonth(date, 0),
            end: (date: Date) => setMonth(date, 11),
        },
        incrementFn: addMonths,
        compare: isSameMonth,
        nextKind: 'day',
        formatStr: 'MMM',
        label: 'Select Month',
        ariaFormatStr: 'MMMM yyyy',
        headerLabel: (baseDate, setKind) => (
            <Button
                aria-label={`Change Year, currently ${baseDate.getFullYear()}`}
                iconOnly
                label={`${baseDate.getFullYear()}`}
                onClick={() => setKind('year')}
                size="large"
                variant="tertiary"
            />
        ),
    },
    year: {
        headerBtns: {
            '<': { label: 'Earlier Years', fn: (d) => addYears(d, -10) },
            '>': { label: 'Later Years', fn: (d) => addYears(d, 10) },
        },
        columns: 4,
        rows: 3,
        range: {
            start: (date: Date) => addYears(startOfDecade(date), -1),
            end: (date: Date) => addYears(endOfDecade(date), 1),
        },
        compare: isSameYear,
        nextKind: 'month',
        incrementFn: addYears,
        formatStr: 'yyyy',
        label: 'Select Year',
        ariaFormatStr: 'yyyy',
        headerLabel: (baseDate, setKind) => (
            <Button
                aria-label={`Change Decade, currently ${startOfDecade(baseDate).getFullYear()} to ${endOfDecade(
                    baseDate,
                ).getFullYear()}`}
                iconOnly
                label={`${startOfDecade(baseDate).getFullYear() - 1} - ${startOfDecade(baseDate).getFullYear() + 10}`}
                onClick={() => setKind('year')}
                size="large"
                variant="tertiary"
            />
        ),
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
export function CalendarPicker({ value: valueProp, onChange, variant = 'flat' }: CalendarPickerProps) {
    const baseId = useId();
    const [kind, setKind] = useState<Kind>('day');
    const config = useMemo(() => CONFIG[kind], [kind]);
    const value = useMemo(() => (valueProp && isValid(valueProp) ? valueProp : new Date()), [valueProp]);

    const [baseDate, setBaseDate] = useState<Date>(value);
    useEffect(() => setBaseDate(value), [value]);

    const { items } = useItemsAndRange(config, baseDate, baseId);

    const handleItemArrows = useCallback(
        (direction: 'down' | 'left' | 'right' | 'up') => (event: KeyboardEvent) => {
            event.preventDefault();

            const multiplier = direction === 'down' || direction === 'right' ? 1 : -1;

            const amount = direction === 'left' || direction === 'right' ? 1 : config.columns;

            const next = config.incrementFn(baseDate, amount * multiplier);

            setBaseDate(next);
        },
        [config, baseDate],
    );

    const handleItemClick = (next: Date) => {
        setBaseDate(next);
        if (config.nextKind) setKind(config.nextKind);
        if (kind === 'day') onChange(next);
    };

    return (
        <FocusTrap
            focusTrapOptions={{
                initialFocus: false,
                escapeDeactivates: true,
                clickOutsideDeactivates: true,
                fallbackFocus: () => {
                    const idToFocus = items.find(({ value: date }) => config.compare(date, baseDate))?.id;
                    return document.querySelector<HTMLElement>(`[id="${idToFocus}"]`)!;
                },
            }}
        >
            <div data-bspk="calendar-picker" data-kind={kind} data-variant={variant || 'flat'}>
                <div data-header>
                    {HEADER_BTNS.map((btn) => {
                        if (btn === 'label')
                            return (
                                <div data-title key="label">
                                    {config.headerLabel(baseDate, setKind)}
                                </div>
                            );

                        const kindButton = config.headerBtns[btn.direction];

                        if (kindButton)
                            return (
                                <Button
                                    icon={btn.svg}
                                    iconOnly={true}
                                    key={btn.direction}
                                    label={kindButton.label}
                                    onClick={() =>
                                        setBaseDate(kindButton.fn(baseDate, btn.direction.startsWith('<') ? -1 : 1))
                                    }
                                    size="large"
                                    variant="tertiary"
                                />
                            );

                        return null;
                    })}
                </div>
                {config.listBoxHeader}

                <div
                    aria-label={config.label}
                    data-body
                    onKeyDownCapture={handleKeyDown({
                        ArrowDown: handleItemArrows('down'),
                        ArrowUp: handleItemArrows('up'),
                        ArrowLeft: handleItemArrows('left'),
                        ArrowRight: handleItemArrows('right'),
                    })}
                    ref={(node) => {
                        const idToFocus = items.find(({ value: date }) => config.compare(date, baseDate))?.id;
                        node?.querySelector<HTMLElement>(`[id="${idToFocus}"]`)?.focus();
                    }}
                    role="listbox"
                >
                    {items.map(({ value: date, label, id, 'aria-label': ariaLabel }) => {
                        const isSelected = config.compare(date, value);
                        const isActive = config.compare(date, baseDate);
                        const isFocusable = isActive || (!baseDate && isSelected);

                        let btnVariant: ButtonVariant = isActive ? 'secondary' : 'tertiary';
                        if (!config.nextKind && isSelected) btnVariant = 'primary';

                        return (
                            <Button
                                aria-label={ariaLabel}
                                aria-selected={isSelected || undefined}
                                data-active={isActive || undefined}
                                data-non-month-day={
                                    kind === 'day' && date.getMonth() !== baseDate.getMonth() ? true : undefined
                                }
                                id={id}
                                innerRef={(node) => {
                                    if (isFocusable) node?.focus();
                                }}
                                key={date.toString()}
                                label={label}
                                onClick={() => handleItemClick(date)}
                                role="option"
                                size="large"
                                tabIndex={isFocusable ? 0 : -1}
                                variant={btnVariant}
                                width="hug"
                            />
                        );
                    })}
                </div>
            </div>
        </FocusTrap>
    );
}

/** Generates the items (days, months, years) to display based on the grid and the range start and end */
function useItemsAndRange(config: ConfigKind, value: Date, baseId: string) {
    return useMemo(() => {
        const start = config.range.start(value);
        const end = config.range.end(value);
        const nextItems: (ListItemProps & { value: Date })[] = [];

        for (let date = start; date <= end; date = config.incrementFn(date, 1)) {
            const label = format(date, config.formatStr);
            nextItems.push({
                value: date,
                label,
                'aria-label': format(date, config.ariaFormatStr),
                id: `${baseId}-option-${format(date, 'MM-dd-yyyy')}`,
            });
        }

        return { items: nextItems, range: { start, end } };
    }, [config, value, baseId]);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
