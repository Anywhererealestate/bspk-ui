import { CSSProperties } from 'react';

export type CSSWithVariables = CSSProperties & Record<`--${string}`, unknown>;

/**
 * Ensures that the styles with custom properties (variables) are properly typed.
 *
 * * @param input {CSSWithVariables} * * @returns CSSProperties
 */
export function cssWithVars(input: CSSWithVariables) {
    return input as CSSProperties;
}
