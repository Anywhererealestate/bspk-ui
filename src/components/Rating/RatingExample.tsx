import { RatingProps } from './Rating';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<RatingProps>[] = [
    {
        label: 'Interactive',
        propState: {
            onChange: () => {},
        },
        designPattern:
            'Descriptive and interactive control that allow customers to indicate their feelings about an experience or product on a scale of 1 to 5.',
    },
    {
        label: 'Visual',
        propState: {
            onChange: undefined,
            value: 4.5,
        },
        designPattern: 'A non interactive representation of ratings Non interactive, a scale of 1 to 5.',
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
