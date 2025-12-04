import { EmptyStateProps } from '.';
import { ExamplePlaceholder } from '-/components/ExamplePlaceholder';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<EmptyStateProps>[] = [
    {
        label: 'With Custom Content',
        propState: {
            callToAction: undefined,
            body: 'No results found',
            header: 'We couldn’t find any matching results. Try changing your search.',
            children: (
                <ExamplePlaceholder
                    label="Illustration slot or icon slot"
                    style={{
                        height: '200px',
                        width: '200px',
                    }}
                />
            ),
        },
    },
];

export const EmptyStateExample: ComponentExampleFn<EmptyStateProps> = ({ action }) => ({
    containerStyle: { width: '400px' },
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
