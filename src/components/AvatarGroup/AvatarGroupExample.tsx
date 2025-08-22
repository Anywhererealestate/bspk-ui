import { AvatarGroupProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const AvatarGroupExample: ComponentExample<AvatarGroupProps> = {
    presets: [
        {
            label: 'Stacked',
            propState: {
                items: [
                    { name: 'Fezzik', image: '/profile.jpg' },
                    { name: 'Inigo Montoya', initials: 'IM', color: 'blue' },
                    { name: 'Miracle Max', initials: 'MM', showIcon: false, color: 'green' },
                    { name: 'Princess Buttercup', showIcon: true, color: 'purple' },
                ],
                variant: 'stacked',
            },
        },
        {
            label: 'Stacked + Overflow',
            propState: {
                items: [
                    { name: 'Fezzik', image: '/profile.jpg' },
                    { name: 'Inigo Montoya', initials: 'IM', color: 'blue' },
                    { name: 'Miracle Max', initials: 'MM', showIcon: false, color: 'green' },
                    { name: 'Westley Man In Black', initials: 'WB', color: 'grey' },
                    { name: 'Princess Buttercup', showIcon: true, color: 'purple' },
                ],
                max: 3,
                variant: 'stacked',
            },
        },
    ],
};
