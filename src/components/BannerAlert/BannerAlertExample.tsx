import { BannerAlertProps } from '.';
import { ComponentExampleFn } from '-/utils/demo';

export const BannerAlertExample: ComponentExampleFn<BannerAlertProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    render: ({ props, variant, Component }) => {
        let nextHeader = props.header || 'This is a banner alert';
        if (variant && variant.name === 'variant') {
            if (variant.value === 'informational') nextHeader = 'This is informational banner';
            if (variant.value === 'success') nextHeader = 'This is success banner';
            if (variant.value === 'warning') nextHeader = 'This is warning banner';
            if (variant.value === 'error') nextHeader = 'This is error banner';
        }
        return <Component {...props} header={nextHeader} />;
    },
    presets: [
        {
            label: 'With CallToAction',
            propState: {
                callToAction: {
                    label: 'Click me',
                    onClick: () => action('Call to action clicked!'),
                },
            },
        },
        {
            label: 'Without OnClose',
            propState: {
                onClose: undefined,
            },
        },
    ],
});
