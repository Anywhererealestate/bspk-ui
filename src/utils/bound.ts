/**
 * A utility function to bound a number within a specified range. Allows for rollover behavior.
 *
 * @param params
 * @param params.num The number to bound, can be a number, string, or undefined
 * @param params.max The maximum value the number can be
 * @param params.min The minimum value the number can be
 * @param params.rollover If true, the number will wrap around when it exceeds the bounds
 * @param params.defaultValue The default value to return if the input is invalid or undefined
 * @returns The bounded number
 */
export function bound({
    num,
    max,
    min,
    rollover = false,
    defaultValue = min,
}: {
    num: number | string | undefined;
    max: number;
    min: number;
    rollover?: boolean;
    defaultValue?: number;
}): number {
    const parsedNum = typeof num === 'number' ? num : parseInt(num as string, 10);
    if (isNaN(parsedNum)) return defaultValue ?? min;
    if (parsedNum > max) return rollover ? min : max;
    if (parsedNum < min) return rollover ? max : min;
    return parsedNum;
}
