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
    isSameDay,
    isSameMonth,
    isSameYear,
    setMonth,
    endOfDecade,
    eachDayOfInterval,
    eachYearOfInterval,
    parse,
    isValid,
} from 'date-fns';
import { ReactNode } from 'react';
import { Button } from '-/components/Button';
import { handleKeyDown } from '-/utils/handleKeyDown';

/**
 * |    << |  <   |    Label    |  >   |  >>   |
 * | ----: | :--: | :---------: | :--: | :---: |
 * | prev2 | prev | headerLabel | next | next2 |
 */
export type Direction = 'next' | 'next2' | 'prev' | 'prev2';

export type Kind = 'day' | 'month' | 'year';

type HeaderButtonProps = {
    label: string;
    incrementFn: (date: Date, amount: number) => Date;
};

export function parseDate(next: string | undefined) {
    // don't allow parsing unless the format is approximately mm/dd/yyyy
    if (!/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(next || '')) return undefined;

    const parsedDate = next ? parse(next, 'MM/dd/yyyy', new Date()) : undefined;

    if (!isValid(parsedDate)) return undefined;

    if (parsedDate && parsedDate.getFullYear() < 100) {
        parsedDate.setFullYear(parsedDate.getFullYear() + 2000);
    }

    return parsedDate;
}

export function optionIdGenerator(baseId: string) {
    return (date: Date) => `${baseId}-option-${format(date, 'MM-dd-yyyy')}`;
}

export type ConfigKind = {
    direction: {
        [key in Direction]?: HeaderButtonProps | null;
    };
    columns: number;
    headerLabel: (activeDate: Date, setKind: (next: Kind) => void) => ReactNode;
    rows: (date: Date) => Date[][];
    compare: (dateLeft: Date, dateRight: Date) => boolean;
    incrementFn: (date: Date, amount: number) => Date;
    tableHeader?: ReactNode;
    optionLabelFormat: string;
    optionAriaLabelFormat: string;
    optionAttributes?: (date: Date, activeDate: Date) => Record<string, unknown>;
    optionOnClick: (params: {
        date: Date;
        setActiveDate: (next: Date) => void;
        onChange: (next: Date) => void;
        setKind: (next: Kind) => void;
    }) => void;
};

function createRows(dates: Date[], columns: number): Date[][] {
    return dates.reduce<Date[][]>((row, item) => {
        const previousRow = row[row.length - 1];
        if (row.length === 0 || previousRow.length === columns) return [...row, [item]];
        previousRow.push(item);
        return row;
    }, []);
}

/**
 * Configuration for each of the calendar picker modes (day, month, year)
 *
 * This helps keep the main component cleaner and easier to read and avoid lots of conditionals.
 */
export const CONFIG: Record<Kind, ConfigKind> = {
    day: {
        direction: {
            prev2: { label: 'Previous Year', incrementFn: addYears },
            prev: { label: 'Previous Month', incrementFn: addMonths },
            next: { label: 'Next Month', incrementFn: addMonths },
            next2: { label: 'Next Year', incrementFn: addYears },
        },
        headerLabel: (activeDate, setKind) => (
            <>
                <Button
                    aria-label={`Change Month, currently ${format(activeDate, 'MMMM')}`}
                    data-month
                    iconOnly
                    label={format(activeDate, 'MMMM')}
                    onClick={() => setKind('month')}
                    size="large"
                    variant="tertiary"
                />
                <Button
                    aria-label={`Change Year, currently ${activeDate.getFullYear()}`}
                    data-year
                    iconOnly
                    label={`${activeDate.getFullYear()}`}
                    onClick={() => setKind('year')}
                    size="large"
                    variant="tertiary"
                />
            </>
        ),
        columns: 7,
        rows: (date: Date) => {
            return createRows(
                eachDayOfInterval({
                    start: startOfWeek(startOfMonth(date), { weekStartsOn: 0 }),
                    end: endOfWeek(endOfMonth(date), { weekStartsOn: 0 }),
                }),
                7,
            );
        },
        compare: isSameDay,
        incrementFn: addDays,
        tableHeader: (
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
        ),
        optionLabelFormat: 'd',
        optionAriaLabelFormat: 'do MMMM yyyy',
        optionAttributes: (date: Date, activeDate: Date) => ({
            'data-non-month-day': date.getMonth() !== activeDate.getMonth() ? true : undefined,
        }),
        optionOnClick: ({ date, onChange }) => onChange(date),
    },
    month: {
        direction: {
            prev: { label: 'Previous Year', incrementFn: addYears },
            prev2: null,
            next2: null,
            next: { label: 'Next Year', incrementFn: addYears },
        },
        headerLabel: (activeDate, setKind) => (
            <Button
                aria-label={`Change Year, currently ${activeDate.getFullYear()}`}
                iconOnly
                label={`${activeDate.getFullYear()}`}
                onClick={() => setKind('year')}
                size="large"
                variant="tertiary"
            />
        ),
        columns: 3,
        rows: (date: Date) => {
            // 12 months, 3 columns
            return createRows(
                Array.from({ length: 12 }, (_, i) => setMonth(date, i)),
                3,
            );
        },
        incrementFn: addMonths,
        compare: isSameMonth,
        optionLabelFormat: 'MMM',
        optionAriaLabelFormat: 'MMMM yyyy',
        optionOnClick: ({ date, setActiveDate, setKind }) => {
            setActiveDate(date);
            setKind('day');
        },
    },
    year: {
        direction: {
            prev: { label: 'Earlier Years', incrementFn: (d) => addYears(d, -10) },
            prev2: null,
            next2: null,
            next: { label: 'Later Years', incrementFn: (d) => addYears(d, 10) },
        },
        headerLabel: (activeDate, setKind) => {
            const startYear = startOfDecade(activeDate).getFullYear();
            const endYear = endOfDecade(activeDate).getFullYear();

            return (
                <Button
                    aria-label={`Change Decade, currently ${startYear} to ${endYear}`}
                    iconOnly
                    label={`${startYear - 1} - ${endYear + 10}`}
                    onClick={() => setKind('year')}
                    size="large"
                    variant="tertiary"
                />
            );
        },
        columns: 4,
        rows: (date: Date) => {
            return createRows(
                eachYearOfInterval({
                    start: addYears(startOfDecade(date), -1),
                    end: addYears(endOfDecade(date), 1),
                }),
                4,
            );
        },
        compare: isSameYear,
        incrementFn: addYears,
        optionLabelFormat: 'yyyy',
        optionAriaLabelFormat: 'yyyy',
        optionOnClick: ({ date, setActiveDate, setKind }) => {
            setActiveDate(date);
            setKind('month');
        },
    },
};

