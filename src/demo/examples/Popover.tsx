import { Button } from '../../Button';
import { PopoverProps } from '../../Popover';
import { ComponentExampleFn } from '../utils';

export const PopoverExample: ComponentExampleFn<PopoverProps> = ({ action }) => ({
    render: ({ props, Component }) => {
        return (
            <>
                <Component {...props}>
                    <Button label={`Click me (${props.placement})`} variant="secondary" />
                </Component>
            </>
        );
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
    ],
});
