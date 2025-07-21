import { RatingProps } from './Rating';
import { ComponentExampleFn } from '-/utils/demo';

export const RatingExample: ComponentExampleFn<RatingProps> = () => {
    return {
        render: ({ props, Component }) => {
            return <Component {...props} />;
        },
        presets: [
            {
                label: 'Non interactive',
                propState: {
                    onChange: undefined,
                },
            },
        ],
    };
};
