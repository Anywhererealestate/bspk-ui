/**
 * Returns a random integer between min and max (inclusive).
 *
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @returns A random integer between min and max.
 */
export function randomNumber(min = 0, max = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random string of alphanumeric characters.
 *
 * @param length - The length of the random ID to generate.
 * @returns A random string of the specified length containing alphanumeric characters.
 */
export function randomString(length: number = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const rand = new Uint32Array(length);
    window.crypto.getRandomValues(rand);
    for (let i = 0; i < length; i++) result += chars[rand[i] % chars.length];
    return result;
}
