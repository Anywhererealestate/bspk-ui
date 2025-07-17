import { KeyboardEventCode } from './keyboard';

/**
 * Handles keydown events for specified keys and executes a callback if the key is pressed.
 *
 * @param keys - An array of keyboard event codes to listen for.
 * @param callback - An optional callback function to execute when one of the specified keys is pressed.
 * @returns A function that can be used as an event handler for keydown events.
 */
export function handleKeydown(
    keys: KeyboardEventCode[],
    callback?: (event?: React.KeyboardEvent) => void,
): (event: React.KeyboardEvent) => void {
    return (event: React.KeyboardEvent) => {
        if (keys.includes(event.code as KeyboardEventCode)) {
            event.preventDefault();
            callback?.(event);
        }
    };
}
