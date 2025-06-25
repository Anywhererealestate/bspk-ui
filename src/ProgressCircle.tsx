import './progress-circle.scss';
/* eslint-disable react/no-multi-comp */
import { useId } from 'react';

import { Txt } from './Txt';
import { TxtVariant } from './utils/txtVariants';

export type ProgressCircleProps = {
    /** The label of the progress circle. */
    label: string;
    /**
     * The size of the label and progress circle.
     *
     * @default medium
     */
    size?: 'large' | 'medium' | 'small';
    /**
     * The position of the label in relation to the progress circle.
     *
     * @default bottom
     */
    labelPosition?: 'bottom' | 'left' | 'right' | 'top';
};

/**
 * Rotating circle or pill that indicates the status or state of completion for a process that’s part of a user flow.
 *
 * @example
 *     import { ProgressCircle } from '@bspk/ui/ProgressCircle';
 *
 *     export function Example() {
 *         return <ProgressCircle label="Example label" />;
 *     }
 *
 * @name ProgressCircle
 * @phase AccessibilityReview
 */
function ProgressCircle({ label, labelPosition, size = 'medium' }: ProgressCircleProps) {
    let variant: TxtVariant = 'labels-base';

    if (size === 'small') variant = 'labels-small';
    else if (size === 'large') variant = 'labels-large';

    const labelId = useId();

    return (
        <div
            aria-labelledby={labelId}
            data-bspk="progress-circle"
            data-label-position={labelPosition}
            data-size={size}
            role="progressbar"
        >
            <ProgressCircle.SVG />
            <Txt id={labelId} variant={variant}>
                {label || 'Loading ...'}
            </Txt>
        </div>
    );
}

ProgressCircle.bspkName = 'ProgressCircle';

export { ProgressCircle };

const ProgressCircleSVG = (props: { strokeWidth?: number }) => {
    const strokeWidth = props.strokeWidth || 10;
    const width = 100;
    const id = useId();

    return (
        <svg {...props} data-animated fill="none" viewBox={`0 0 ${width * 2} ${width * 2}`}>
            <defs>
                <linearGradient id={`${id}spinner-secondHalf`}>
                    <stop offset="50%" stopColor="currentColor" stopOpacity={0} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.375" />
                </linearGradient>
                <linearGradient id={`${id}spinner-firstHalf`}>
                    <stop offset="0%" stopColor="currentColor" stopOpacity={1} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.375" />
                </linearGradient>
            </defs>
            <g strokeWidth={strokeWidth * 2}>
                <path
                    d={`M ${strokeWidth} ${width} A ${width - strokeWidth} ${width - strokeWidth} 0 0 1 ${width + (width - strokeWidth)} ${width}`}
                    stroke={`url(#${id}spinner-secondHalf)`}
                />
                <path
                    d={`M ${width + (width - strokeWidth)} ${width} A ${width - strokeWidth} ${width - strokeWidth} 0 0 1 ${strokeWidth} ${width}`}
                    stroke={`url(#${id}spinner-firstHalf)`}
                />
                {/* 1deg extra path to have the round end cap */}
                <path
                    d={`M ${strokeWidth} ${width} A ${width - strokeWidth} ${width - strokeWidth} 0 0 1 ${strokeWidth} ${width - 2}`}
                    stroke="currentColor"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};

ProgressCircle.SVG = ProgressCircleSVG;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
