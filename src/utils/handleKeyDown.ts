import { KeyboardEventCode } from './keyboard';

export type KeysCallback = Partial<Record<KeyboardEventCode | '*', (event: React.KeyboardEvent) => void>>;

/**
 * Handles multiple keydown events with specific callbacks for each key.
 *
 * @param keysCallback - An object where keys are keyboard event codes and values are callback functions.
 * @returns A function that can be used as an event handler for keydown events.
 */
export function handleKeyDown(
    keysCallback: KeysCallback,
    { stopPropagation = false, preventDefault = false }: { stopPropagation?: boolean; preventDefault?: boolean } = {},
) {
    return (event: React.KeyboardEvent) => {
        const callback = keysCallback[event.code as KeyboardEventCode] || keysCallback['*'];
        if (callback) {
            callback(event);
            if (stopPropagation) event.stopPropagation();
            if (preventDefault) event.preventDefault();
        }
        return callback ? (event.code as KeyboardEventCode | '*') : null;
    };
}
