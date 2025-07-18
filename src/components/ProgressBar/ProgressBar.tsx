import { useId } from '-/hooks/useId';
import { cssWithVars } from '-/utils/cwv';

import './progress-bar.scss';

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
     * @example
     *     42;
     *
     * @default 0
     * @minimum 0
     * @maximum 100
     *
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
 * @example
 *     import { ProgressBar } from '@bspk/ui/ProgressBar';
 *
 *     export function Example() {
 *         return <ProgressBar label="Example label" completion={50} />;
 *     }
 *
 * @name ProgressBar
 * @phase DesignReview
 */
function ProgressBar({ size = 'large', completion = 0, align = 'center', label }: ProgressBarProps) {
    const id = useId();

    return (
        <div data-align={align} data-bspk="progress-bar" data-size={size}>
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
            <div aria-hidden data-bar style={cssWithVars({ '--width': `${completion}%` })} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

ProgressBar.bspkName = 'ProgressBar';

export { ProgressBar };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
