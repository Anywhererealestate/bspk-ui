import { BadgeProps } from '.';
import { Avatar } from '-/components/Avatar';
import { ComponentExample } from '-/utils/demo';

export const BadgeExample: ComponentExample<BadgeProps> = {
    render: ({ props, Component }) => {
        return (
            <Component {...props}>
                <Avatar image="/profile.jpg" name="Andre Giant" />
            </Component>
        );
    },
    containerStyle: { width: '100%' },
    variants: {
        surfaceBorder: { color: { options: ['primary', 'secondary'] } },
        size: { count: { options: [9, 99, 999] } },
    },
};
