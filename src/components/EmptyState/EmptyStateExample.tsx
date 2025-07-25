import { EmptyStateProps } from '.';
import { ExamplePlaceholder } from '-/components/ExamplePlaceholder';
import { ComponentExampleFn } from '-/utils/demo';

export const EmptyStateExample: ComponentExampleFn<EmptyStateProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    render: ({ props: { children, ...props }, Component }) => <Component {...props}>{children}</Component>,
    presets: [
        {
            label: 'With CallToAction',
            propState: {
                callToAction: {
                    label: 'Add payment method',
                    onClick: () => action('Add payment method clicked!'),
                },
                children: undefined,
            },
        },
        {
            label: 'With Custom Content',
            propState: {
                callToAction: undefined,
                children: (
                    <ExamplePlaceholder
                        style={{
                            height: '200px',
                            width: '60%',
                            minWidth: '250px',
                        }}
                    />
                ),
            },
        },
    ],
});
