import { SliderProps, SliderValue } from './Slider';

type IntervalDotProps = Pick<SliderProps<SliderValue>, 'max' | 'min' | 'value'> & {
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
                data-filled-section={
                    typeof value === 'number'
                        ? pointValue < value
                            ? ''
                            : undefined
                        : pointValue < value[0]
                          ? ''
                          : undefined
                }
                data-interval-dot
                key={i}
                style={{ left: `${percent}%` }}
            />,
        );
    }

    return dots;
}
