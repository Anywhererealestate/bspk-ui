import { css } from '@emotion/react';

import { ToggleControlProps, ElementProps } from './';

export type RadioProps = Pick<
    ToggleControlProps<HTMLInputElement>,
    'aria-label' | 'checked' | 'disabled' | 'invalid' | 'name' | 'onChange' | 'value'
>;

/**
 * A round control that allows user to choose one option from a set. This is the base element and if used directly you
 * must wrap it with a label. This will more often be used in the RadioOption or RadioGroup component.
 *
 * @element
 *
 * @name Radio
 */
function Radio(props: ElementProps<RadioProps, 'input'>) {
    const { checked = false, invalid, disabled, onChange, ...otherProps } = props;

    return (
        <span css={style} data-radio>
            <input
                {...otherProps}
                checked={!!checked}
                data-invalid={invalid || undefined}
                disabled={disabled || undefined}
                onChange={(event) => onChange(!!event.target.checked, event)}
                type="radio"
            />
            <span aria-hidden />
        </span>
    );
}

Radio.bspkName = 'Radio';

export { Radio };

export const style = css`
    display: block;
    position: relative;
    width: var(--spacing-sizing-06);
    aspect-ratio: 1/1;
    padding: 2px;

    input[type='radio'] {
        position: absolute;
        opacity: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        cursor: pointer;
    }

    span {
        --stroke: var(--stroke-neutral-base);
        --inner: var(--foreground-brand-primary);
        --background: none;
        position: relative;
        z-index: 1;
        box-sizing: border-box;
        display: flex;
        width: var(--spacing-sizing-05);
        aspect-ratio: 1/1;
        border-radius: 50%;
        border: 2px solid var(--stroke);
        align-items: center;
        flex-direction: column;
        justify-content: center;
        background: var(--background);

        &:before {
            content: '';
            display: block;
            width: var(--spacing-sizing-03);
            aspect-ratio: 1/1;
            background: var(--inner);
            border-radius: var(--radius-circular);
            opacity: 0;
        }
    }

    input[type='radio']:not(:disabled) {
        &:hover + span {
            --background: var(--interactions-neutral-hover-opacity);
        }

        &:active + span {
            --background: var(--interactions-neutral-press-opacity);
        }

        &[data-invalid] + span {
            --stroke: var(--status-error);
            --inner: var(--status-error);
        }
    }

    input[type='radio']:checked + span {
        --stroke: var(--stroke-brand-primary);

        &:before {
            opacity: 1;
        }
    }

    input[type='radio']:disabled {
        pointer-events: none;

        & + span {
            --stroke: var(--stroke-neutral-interactions-disabled-light);
            --inner: var(--foreground-neutral-disabled-on-surface);
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
