import { BannerAlertProps } from '.';
import { ComponentExampleFn } from '-/utils/demo';

export const BannerAlertExample: ComponentExampleFn<BannerAlertProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    render: ({ props, context, Component }) => {
        let nextHeader = props.header || 'This is a banner alert';
        if (context?.variantName === 'variant') {
            if (context?.variantValue === 'informational') nextHeader = 'This is informational banner';
            if (context?.variantValue === 'success') nextHeader = 'This is success banner';
            if (context?.variantValue === 'warning') nextHeader = 'This is warning banner';
            if (context?.variantValue === 'error') nextHeader = 'This is error banner';
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
