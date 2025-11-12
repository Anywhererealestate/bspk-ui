import { BadgeItem, ChipProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<ChipProps>[] = [
    {
        label: 'Basic',
        propState: {
            label: 'chip',
            leadingIcon: undefined,
            trailingIcon: undefined,
            trailingBadge: undefined,
        },
    },
    {
        label: 'Leading Icon',
        propState: {
            label: 'chip',
            leadingIcon: 'Add',
            trailingIcon: undefined,
            trailingBadge: undefined,
        },
    },
    {
        label: 'Trailing Icon',
        propState: {
            label: 'chip',
            leadingIcon: undefined,
            trailingIcon: 'Add',
            trailingBadge: undefined,
        },
    },
    {
        label: 'Both Icons',
        propState: {
            label: 'chip',
            leadingIcon: 'Add',
            trailingIcon: 'Add',
            trailingBadge: undefined,
        },
    },
    {
        label: 'Invalid Icons',
        propState: {
            label: 'chip',
            leadingIcon: 'Bumblebee',
            trailingIcon: 'Rabbit',
            trailingBadge: undefined,
        },
    },
    {
        label: 'Trailing Badge',
        propState: {
            label: 'chip',
            leadingIcon: 'Add',
            trailingIcon: undefined,
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
    {
        label: 'Assist Chip',
        propState: {
            label: 'Assist Chip',
            leadingIcon: 'Cloud',
            trailingIcon: undefined,
            trailingBadge: undefined,
        },
        designPattern:
            'A dynamic action element that helps trigger and perform an action for the customer. A supplement option to buttons. ',
    },
    {
        label: 'Filter Chip',
        propState: {
            label: 'Filter Chip',
            leadingIcon: 'Cloud',
            trailingIcon: 'KeyboardArrowDown',
            trailingBadge: undefined,
        },
        designPattern: 'Short form descriptive words that filter out content or represent active filter setting.',
    },
    {
        label: 'Input Chip',
        propState: {
            label: 'Input Chip',
            leadingIcon: 'Cloud',
            trailingIcon: 'Close',
            trailingBadge: undefined,
        },
        designPattern:
            'A range of short form key words or pieces of information a customer enters within multi entry field.',
    },
    {
        label: 'Suggest Chip',
        propState: {
            label: 'Suggest Chip',
            leadingIcon: undefined,
            trailingIcon: undefined,
            trailingBadge: undefined,
        },
        designPattern: 'Dynamically generated options that are suggested to the customer as responses or prompts. ',
    },
];

export const ChipExample: ComponentExample<ChipProps> = {
    render: ({ props, Component }) => <Component {...props} />,
    presets,
};
