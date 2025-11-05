import { BadgeItem, ChipProps } from '.';
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
    {
        label: 'Assist Chip',
        propState: {
            label: 'Assist Chip',
            leadingIcon: 'Cloud',
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
        },
        designPattern: 'Short form descriptive words that filter out content or represent active filter setting.',
    },
    {
        label: 'Input Chip',
        propState: {
            label: 'Input Chip',
            leadingIcon: 'Cloud',
            trailingIcon: 'Close',
        },
        designPattern:
            'A range of short form key words or pieces of information a customer enters within multi entry field.',
    },
    {
        label: 'Suggest Chip',
        propState: {
            label: 'Suggest Chip',
        },
        designPattern: 'Dynamically generated options that are suggested to the customer as responses or prompts. ',
    },
];

export const ChipExample: ComponentExample<ChipProps> = {
    render: ({ props, Component }) => <Component {...props} />,
    presets,
};
