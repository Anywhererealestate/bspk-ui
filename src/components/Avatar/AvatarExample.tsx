import { AvatarProps } from '-/components/Avatar';
import { ComponentExample } from '-/utils/demo';

export const AvatarExample: ComponentExample<AvatarProps> = {
    presets: [
        {
            label: 'Name Only',
            propState: {
                name: 'Andre Giant',
                image: undefined, // Ensure no image is set
                initials: undefined, // Ensure no initials are set
                showIcon: false,
            },
        },
        {
            label: 'With Initials',
            propState: {
                name: 'Andre Giant',
                initials: 'GA',
                image: undefined, // Ensure no image is set
                showIcon: false,
            },
        },
        {
            label: 'With Icon',
            propState: {
                name: 'Andre Giant',
                showIcon: true,
                image: undefined, // Ensure no image is set
            },
        },
        {
            label: 'With Image',
            propState: {
                name: 'Andre Giant',
                image: '/profile.jpg',
                showIcon: false,
            },
        },
    ],
};
