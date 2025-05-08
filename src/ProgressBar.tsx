import { css } from '@emotion/react';
import { CSSProperties, useId } from 'react';

export type ProgressBarProps = {
    /**
     * The size of the progressbar.
     *
     * @default large
     */
    size?: 'large' | 'small';
    /**
     * The current progress of the progressbar.
     *
     * @default 0
     * @minimum 0
     * @maximum 100
     * @required
     */
    completion: number;
    /**
     * The label alignment of the progressbar.
     *
     * @default center
     */
    align?: 'center' | 'left';
    /** The label of the progressbar. */
    label: string;
};

/**
 * A progress bar is a horizontal visual indicator that let’s the user know the progression of a task or operation
 * occurring in the background.
 *
 * @name ProgressBar
 */
function ProgressBar({ size = 'large', completion = 0, align = 'center', label }: ProgressBarProps) {
    const id = useId();

    return (
        <div css={style} data-align={align} data-progress-bar data-size={size}>
            <progress
                aria-busy={completion < 100}
                aria-label="A bounded progress bar from 0 to 100"
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={completion}
                id={id}
                max="100"
                value={completion}
            >
                {completion}%
            </progress>
            <div aria-hidden data-bar style={{ '--width': `${completion}%` } as CSSProperties} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

ProgressBar.bspkName = 'ProgressBar';

export { ProgressBar };

export const style = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--spacing-sizing-01);

    progress {
        opacity: 0;
        position: absolute;
    }

    [data-bar] {
        width: 100%;
        height: var(--spacing-sizing-02);
        background-color: var(--surface-neutral-t3-low);
        border-radius: var(--radius-small);

        &::after {
            content: '';
            display: block;
            height: 100%;
            background-color: var(--foreground-brand-primary);
            border-radius: var(--radius-small);
            width: var(--width);
            transition: width 0.3s;
        }
    }

    &[data-size='small'] {
        max-width: 248px;

        [data-bar] {
            height: var(--spacing-sizing-01);
        }
    }

    label {
        font-size: var(--labels-small);
        width: 100%;
        text-align: center;
    }

    &[data-align='left'] label {
        text-align: left;
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
