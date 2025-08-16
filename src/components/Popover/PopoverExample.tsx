import { PopoverProps } from '.';
import { Button } from '-/components/Button';
import { ComponentExampleFn } from '-/utils/demo';

export const PopoverExample: ComponentExampleFn<PopoverProps> = ({ action }) => ({
    render: ({ props, Component }) => {
        return (
            <>
                <Component {...props}>
                    <Button label={`Click me for a Popover (${props.placement})`} variant="secondary" />
                </Component>
            </>
        );
    },
    presets: [
        {
            label: 'With CallToAction',
            propState: {
                callToAction: {
                    label: 'CTA Button',
                    onClick: () => action('Call to action clicked!'),
                },
            },
        },
    ],
});
