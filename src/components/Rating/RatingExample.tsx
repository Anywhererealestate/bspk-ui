import { RatingProps } from './Rating';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<RatingProps>[] = [
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
