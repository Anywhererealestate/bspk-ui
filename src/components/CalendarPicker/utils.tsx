import { SvgChevronLeft } from '@bspk/icons/ChevronLeft';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgKeyboardDoubleArrowLeft } from '@bspk/icons/KeyboardDoubleArrowLeft';
import { SvgKeyboardDoubleArrowRight } from '@bspk/icons/KeyboardDoubleArrowRight';
import {
    format,
    addDays,
    addMonths,
    addYears,
    endOfMonth,
    endOfWeek,
    startOfDecade,
    startOfMonth,
    startOfWeek,
    isSameDay,
    isSameMonth,
    isSameYear,
    setMonth,
    endOfDecade,
    setYear,
} from 'date-fns';
import { useMemo, KeyboardEvent, ReactNode, useRef } from 'react';
import { Button } from '-/components/Button';
import { ListItemProps } from '-/components/ListItem';
import { useMutationObserver } from '-/hooks/useMutationObserver';
import { DataProps } from '-/types/common';
import { handleKeyDown } from '-/utils/handleKeyDown';

export type Direction = '<' | '<<' | '>' | '>>';
export type Kind = 'day' | 'month' | 'year';

export const HEADER_DIRECTION_ICONS: Record<Direction, ReactNode> = {
    '<': <SvgChevronLeft />,
    '<<': <SvgKeyboardDoubleArrowLeft />,
    '>': <SvgChevronRight />,
    '>>': <SvgKeyboardDoubleArrowRight />,
};

export type ConfigKind = {
    header: Record<
        Direction,
        {
            label: string;
            incrementFn: (date: Date, amount: number) => Date;
        } | null
    > & {
        label: (activeDate: Date, setKind: (next: Kind) => void) => ReactNode;
    };
    columns: number;
    range: {
        start: (date: Date) => Date;
        end: (date: Date) => Date;
    };
    isSame: (dateLeft: Date, dateRight: Date) => boolean;
    incrementFn: (date: Date, amount: number) => Date;
    gridLabel: string;
    gridHeaderRow?: ReactNode;
    ariaFormatStr: string;
    cellFormatStr: string;
    cellProps?: (params: { activeDate: Date; date: Date }) => DataProps;
};

/**
 * Configuration for each of the calendar picker modes (day, month, year)
 *
 * This helps keep the main component cleaner and easier to read and avoid lots of conditionals.
 */
export const CONFIG: Record<Kind, ConfigKind> = {
    day: {
        header: {
            '<<': { label: 'Previous Year', incrementFn: addYears },
            '<': { label: 'Previous Month', incrementFn: addMonths },
            label: (activeDate, setKind) => (
                <>
                    <Button
                        aria-label={`Change Month, currently ${format(activeDate, 'MMMM')}`}
                        data-header-button="month"
                        data-month
                        iconOnly
                        label={format(activeDate, 'MMMM')}
                        onClick={() => setKind('month')}
                        size="large"
                        variant="tertiary"
                    />{' '}
                    <Button
                        aria-label={`Change Year, currently ${activeDate.getFullYear()}`}
                        data-header-button="year"
                        iconOnly
                        label={`${activeDate.getFullYear()}`}
                        onClick={() => setKind('year')}
                        size="large"
                        variant="tertiary"
                    />
                </>
            ),
            '>': { label: 'Next Month', incrementFn: addMonths },
            '>>': { label: 'Next Year', incrementFn: addYears },
        },
        columns: 7,
        range: {
            start: (date: Date) => startOfWeek(startOfMonth(date), { weekStartsOn: 0 }),
            end: (date: Date) => endOfWeek(endOfMonth(date), { weekStartsOn: 0 }),
        },
        isSame: isSameDay,
        incrementFn: addDays,
        cellFormatStr: 'd',
        gridLabel: 'Select Date',
        ariaFormatStr: 'do MMMM yyyy',
        gridHeaderRow: (
            <div data-header-row data-row role="row">
                <span aria-label="Sunday" role="columnheader">
                    Sun
                </span>
                <span aria-label="Monday" role="columnheader">
                    Mon
                </span>
                <span aria-label="Tuesday" role="columnheader">
                    Tue
                </span>
                <span aria-label="Wednesday" role="columnheader">
                    Wed
                </span>
                <span aria-label="Thursday" role="columnheader">
                    Thu
                </span>
                <span aria-label="Friday" role="columnheader">
                    Fri
                </span>
                <span aria-label="Saturday" role="columnheader">
                    Sat
                </span>
            </div>
        ),
        cellProps: ({ date, activeDate }) => ({
            'data-non-month-day': date.getMonth() !== activeDate.getMonth() ? 'true' : undefined,
        }),
    },
    month: {
        header: {
            '<': { label: 'Previous Year', incrementFn: addYears },
            '<<': null,
            label: (activeDate, setKind) => (
                <Button
                    aria-label={`Change Year, currently ${activeDate.getFullYear()}`}
                    data-header-button="year"
                    iconOnly
                    label={`${activeDate.getFullYear()}`}
                    onClick={() => setKind('year')}
                    size="large"
                    variant="tertiary"
                />
            ),
            '>>': null,
            '>': { label: 'Next Year', incrementFn: addYears },
        },
        columns: 3,
        range: {
            start: (date: Date) => setMonth(date, 0),
            end: (date: Date) => setMonth(date, 11),
        },
        incrementFn: addMonths,
        isSame: isSameMonth,
        cellFormatStr: 'MMM',
        gridLabel: 'Select Month',
        ariaFormatStr: 'MMMM yyyy',
    },
    year: {
        header: {
            '<': { label: 'Earlier Years', incrementFn: (d) => addYears(d, -10) },
            '<<': null,
            label: (activeDate, setKind) => (
                <Button
                    aria-label={`Change Decade, currently ${startOfDecade(activeDate).getFullYear()} to ${endOfDecade(
                        activeDate,
                    ).getFullYear()}`}
                    data-header-button="decade"
                    iconOnly
                    label={`${startOfDecade(activeDate).getFullYear() - 1} - ${startOfDecade(activeDate).getFullYear() + 10}`}
                    onClick={() => setKind('year')}
                    size="large"
                    variant="tertiary"
                />
            ),
            '>>': null,
            '>': { label: 'Later Years', incrementFn: (d) => addYears(d, 10) },
        },
        columns: 4,
        range: {
            start: (date: Date) => setYear(date, startOfDecade(date).getFullYear() - 1),
            end: (date: Date) => setYear(date, endOfDecade(date).getFullYear() + 1),
        },
        isSame: isSameYear,
        incrementFn: addYears,
        cellFormatStr: 'yyyy',
        gridLabel: 'Select Year',
        ariaFormatStr: 'yyyy',
    },
};

