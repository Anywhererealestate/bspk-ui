import { parse, isValid } from 'date-fns';

interface ParsedDateResult {
    formatted: string;
    date: Date | null;
}

/**
 * Parses and formats a date string in MM/dd/yyyy format as the user types. Returns both the formatted string and the
 * valid Date object (if complete).
 *
 * @param input - The raw user input.
 * @returns An object with formatted string and valid Date (if complete).
 */
export function parseAndFormatTypedDate(input: string, isDelete: boolean): ParsedDateResult {
    const cleaned = input.replace(/[^\d/]/g, '');

    let formatted = cleaned;
    let date: Date | null = null;

    if (!isDelete) {
        if (formatted.length === 2) {
            formatted += '/';
        } else if (formatted.length === 5) {
            formatted += '/';
        }
    }

    if (formatted.length === 10) {
        const parsedDate = parse(formatted, 'MM/dd/yyyy', new Date());
        if (isValid(parsedDate)) {
            date = parsedDate;
        }
    }

    return { formatted, date };
}
