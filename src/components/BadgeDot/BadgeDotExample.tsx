import { BadgeDotProps } from '.';
import { Avatar } from '-/components/Avatar';
import { Button } from '-/components/Button';
import { ComponentExample } from '-/utils/demo';

export const BadgeDotExample: ComponentExample<BadgeDotProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    render: ({ props, Component }) => {
        return (
            <Component {...props}>
                {props.outline === true ? (
                    <Button label="Button" size="large" />
                ) : (
                    <Avatar image="/avatar-01.png" name="Andre Giant" />
                )}
            </Component>
        );
    },
    sections: [],
    variants: {
        outline: { size: { options: [6, 8, 10, 12] } },
    },
};
