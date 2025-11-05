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
            label: 'Formatted Number',
            propState: {
                label: 'Price option',
                min: 0,
                max: 100,
                step: 5,
                value: 50,
                formatNumber: (num) => `$${num}`,
                name: 'formatted-number-slider',
            },
        },
        {
            label: 'Range Slider',
            designPattern:
                'A control element that allows customers to select a value or adjust a setting by moving the handle along a horizontal track.',
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
            designPattern: 'Continuous sliders allow users to select a value along a subjective range.',
            propState: {
                label: 'What is the purpose of life?',
                min: 0,
                max: 100,
                value: 42,
                step: 1,
                formatNumber: (num) => num.toFixed(0),
                name: 'continuous-slider',
                marks: false,
            },
        },
        {
            label: 'Discrete Slider',
            designPattern:
                'Discrete sliders can be adjusted to a specific value by referencing its value indicator. You can generate a mark for each step with marks={true}.',
            propState: {
                label: 'Discrete option',
                min: 0,
                max: 100,
                step: 10,
                value: 40,
                formatNumber: (num) => num.toString(),
                name: 'discrete-slider',
                marks: true,
            },
        },
    ],
    defaultState: {
        label: 'Basic option',
        min: 20,
        max: 80,
        step: 1,
        value: 30,
        formatNumber: (num) => `$${num}`,
        name: 'basic-slider',
    },
};
