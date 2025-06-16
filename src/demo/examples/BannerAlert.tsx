import { BannerAlertProps } from '../../BannerAlert';
import { ComponentExampleFn } from '../utils';

export const BannerAlertExample: ComponentExampleFn<BannerAlertProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    propRenderOverrides: (state, context) => {
        let nextHeader = state.header || 'This is a banner alert';
        if (context?.variantName === 'variant') {
            if (context?.variantValue === 'informational') nextHeader = 'This is informational banner';
            if (context?.variantValue === 'success') nextHeader = 'This is success banner';
            if (context?.variantValue === 'warning') nextHeader = 'This is warning banner';
            if (context?.variantValue === 'error') nextHeader = 'This is error banner';
        }
        return { ...state, header: nextHeader };
    },
    presets: [
        {
            label: 'With CallToAction',
            state: {
                callToAction: {
                    label: 'Click me',
                    onClick: () => action('Call to action clicked!'),
                },
            },
        },
        {
            label: 'Without OnClose',
            state: {
                onClose: undefined,
            },
        },
    ],
});
