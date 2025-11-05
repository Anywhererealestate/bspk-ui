import { useState } from 'react';

import { SliderProps } from './Slider';
import { ComponentExample } from '-/utils/demo';

export const SliderExample: ComponentExample<SliderProps<number | [number, number]>> = {
    // containerStyle: { width: '100%' },
    render: ({ props, Component }) => {
        const SliderDemo = (sliderProps: SliderProps<number | [number, number]>) => {
            const initialValue = Array.isArray(sliderProps.value)
                ? sliderProps.value
                : typeof sliderProps.value === 'number'
                  ? sliderProps.value
                  : 0;

            const [value, setValue] = useState(initialValue);

            return <Component {...sliderProps} onChange={setValue} value={value} />;
        };

        return <SliderDemo {...props} max={props.max || 100} min={props.min || 0} value={props.value || 50} />;
    },
    presets: [
        {
            label: 'Basic Slider',
            propState: {
                label: 'Basic option',
                min: 20,
                max: 80,
                step: 1,
                value: 30,
                formatNumber: (num) => `$${num}`,
                name: 'basic-slider',
            },
        },
        {
            label: 'Range Slider',
            propState: {
                label: 'Range option',
                min: 0,
                max: 100,
                step: 1,
                value: [70, 80],
                formatNumber: (num) => {
                    return `${num}%`;
                },
                name: 'range-slider',
            },
        },
        {
            label: 'Continuous Slider',
            propState: {
                label: 'Continuous option',
                min: 0,
                max: 100,
                value: 50,
                step: 1,
                formatNumber: (num) => num.toFixed(0),
                name: 'continuous-slider',
                marks: false,
            },
        },
        {
            label: 'Discrete Slider',
            propState: {
                label: 'Discrete option',
                min: 0,
                max: 10,
                step: 1,
                value: 4,
                formatNumber: (num) => num.toString(),
                name: 'discrete-slider',
                marks: true,
            },
        },
    ],
};
