import { RatingProps } from './Rating';
import { ComponentExampleFn } from '-/utils/demo';

export const presets = [
    {
        label: 'Non interactive',
        propState: {
            onChange: undefined,
        },
    },
];

export const RatingExample: ComponentExampleFn<RatingProps> = () => {
    return {
        render: ({ props, Component }) => {
            return <Component {...props} />;
        },
        presets,
    };
};
