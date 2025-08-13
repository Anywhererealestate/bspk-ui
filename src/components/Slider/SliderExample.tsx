import { useState } from 'react';

import { SliderProps } from './Slider';
import { ComponentExample } from '-/utils/demo';

export const SliderExample: ComponentExample<SliderProps> = {
    // containerStyle: { width: '100%' },
    render: ({ props, Component }) => {
        const SliderDemo = (sliderProps: SliderProps) => {
            const initialValue = Array.isArray(sliderProps.value)
                ? sliderProps.value
                : typeof sliderProps.value === 'number'
                  ? sliderProps.value
                  : 0;

            const [value, setValue] = useState(initialValue);

            return <Component {...sliderProps} onChange={setValue} value={value} />;
        };

        return <SliderDemo {...props} />;
    },
    presets: [
        {
            label: 'Basic Slider',
            propState: {
                label: 'Basic option',
                min: 0,
                max: 100,
                step: 1,
                value: 20,
            },
        },
        {
            label: 'Range Slider',
            propState: {
                label: 'Range option',
                min: 50,
                max: 150,
                step: 1,
                value: [70, 80],
            },
        },
    ],
};
