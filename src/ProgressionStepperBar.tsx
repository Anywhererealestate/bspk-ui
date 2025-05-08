import { css } from '@emotion/react';
import { CSSProperties } from 'react';

export type ProgressionStepperBarProps = {
    /**
     * The number of steps in the progress bar.
     *
     * @minimum 2
     * @maximum 10
     * @required
     */
    stepCount: number;
    /**
     * The last step completed.
     *
     * @default 0
     * @minimum 0
     */
    stepCompleted?: number;
    /** The size of the progress bar. */
    size?: 'large' | 'small';
};

/**
 * Component description coming soon.
 *
 * @name ProgressionStepperBar
 */
function ProgressionStepperBar({
    stepCount,
    stepCompleted: stepCompletedProp = 0,
    size = 'large',
}: ProgressionStepperBarProps) {
    const stepCompleted = Math.min(stepCompletedProp, stepCount);

    return (
        <div
            css={style}
            data-progression-stepper-bar=""
            data-size={size}
            style={{ '--steps': stepCount } as CSSProperties}
        >
            <div data-steps>
                {Array.from({ length: stepCount }, (_, i) => (
                    <div data-complete={i < stepCompleted || undefined} data-step={i} key={i} />
                ))}
            </div>
            <label>
                {stepCompleted} of {stepCount} steps completed.
            </label>
        </div>
    );
}

ProgressionStepperBar.bspkName = 'ProgressionStepperBar';

export { ProgressionStepperBar };

export const style = css`
    &[data-size='large'] {
        --height: var(--spacing-sizing-02);
    }

    &[data-size='small'] {
        --height: var(--spacing-sizing-01);
    }

    display: flex;
    width: 100%;
    flex-direction: column;
    gap: var(--spacing-sizing-01);

    [data-steps] {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-sizing-01);
        height: var(--height);
        [data-step] {
            width: 100%;
            height: var(--height);
            min-width: var(--spacing-sizing-02);
            border-radius: var(--radius-small);
            background: var(--surface-neutral-t3-low);
            &[data-complete] {
                background: var(--surface-brand-primary);
            }
        }
    }

    label {
        font: var(--labels-small);
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
