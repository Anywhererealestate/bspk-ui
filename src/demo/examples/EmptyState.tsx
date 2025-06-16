import { EmptyStateProps } from '../../EmptyState';
import { ComponentExampleFn, ExamplePlaceholder } from '../utils';

export const EmptyStateExample: ComponentExampleFn<EmptyStateProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    propRenderOverrides: (state, context) => {
        return {
            ...state,
            children:
                context?.preset?.label === 'With Image' ? (
                    <ExamplePlaceholder
                        style={{
                            height: '200px',
                            width: '60%',
                            minWidth: '250px',
                        }}
                    />
                ) : null,
        };
    },
    presets: [
        {
            label: 'With CallToAction',
            state: {
                callToAction: {
                    label: 'Add payment method',
                    onClick: () => action('Add payment method clicked!'),
                },
            },
        },
        {
            label: 'With Image',
        },
    ],
});
