/**
 * ERROR LOGGING
 *
 * When an error is logged it is stored in a buffer.
 *
 * After a debounce period all errors are merged and of they no longer exist are cleared.
 *
 * These errors are grouped by contextId and dispatched as a custom event.
 *
 * At this point the buffer is cleared.
 */

import { createContext, useContext, useEffect, useState } from 'react';

export type ErrorDetail = {
    message: string;
    data?: unknown;
    contextId?: string;
    location: Location;
    exists: boolean;
};

export const bspkErrorType = (contextId: string) => `bspk-error-${contextId}`;

export type LogError = (exists: boolean, message: string, data?: unknown) => boolean;

let logBuffer: Record<string, ErrorDetail[]> = {};
let logDebounce: ReturnType<typeof setTimeout> | null = null;

export function logError(detail: Pick<ErrorDetail, 'contextId' | 'data' | 'exists' | 'message'>): boolean {
    if (!detail.contextId) return detail.exists;

    const bufferKey = `${detail.contextId}-${detail.message}`;

    logBuffer[bufferKey] = logBuffer[bufferKey] || [];
    logBuffer[bufferKey].push({ ...detail, location: document.location });

    if (logDebounce) clearTimeout(logDebounce);

    logDebounce = setTimeout(() => {
        const contextErrors: Record<string, ErrorDetail[]> = {};

        Object.values(logBuffer).flatMap((siblingErrors) => {
            const lastSiblingError = siblingErrors[siblingErrors.length - 1];

            const nextErrors = lastSiblingError.exists ? [lastSiblingError] : [];

            if (lastSiblingError.contextId) {
                // we send all errors to the contextId even if they are empty so we can clear the errors
                contextErrors[lastSiblingError.contextId] = contextErrors[lastSiblingError.contextId] || [];
                contextErrors[lastSiblingError.contextId].push(...nextErrors);
            } else if (nextErrors.length) {
                // eslint-disable-next-line no-console
                nextErrors.forEach((e) => console.error(e));
            }
        });

        logBuffer = {};

        Object.entries(contextErrors).forEach(([contextId, errors]) => {
            globalThis.dispatchEvent(new CustomEvent(bspkErrorType(contextId), { detail: errors }));
        });
    }, 500);

    return detail.exists;
}

export const errorContext = createContext(undefined as string | undefined);

export function useErrorLogger(): {
    logError: LogError;
} {
    const contextId = useContext(errorContext);

    return {
        logError: (exists: boolean, message: string, data?: unknown) => logError({ exists, contextId, message, data }),
    };
}

export function useErrorLog() {
    const [errors, setErrors] = useState<ErrorDetail[]>([]);
    const contextId = useContext(errorContext);

    useEffect(() => {
        if (!contextId) return;

        const listener = (e: Event) => {
            const event = e as CustomEvent<ErrorDetail[]>;
            // eslint-disable-next-line no-console
            event.detail.forEach(console.error);
            setErrors(event.detail);
        };

        const errorType = bspkErrorType(contextId);

        globalThis.addEventListener(errorType, listener);
        return () => {
            globalThis.removeEventListener(errorType, listener);
        };
    }, [contextId]);

    return { errors, contextId };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
