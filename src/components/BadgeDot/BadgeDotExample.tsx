import { BadgeDotProps } from '.';
import { Avatar } from '-/components/Avatar';
import { Button } from '-/components/Button';
import { ComponentExample } from '-/utils/demo';

export const BadgeDotExample: ComponentExample<BadgeDotProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props, Component, variant }) => {
        return (
            <Component {...props}>
                {variant?.name === 'outline' ? (
                    <Button label="Button" size="large" />
                ) : (
                    <Avatar image="/profile.jpg" name="Andre Giant" />
                )}
            </Component>
        );
    },
    sections: [],
    variants: {
        outline: { size: { options: [6, 8, 10, 12] } },
    },
};
