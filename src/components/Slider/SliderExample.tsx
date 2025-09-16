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
            label: 'Undefined Value',
            propState: {
                label: 'undefined',
                min: 50,
                max: 150,
                step: 1,
                value: null as unknown as [number, number],
                formatNumber: (num, context) => {
                    if (context === 'max') return `${num}% Passing`;
                    return `${num}%`;
                },
                name: 'undefined-slider',
            },
        },
    ],
};
