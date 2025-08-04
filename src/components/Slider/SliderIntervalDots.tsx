import { SliderProps } from './Slider';

type IntervalDotProps = Pick<SliderProps, 'max' | 'min' | 'value'> & {
    step: number;
};

export function SliderIntervalDots({ step, max, min, value }: IntervalDotProps) {
    if (step <= 0) return null;

    const count = Math.floor((max - min) / step);
    const dots = [];

    for (let i = 1; i < count; i++) {
        const pointValue = i * step;
        const percent = (pointValue / (max - min)) * 100;
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
