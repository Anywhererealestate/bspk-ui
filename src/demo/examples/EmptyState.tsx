import { EmptyStateProps } from '../../EmptyState';
import { ComponentExampleFn, ExamplePlaceholder } from '../utils';

export const EmptyStateExample: ComponentExampleFn<EmptyStateProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    render: ({ props: { children, ...props }, context, Component }) => (
        <Component {...props}>
            {context?.preset?.label === 'With Image' ? (
                <ExamplePlaceholder
                    style={{
                        height: '200px',
                        width: '60%',
                        minWidth: '250px',
                    }}
                />
            ) : (
                children
            )}
        </Component>
    ),
    presets: [
        {
            label: 'With CallToAction',
            propState: {
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
