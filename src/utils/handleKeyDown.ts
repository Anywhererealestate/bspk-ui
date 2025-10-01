import { KeyboardEventCode } from './keyboard';

type SuppportedKeys =
    | KeyboardEventCode
    | `Alt${KeyboardEventCode}`
    | `Control${KeyboardEventCode}`
    | `Shift${KeyboardEventCode}`;

export type KeyCallbacks = Partial<Record<SuppportedKeys, ((event: React.KeyboardEvent) => void) | null>>;

/**
 * Handles multiple keydown events with specific callbacks for each key.
 *
 * Also supports modifier keys (Shift, Control, Alt) by prefixing the key code with the modifier name (e.g.,
 * 'ShiftArrowDown', 'ControlKeyK', 'AltEnter').
 *
 * @param keysCallback - An object where keys are keyboard event codes and values are callback functions.
 * @returns A function that can be used as an event handler for keydown events.
 */
export function handleKeyDown(
    keysCallback: KeyCallbacks = {},
    { stopPropagation = false, preventDefault = false }: { stopPropagation?: boolean; preventDefault?: boolean } = {},
) {
    return (event: React.KeyboardEvent) => {
        const codes = [] as KeyboardEventCode[];
        if (event.shiftKey) codes.push(`Shift${event.code}` as KeyboardEventCode);
        if (event.ctrlKey) codes.push(`Control${event.code}` as KeyboardEventCode);
        if (event.altKey) codes.push(`Alt${event.code}` as KeyboardEventCode);
        codes.push(event.code as KeyboardEventCode);

        const matchingKey = codes.find((code) => keysCallback[code]);
        const callback = matchingKey ? keysCallback[matchingKey] : null;

        if (callback) {
            callback(event);
            if (stopPropagation) event.stopPropagation();
            if (preventDefault) event.preventDefault();
        }
        return callback ? (event.code as KeyboardEventCode) : null;
    };
}
