import { EmptyStateProps } from '.';
import { ExamplePlaceholder } from '-/components/ExamplePlaceholder';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<EmptyStateProps>[] = [
    {
        label: 'With Custom Content',
        propState: {
            callToAction: undefined,
            body: 'Example body',
            header: 'Example header',
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
];

export const EmptyStateExample: ComponentExampleFn<EmptyStateProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    render: ({ props: { children, ...props }, Component }) => <Component {...props}>{children}</Component>,
    presets: [
        {
            label: 'With CallToAction',
            propState: {
                body: 'Example body',
                header: 'Example header',
                callToAction: {
                    label: 'Add payment method',
                    onClick: () => action('Add payment method clicked!'),
                },
                children: undefined,
            },
        },
        ...presets,
    ],
});
