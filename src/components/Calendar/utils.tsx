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

export const useKeyDownCaptures = ({
    activeDate,
    setActiveDate,
    rows,
}: {
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
        const amount = direction === 'left' || direction === 'right' ? 1 : COLUMNS_COUNT;
        const next = addDays(activeDate, amount * multiplier);
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
                    const next = rows.find((r) => r.some((d) => isSameDay(d, activeDate)))?.[COLUMNS_COUNT - 1];
                    if (next) setActiveDate(next);
                },
                Home: () => {
                    const next = rows.find((r) => r.some((d) => isSameDay(d, activeDate)))?.[0];
                    if (next) setActiveDate(next);
                },
                PageDown: () => setActiveDate(addMonths(activeDate, 1)),
                PageUp: () => setActiveDate(addMonths(activeDate, -1)),
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
