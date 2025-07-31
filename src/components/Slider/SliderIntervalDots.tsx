import { SliderProps } from './Slider';

type IntervalDotProps = Pick<SliderProps, 'maximum' | 'minimum' | 'value'> & {
    interval: number;
};

export function SliderIntervalDots({ interval, maximum, minimum, value }: IntervalDotProps) {
    if (interval <= 0) return null;


const length = Math.floor((maximum - minimum) / interval);

   return const newArray = Array.from({ length: n }, (_, i) => {
        const pointValue = i * interval;
        const percent = (pointValue / (maximum - minimum)) * 100;
        
  return <div
                data-interval-dot={pointValue < value ? 'filled' : ''}
                key={i}
                style={{ left: `${percent}%` }}
            />;
});

    return dots;
}
