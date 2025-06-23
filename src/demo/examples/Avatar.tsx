import { AvatarProps } from '../../Avatar';
import { ComponentExample, Preset } from '../utils';

export const AvatarExample: ComponentExample = {
    presets: [
        {
            label: 'Name Only',
            propState: {
                name: 'Andre Giant',
                image: undefined, // Ensure no image is set
                initials: undefined, // Ensure no initials are set
                icon: undefined, // Ensure no icon is set
            },
        },
        {
            label: 'With Initials',
            propState: {
                name: 'Andre Giant',
                initials: 'GA',
                image: undefined, // Ensure no image is set
            },
        },
        {
            label: 'With Icon',
            propState: {
                name: 'Andre Giant',
                icon: 'Person',
                image: undefined, // Ensure no image is set
            },
        },
        {
            label: 'With Image',
            propState: {
                name: 'Andre Giant',
                image: '/profile.jpg',
            },
        },
    ] as Preset<AvatarProps>[],
};
