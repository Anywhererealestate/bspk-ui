import './calendar-picker.scss';
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
import { useMemo, useState, KeyboardEvent, ReactNode, useEffect } from 'react';
import { Button, ButtonProps } from '-/components/Button';
import { ListItemProps } from '-/components/ListItem';
import { useId } from '-/hooks/useId';
import { getElementById } from '-/utils/dom';
import { handleKeyDown } from '-/utils/handleKeyDown';

type Direction = '<' | '<<' | '>' | '>>';
type Kind = 'day' | 'month' | 'year';

type ConfigKind = {
    header: Record<
        Direction,
        {
            label: string;
            incrementFn: (date: Date, amount: number) => Date;
        } | null
    > & {
        label: (baseDate: Date, setKind: (next: Kind) => void) => ReactNode;
    };
    columns: number;
    range: {
        start: (date: Date) => Date;
        end: (date: Date) => Date;
    };
    compare: (dateLeft: Date, dateRight: Date) => boolean;
    incrementFn: (date: Date, amount: number) => Date;
    optionFormatStr: string;
    listboxLabel: string;
    listBoxHeader?: ReactNode;
    ariaFormatStr: string;
    optionProps?: (params: {
        baseDate: Date;
        date: Date;
        isActive: boolean;
        isSelected: boolean;
        onChange: (next: Date) => void;
        setBaseDate: (next: Date) => void;
        setKind: (next: Kind) => void;
    }) => Partial<ButtonProps>;
};

/**
 * Configuration for each of the calendar picker modes (day, month, year)
 *
 * This helps keep the main component cleaner and easier to read and avoid lots of conditionals.
 */
