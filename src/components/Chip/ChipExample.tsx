import { BadgeItem, ChipProps } from './';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<ChipProps>[] = [
    {
        label: 'Basic',
        propState: {
            label: 'chip',
        },
    },
    {
        label: 'Leading Icon',
        propState: {
            label: 'chip',
            leadingIcon: 'Add',
            trailingIcon: '',
        },
    },
    {
        label: 'Trailing Icon',
        propState: {
            label: 'chip',
            leadingIcon: '',
            trailingIcon: 'Add',
        },
    },
    {
        label: 'Both Icons',
        propState: {
            label: 'chip',
            leadingIcon: 'Add',
            trailingIcon: 'Add',
        },
    },
    {
        label: 'Invalid Icons',
        propState: {
            label: 'chip',
            leadingIcon: 'Bumblebee',
            trailingIcon: 'Rabbit',
        },
    },
    {
        label: 'Trailing Badge',
        propState: {
            label: 'chip',
            leadingIcon: 'Add',
            trailingIcon: '',
            trailingBadge: { count: 2, size: 'x-small' as BadgeItem['size'] },
        },
    },
    {
        label: 'Trailing Badge Icon',
        propState: {
            label: 'chip',
            trailingIcon: 'Cloud',
            trailingBadge: { count: 2, size: 'x-small' as BadgeItem['size'] },
        },
    },
];

export const ChipExample: ComponentExample<ChipProps> = {
    render: ({ props, Component }) => <Component {...props} />,
    presets,
};
