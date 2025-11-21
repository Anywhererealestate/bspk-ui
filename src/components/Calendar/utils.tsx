import { addDays, addMonths, format, isSameDay, parse, isValid } from 'date-fns';
import { handleKeyDown } from '-/utils/handleKeyDown';

export const COLUMNS_COUNT = 7;

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

type Direction = 'down' | 'left' | 'right' | 'up';

const DIRECTION_INCREMENT: Record<Direction, number> = {
    // same day next week
    down: 1 * COLUMNS_COUNT,
    // next day
    right: 1,
    // same day previous week
    up: -1 * COLUMNS_COUNT,
    // previous day
    left: -1,
};

export const useKeyDownCaptures = ({
    activeDate,
    setActiveDate,
    rows,
    focusActiveDay,
}: {
    activeDate: Date;
    setActiveDate: (date: Date) => void;
    rows: Date[][];
    focusActiveDay: () => void;
}) => {
    const handleItemArrows = (direction: Direction) => () => {
        const next = addDays(activeDate, DIRECTION_INCREMENT[direction]);
        setActiveDate(next);
        focusActiveDay();
    };

    const handleEnterOrSpace = (event: React.KeyboardEvent) => {
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
                    const next = rows.find((r) => r.some((d) => isSameDay(d, activeDate)))?.[COLUMNS_COUNT - 1];
                    if (!next || isSameDay(next, activeDate)) return;

                    setActiveDate(next);
                    focusActiveDay();
                },
                Home: () => {
                    const next = rows.find((r) => r.some((d) => isSameDay(d, activeDate)))?.[0];
                    if (!next || isSameDay(next, activeDate)) return;

                    setActiveDate(next);
                    focusActiveDay();
                },
                PageDown: () => {
                    setActiveDate(addMonths(activeDate, 1));
                    focusActiveDay();
                },
                PageUp: () => {
                    setActiveDate(addMonths(activeDate, -1));
                    focusActiveDay();
                },
                Space: handleEnterOrSpace,
                Enter: handleEnterOrSpace,
            },
            {
                preventDefault: true,
                stopPropagation: true,
            },
        ),
    };
};
