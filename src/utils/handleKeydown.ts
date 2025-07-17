import { KeyboardEventCode } from './keyboard';

/**
 * Handles multiple keydown events with specific callbacks for each key.
 *
 * @param keysCallback - An object where keys are keyboard event codes and values are callback functions.
 * @returns A function that can be used as an event handler for keydown events.
 */
export function handleKeyDown(keysCallback: Partial<Record<KeyboardEventCode, (event: React.KeyboardEvent) => void>>) {
    return (event: React.KeyboardEvent) => {
        const callback = keysCallback[event.code as KeyboardEventCode];
        callback?.(event);
        return !!callback;
    };
}
