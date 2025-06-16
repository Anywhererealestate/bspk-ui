import { EmptyStateProps } from '../../EmptyState';
import { ComponentExampleFn, ExamplePlaceholder } from '../utils';

export const EmptyStateExample: ComponentExampleFn<EmptyStateProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    propRenderOverrides: (state, context) => {
        return {
            ...state,
            children:
                context?.preset?.label === 'With Children' ? (
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
                header: 'No payment methods added',
                body: 'Add a card to your account for faster checkout.',
                callToAction: {
                    label: 'Add payment method',
                    onClick: () => action('Add payment method clicked!'),
                },
            },
        },
        {
            label: 'With Children',
            state: {
                header: 'No payment methods added',
                body: 'Add a card to your account for faster checkout.',
                callToAction: {
                    label: 'Add payment method',
                    onClick: () => action('Add payment method clicked!'),
                },
            },
        },
    ],
});