export const useKeyDownCaptures = ({
    config,
    activeDate,
    setActiveDate,
    rows,
}: {
    config: ConfigKind;
    activeDate: Date;
    setActiveDate: (date: Date) => void;
    rows: Date[][];
}) => {
    const handleItemArrows = (direction: 'down' | 'left' | 'right' | 'up') => () => {
        // Determine the direction and amount to move the base date
        // down/right is positive, up/left is negative
        const multiplier = direction === 'down' || direction === 'right' ? 1 : -1;
        // Moving left/right moves one increment, moving up/down moves the number of columns
        // (e.g. in day mode, left/right moves one day, up/down moves 7 days)
        // In month mode, left/right moves one month, up/down moves 3 months
        // In year mode, left/right moves one year, up/down moves 4 years
        // This is determined by the number of columns in the grid for each mode
        const amount = direction === 'left' || direction === 'right' ? 1 : config.columns;
        const next = config.incrementFn(activeDate, amount * multiplier);
        setActiveDate(next);
    };

    const enterSpaceHandler = (event: React.KeyboardEvent) => {
        const target = event.target as HTMLElement;
        if (target.nodeName === 'TD') target.click();
    };

    return {
        handleKeyDownCapture: handleKeyDown(
            {
                ArrowDown: handleItemArrows('down'),
                ArrowUp: handleItemArrows('up'),
                ArrowLeft: handleItemArrows('left'),
                ArrowRight: handleItemArrows('right'),
                End: () => {
                    const currentRow = rows.find((r) => r.some((d) => config.compare(d, activeDate)));
                    if (!currentRow) return;
                    const next = currentRow[currentRow.length - 1];
                    setActiveDate(next);
                },
                Home: () => {
                    const currentRow = rows.find((r) => r.some((d) => config.compare(d, activeDate)));
                    if (!currentRow) return;
                    const next = currentRow[0];
                    setActiveDate(next);
                },
                PageDown: () => {
                    const next = config.direction.next?.incrementFn(activeDate, 1);
                    if (next) setActiveDate(next);
                },
                PageUp: () => {
                    const next = config.direction.prev?.incrementFn(activeDate, -1);
                    if (next) setActiveDate(next);
                },
                Space: enterSpaceHandler,
                Enter: enterSpaceHandler,
            },
            {
                preventDefault: true,
                stopPropagation: true,
            },
        ),
    };
};

export const HEADER_DIRECTION_ICONS: Record<Direction, ReactNode> = {
    prev: <SvgChevronLeft />,
    prev2: <SvgKeyboardDoubleArrowLeft />,
    next: <SvgChevronRight />,
    next2: <SvgKeyboardDoubleArrowRight />,
};

export function HeaderButton({
    direction,
    header,
    setActiveDate,
    activeDate,
}: {
    direction: Direction;
    header: ConfigKind['direction'][Direction];
    setActiveDate: (date: Date) => void;
    activeDate: Date;
}) {
    return (
        header && (
            <Button
                icon={HEADER_DIRECTION_ICONS[direction]}
                iconOnly={true}
                key={direction}
                label={header.label}
                onClick={() => setActiveDate(header.incrementFn(activeDate, direction.startsWith('prev') ? -1 : 1))}
                size="large"
                variant="tertiary"
            />
        )
    );
}
