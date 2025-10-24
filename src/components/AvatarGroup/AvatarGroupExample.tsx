import { AvatarGroupProps } from '.';
import { COLOR_VARIANTS } from '-/utils/colorVariants';
import { ComponentExample, Preset } from '-/utils/demo';

const BLUE = COLOR_VARIANTS[4];
const GREEN = COLOR_VARIANTS[5];
const PURPLE = COLOR_VARIANTS[10];

export const presets: Preset<AvatarGroupProps>[] = [
    {
        label: 'Stacked (4) Auto Overflow',
        propState: {
            items: [
                { name: 'Fezzik', image: '/profile.jpg' },
                { name: 'Inigo Montoya', initials: 'IM', color: BLUE },
                { name: 'Miracle Max', initials: 'MM', showIcon: false, color: GREEN },
                { name: 'Princess Buttercup', showIcon: true, color: PURPLE },
            ],
            variant: 'stacked' as AvatarGroupProps['variant'],
            max: 'auto',
        },
    },
    {
        label: 'Stacked (14) Auto Overflow',
        propState: {
            items: [
                {
                    name: 'Alice Johnson',
                    image: '/avatar-01.png',
                },
                {
                    name: 'Bob Smith',
                    image: '/avatar-02.png',
                },
                {
                    name: 'Charlie Brown',
                    image: '/avatar-03.png',
                },
                {
                    name: 'David Wilson',
                    image: '/avatar-04.png',
                },
                {
                    name: 'Eva Green',
                    image: '/avatar-05.png',
                },
                { name: 'Frank Miller', image: '/avatar-06.png' },
                { name: 'Grace Lee', image: '/avatar-07.png' },
                { name: 'Hannah Kim', image: '/avatar-08.png' },
                { name: 'Ian Clark', image: '/avatar-09.png' },
                { name: 'Julia Adams', image: '/avatar-10.png' },
                { name: 'Katherine Johnson', image: '/avatar-11.png' },
                { name: 'Liam Brown', image: '/avatar-12.png' },
                { name: 'Mia Wong', image: '/avatar-13.png' },
                { name: 'Noah Davis', image: '/avatar-14.png' },
            ],
            variant: 'stacked' as AvatarGroupProps['variant'],
            max: 'auto',
        },
    },
];

export const AvatarGroupExample: ComponentExample<AvatarGroupProps> = {
    presets,
    containerStyle: { border: '1px dotted var(--stroke-neutral-base)', overflow: 'visible' },
    defaultState: {
        variant: 'spread',
    },
    render: ({ props, Component, preset }) => <Component key={preset?.label} {...props} />,
    variants: false,
};