export function generateItemId(baseId: string, date: Date) {
    return `${baseId}-option-${format(date, 'MM-dd-yyyy')}`;
}

export type Item = ListItemProps & { value: Date };

/** Generates the items (days, months, years) to display based on the grid and the range start and end */
export function useRows(config: ConfigKind, value: Date, baseId: string) {
    return useMemo(() => {
        const start = config.range.start(value);
        const end = config.range.end(value);
        const nextRows: Item[][] = [];

        for (
            let date = start, rowIndex = 0, colIndex = 0;
            date <= end;
            date = config.incrementFn(date, 1), colIndex++
        ) {
            if (colIndex >= config.columns) {
                colIndex = 0;
                rowIndex++;
            }
            const label = format(date, config.cellFormatStr);
            const item: Item = {
                value: date,
                label,
                'aria-label': format(date, config.ariaFormatStr),
                id: generateItemId(baseId, date),
            };
            if (!nextRows[rowIndex]) nextRows[rowIndex] = [];
            nextRows[rowIndex].push(item);
        }

        return nextRows;
    }, [config, value, baseId]);
}

export const useKeyDownCaptures = ({
    config,
    activeDate,
    setActiveDate,
}: {
    config: ConfigKind;
    activeDate: Date;
    setActiveDate: (date: Date) => void;
}) => {
    const handleItemArrows = (direction: 'down' | 'left' | 'right' | 'up') => (event: KeyboardEvent) => {
        event.preventDefault();
        const amount = {
            down: config.columns,
            up: config.columns * -1,
            left: -1,
            right: 1,
        }[direction];
        setActiveDate(config.incrementFn(activeDate, amount));
    };

    return {
        handleKeyDownCapture: handleKeyDown({
            ArrowDown: handleItemArrows('down'),
            ArrowUp: handleItemArrows('up'),
            ArrowLeft: handleItemArrows('left'),
            ArrowRight: handleItemArrows('right'),
        }),
    };
};

export function HeaderButton({
    direction,
    config,
    setActiveDate,
    activeDate: activeDate,
}: {
    direction: Direction;
    config: ConfigKind['header'][Direction];
    setActiveDate: (date: Date) => void;
    activeDate: Date;
}) {
    return (
        config && (
            <Button
                icon={HEADER_DIRECTION_ICONS[direction]}
                iconOnly={true}
                key={direction}
                label={config.label}
                onClick={() => setActiveDate(config.incrementFn(activeDate, direction.startsWith('<') ? -1 : 1))}
                size="large"
                variant="tertiary"
            />
        )
    );
}

export function useFocusNext() {
    const gridRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const focusNext = useRef<Kind | 'init' | null>('init');

    const setFocusNext = (next: Kind | null) => (focusNext.current = next);

    useMutationObserver(
        gridRef.current,
        () => {
            if (!focusNext.current) return;

            let elementToFocus = headerRef.current?.querySelector<HTMLElement>(
                `[data-header-button="${focusNext.current}"]`,
            );

            if (focusNext.current === 'day' || focusNext.current === 'init')
                elementToFocus = gridRef.current?.querySelector<HTMLElement>('[tabindex="0"]');

            if (focusNext.current === 'init' && !elementToFocus) return;

            elementToFocus?.focus();
            focusNext.current = null;
        },
        {
            childList: true,
            subtree: true,
        },
    );

    return { setFocusNext, gridRef, headerRef };
}
