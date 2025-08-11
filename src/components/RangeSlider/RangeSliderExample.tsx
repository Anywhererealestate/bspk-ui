import { ComponentType, useState } from 'react';
import { RangeSliderProps } from './RangeSlider';
import { ComponentExample } from '-/utils/demo';

export const RangeSliderExample: ComponentExample<RangeSliderProps> = {
    render: ({ Component, props }) => {
        return <ExampleBody {...props} Component={Component} />;
    },
};

const ExampleBody = ({ Component, ...props }: RangeSliderProps & { Component: ComponentType<RangeSliderProps> }) => {
    const [value, setValue] = useState<[number, number]>([10, 20]);

    return <Component {...props} onChange={setValue} value={value} />;
};
