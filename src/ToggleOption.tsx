import { css } from '@emotion/react';
import { ReactElement } from 'react';

export type ToggleOptionProps = {
    /**
     * The label of the field. Also used as the aria-label of the checkbox.
     *
     * @required
     */
    label: string;
    /** The description of the field. */
    description?: string;
    /** The control element to use. */
    children?: ReactElement;
    /** The size of the control option label. */
    size?: 'base' | 'large' | 'small';
};

/**
 * A utility component that wraps a checkbox, radio, and switch.
 *
 * @name ToggleOption
 */
function ToggleOption({ label, description, children, size }: ToggleOptionProps) {
    return (
        <label css={style} data-size={size} data-toggle-option="">
            <span data-control>{children}</span>
            <span data-content>
                <span data-label>{label}</span>
                {description && <span data-description>{description}</span>}
            </span>
        </label>
    );
}

ToggleOption.bspkName = 'ToggleOption';

export { ToggleOption };

export const style = css`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    flex-direction: row;
    padding: 0 var(--spacing-sizing-01) 0 0;
    gap: var(--spacing-sizing-02);
    user-select: none;
    background: unset;
    border: unset;
    cursor: pointer;
    min-height: var(--spacing-sizing-08);
    align-items: center;

    &:has([data-description]) {
        align-items: unset;
    }

    @media (any-pointer: coarse) {
        min-height: var(--spacing-sizing-12);
    }

    [data-content] {
        display: flex;
        flex-direction: column;
        padding: 2px 0;
    }

    [data-label] {
        color: var(--foreground-neutral-on-surface);
        font: var(--labels-base);
    }

    [data-description] {
        font: var(--body-small);
        color: var(--foreground-neutral-on-surface-variant-01);
    }

    &[data-size='small'] {
        [data-label] {
            font: var(--labels-small);
        }

        [data-description] {
            font: var(--body-x-small);
        }
    }

    &[data-size='large'] {
        [data-label] {
            font: var(--labels-large);
        }

        [data-description] {
            font: var(--body-base);
        }
    }

    &:not(:has(:disabled)) {
        [data-pseudo='focus'] &,
        &:focus-visible,
        &:has(*:focus-visible) {
            outline: var(--stroke-neutral-focus) 2px solid;
        }
    }

    &:has(:disabled) {
        [data-label] {
            color: var(--foreground-neutral-disabled-on-surface);
        }

        [data-description] {
            color: var(--foreground-neutral-disabled-on-surface);
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