const CONFIG: Record<Kind, ConfigKind> = {
    day: {
        header: {
            '<<': { label: 'Previous Year', incrementFn: addYears },
            '<': { label: 'Previous Month', incrementFn: addMonths },
            label: (baseDate, setKind) => (
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
            '>': { label: 'Next Month', incrementFn: addMonths },
            '>>': { label: 'Next Year', incrementFn: addYears },
        },
        columns: 7,
        range: {
            start: (date: Date) => startOfWeek(startOfMonth(date), { weekStartsOn: 0 }),
            end: (date: Date) => endOfWeek(endOfMonth(date), { weekStartsOn: 0 }),
        },
        compare: isSameDay,
        incrementFn: addDays,
        optionFormatStr: 'd',
        listboxLabel: 'Select Date',
        ariaFormatStr: 'do MMMM yyyy',
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
        optionProps: ({ date, baseDate, isSelected, setBaseDate, onChange, isActive }) => ({
            'data-non-month-day': date.getMonth() !== baseDate.getMonth() ? true : undefined,
            onClick: () => {
                setBaseDate(date);
                onChange(date);
            },
            variant: isSelected ? 'primary' : isActive ? 'secondary' : 'tertiary',
        }),
    },
    month: {
        header: {
            '<': { label: 'Previous Year', incrementFn: addYears },
            '<<': null,
            label: (baseDate, setKind) => (
                <Button
                    aria-label={`Change Year, currently ${baseDate.getFullYear()}`}
                    iconOnly
                    label={`${baseDate.getFullYear()}`}
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
        compare: isSameMonth,
        optionFormatStr: 'MMM',
        listboxLabel: 'Select Month',
        ariaFormatStr: 'MMMM yyyy',
        optionProps: ({ date, setBaseDate, setKind, isActive }) => ({
            onClick: () => {
                setBaseDate(date);
                setKind('day');
            },
            variant: isActive ? 'secondary' : 'tertiary',
        }),
    },
    year: {
        header: {
            '<': { label: 'Earlier Years', incrementFn: (d) => addYears(d, -10) },
            '<<': null,
            label: (baseDate, setKind) => (
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
            '>>': null,
            '>': { label: 'Later Years', incrementFn: (d) => addYears(d, 10) },
        },
        columns: 4,
        range: {
            start: (date: Date) => addYears(startOfDecade(date), -1),
            end: (date: Date) => addYears(endOfDecade(date), 1),
        },
        compare: isSameYear,
        incrementFn: addYears,
        optionFormatStr: 'yyyy',
        listboxLabel: 'Select Year',
        ariaFormatStr: 'yyyy',
        optionProps: ({ date, setBaseDate, setKind, isActive }) => ({
            onClick: () => {
                setBaseDate(date);
                setKind('month');
            },
            variant: isActive ? 'secondary' : 'tertiary',
        }),
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

    const { handleKeyDownCapture } = useKeyDownCaptures({ config, baseDate, setBaseDate });

    return (
        <FocusTrap
            focusTrapOptions={{
                initialFocus: false,
                escapeDeactivates: true,
                clickOutsideDeactivates: true,
                fallbackFocus: () => {
                    const idToFocus = items.find(({ value: date }) => config.compare(date, baseDate))?.id;
                    return getElementById(idToFocus)!;
                },
            }}
        >
            <div data-bspk="calendar-picker" data-kind={kind} data-variant={variant || 'flat'}>
                <div data-header>
                    <HeaderButton
                        baseDate={baseDate}
                        config={config.header['<<']}
                        direction="<<"
                        setBaseDate={setBaseDate}
                    />
                    <HeaderButton
                        baseDate={baseDate}
                        config={config.header['<']}
                        direction="<"
                        setBaseDate={setBaseDate}
                    />
                    <span data-title>{config.header.label(baseDate, setKind)}</span>
                    <HeaderButton
                        baseDate={baseDate}
                        config={config.header['>']}
                        direction=">"
                        setBaseDate={setBaseDate}
                    />
                    <HeaderButton
                        baseDate={baseDate}
                        config={config.header['>>']}
                        direction=">>"
                        setBaseDate={setBaseDate}
                    />
                </div>
                {config.listBoxHeader}
                <div
                    aria-label={config.listboxLabel}
                    data-body
                    onKeyDownCapture={handleKeyDownCapture}
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
                        return (
                            <Button
                                aria-label={ariaLabel}
                                aria-selected={isSelected || undefined}
                                data-active={isActive || undefined}
                                id={id}
                                innerRef={(node) => {
                                    if (isFocusable) node?.focus();
                                }}
                                key={date.toString()}
                                label={label}
                                role="option"
                                size="large"
                                tabIndex={isFocusable ? 0 : -1}
                                width="hug"
                                {...config.optionProps?.({
                                    date,
                                    baseDate,
                                    isSelected,
                                    isActive,
                                    setBaseDate,
                                    onChange,
                                    setKind,
                                })}
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
            const label = format(date, config.optionFormatStr);
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

const useKeyDownCaptures = ({
    config,
    baseDate,
    setBaseDate,
}: {
    config: ConfigKind;
    baseDate: Date;
    setBaseDate: (date: Date) => void;
}) => {
    const handleItemArrows = (direction: 'down' | 'left' | 'right' | 'up') => (event: KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
        // Determine the direction and amount to move the base date
        // down/right is positive, up/left is negative
        const multiplier = direction === 'down' || direction === 'right' ? 1 : -1;
        // Moving left/right moves one increment, moving up/down moves the number of columns
        // (e.g. in day mode, left/right moves one day, up/down moves 7 days)
        // In month mode, left/right moves one month, up/down moves 3 months
        // In year mode, left/right moves one year, up/down moves 4 years
        // This is determined by the number of columns in the grid for each mode
        const amount = direction === 'left' || direction === 'right' ? 1 : config.columns;
        const next = config.incrementFn(baseDate, amount * multiplier);
        setBaseDate(next);
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

const HEADER_DIRECTION_ICONS: Record<Direction, ReactNode> = {
    '<': <SvgChevronLeft />,
    '<<': <SvgKeyboardDoubleArrowLeft />,
    '>': <SvgChevronRight />,
    '>>': <SvgKeyboardDoubleArrowRight />,
};

// eslint-disable-next-line react/no-multi-comp
function HeaderButton({
    direction,
    config,
    setBaseDate,
    baseDate,
}: {
    direction: Direction;
    config: ConfigKind['header'][Direction];
    setBaseDate: (date: Date) => void;
    baseDate: Date;
}) {
    return (
        config && (
            <Button
                icon={HEADER_DIRECTION_ICONS[direction]}
                iconOnly={true}
                key={direction}
                label={config.label}
                onClick={() => setBaseDate(config.incrementFn(baseDate, direction.startsWith('<') ? -1 : 1))}
                size="large"
                variant="tertiary"
            />
        )
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
