import { SliderProps } from './Slider';

type IntervalDotProps = Pick<SliderProps, 'maximum' | 'minimum' | 'value'> & {
    interval: number;
};

export function SliderIntervalDots({ interval, maximum, minimum, value }: IntervalDotProps) {
    if (interval <= 0) return null;

    const count = Math.floor((maximum - minimum) / interval);
    const dots = [];

    for (let i = 1; i < count; i++) {
        const pointValue = i * interval;
        const percent = (pointValue / (maximum - minimum)) * 100;
        dots.push(
            <div
                data-filled-section={pointValue < value ? '' : undefined}
                data-interval-dot
                key={i}
                style={{ left: `${percent}%` }}
            />,
        );
    }

    return dots;
}
