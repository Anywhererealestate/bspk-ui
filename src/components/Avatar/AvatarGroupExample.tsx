import { AvatarGroupProps } from './AvatarGroup';
import { COLOR_VARIANTS } from '-/utils/colorVariants';
import { ComponentExample, Preset } from '-/utils/demo';

const BLUE = COLOR_VARIANTS[4];
const GREEN = COLOR_VARIANTS[5];
const GREY = COLOR_VARIANTS[0];
const PURPLE = COLOR_VARIANTS[10];

export const presets: Preset<AvatarGroupProps>[] = [
    {
        label: 'Stacked',
        propState: {
            items: [
                { name: 'Fezzik', image: '/profile.jpg' },
                { name: 'Inigo Montoya', initials: 'IM', color: BLUE },
                { name: 'Miracle Max', initials: 'MM', showIcon: false, color: GREEN },
                { name: 'Princess Buttercup', showIcon: true, color: PURPLE },
            ],
            variant: 'stacked' as AvatarGroupProps['variant'],
        },
    },
    {
        label: 'Stacked + Overflow',
        propState: {
            items: [
                { name: 'Fezzik', image: '/profile.jpg' },
                { name: 'Inigo Montoya', initials: 'IM', color: BLUE },
                { name: 'Miracle Max', initials: 'MM', showIcon: false, color: GREEN },
                { name: 'Westley Man In Black', initials: 'WB', color: GREY },
                { name: 'Princess Buttercup', showIcon: true, color: PURPLE },
            ],
            max: 3,
            variant: 'stacked' as AvatarGroupProps['variant'],
        },
    },
];

export const AvatarGroupExample: ComponentExample<AvatarGroupProps> = {
    presets,
};
