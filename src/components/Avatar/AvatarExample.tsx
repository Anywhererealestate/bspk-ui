import { AvatarProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<AvatarProps>[] = [
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
        label: 'One Word Name',
        propState: {
            name: 'Andre',
            image: undefined, // Ensure no image is set
            initials: undefined, // Ensure no initials are set
            showIcon: false,
        },
    },
    {
        label: 'With Initials',
        propState: {
            name: 'Andre The Giant',
            initials: 'AG',
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
            image: '/avatar-01.png',
            showIcon: false,
        },
    },
];

export const AvatarExample: ComponentExample<AvatarProps> = {
    presets,
};
