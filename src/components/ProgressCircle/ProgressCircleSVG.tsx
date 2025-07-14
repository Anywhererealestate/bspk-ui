import { useId } from 'react';

export const ProgressCircleSVG = (props: { strokeWidth?: number }) => {
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
