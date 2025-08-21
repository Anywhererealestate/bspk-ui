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
export function parseAndFormatTypedDate(input: string): ParsedDateResult {
    const cleaned = input.replace(/[^\d]/g, '');

    let formatted = '';
    let date: Date | null = null;

    if (cleaned.length >= 1) {
        formatted += cleaned.substring(0, 2); // MM
    }
    if (cleaned.length >= 3) {
        formatted += `/${cleaned.substring(2, 4)}`; // DD
    }
    if (cleaned.length >= 5) {
        formatted += `/${cleaned.substring(4, 8)}`; // YYYY
    }

    if (cleaned.length === 8) {
        const parsedDate = parse(formatted, 'MM/dd/yyyy', new Date());
        if (isValid(parsedDate)) {
            date = parsedDate;
        }
    }

    return { formatted, date };
}
