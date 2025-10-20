import { format, parse } from 'date-fns';

export const MINUTE_OPTIONS = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
export const HOUR_OPTIONS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
export const MERIDIEM_OPTIONS = ['AM', 'PM'];

export type Meridiem = 'AM' | 'PM';

export function stringValueToParts(timeString: string) {
    // Parse the 24-hour time string into a Date object
    // 'HH:mm' is the format for 24-hour time (e.g., '14:30')
    // new Date() provides a base date for parsing, which is necessary
    // but the date part won't affect the time parsing here.
    const dateObj = parse(timeString, 'HH:mm', new Date());

    // Extract hours, minutes, and AM/PM using format
    return {
        hours: format(dateObj, 'hh') || undefined,
        minutes: format(dateObj, 'mm') || undefined,
        meridiem: format(dateObj, 'a') as Meridiem,
        str: timeString,
    };
}

export function partsToStringValue(hours: string | undefined, minutes: string | undefined, meridiem: Meridiem): string {
    if (typeof hours === 'undefined' || typeof minutes === 'undefined') {
        return '';
    }

    const minutesNumber = Number(minutes);

    let hours24 = Number(hours);
    if (meridiem === 'PM' && hours24 < 12) {
        hours24 += 12;
    } else if (meridiem === 'AM' && hours24 === 12) {
        hours24 = 0;
    }

    // Format the date object back to a 24-hour time string
    return `${hours24.toString().padStart(2, '0')}:${minutesNumber.toString().padStart(2, '0')}`;
}
