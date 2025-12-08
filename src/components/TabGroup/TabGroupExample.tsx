import { TabGroupProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

const PRESET_OPTIONS: TabGroupProps['options'] = [
    {
        value: '1',
        label: 'Option 1',
        icon: undefined,
        iconSelected: undefined,
        badge: undefined,
    },
    {
        value: '2',
        label: 'Disabled 2',
        icon: undefined,
        iconSelected: undefined,
        badge: undefined,
        disabled: true,
    },
    {
        value: '3',
        label: 'Option 3',
        icon: undefined,
        iconSelected: undefined,
        badge: undefined,
    },
];

const OPTION_ICONS = [
    {
        icon: 'Diamond',
        iconSelected: 'DiamondFill',
    },

    {
        icon: 'Circle',
        iconSelected: undefined,
    },
    {
        icon: 'Square',
        iconSelected: 'SquareFill',
    },
];

export const presets: Preset<TabGroupProps>[] = [
    {
        label: 'With icons',
        propState: {
            value: '1',
            options: PRESET_OPTIONS.map((option, index) => ({
                ...option,
                icon: OPTION_ICONS[index].icon,
                iconSelected: OPTION_ICONS[index].iconSelected,
            })),
            label: 'Tabs with icons',
        },
    },
    {
        label: 'With badges',
        propState: {
            value: '1',
            options: PRESET_OPTIONS.map((option, index) => ({
                ...option,
                badge: Math.round((index + 1) * 2.6),
            })),
            label: 'Tabs with badges',
        },
    },
    {
        label: 'With icons & badges',
        propState: {
            value: '1',
            options: PRESET_OPTIONS.map((option, index) => ({
                ...option,
                icon: OPTION_ICONS[index].icon,
                iconSelected: OPTION_ICONS[index].iconSelected,
                badge: Math.round((index + 1) * 2.6),
            })),
            label: 'Tabs with icons & badges',
        },
    },
    {
        label: 'Long Text only',
        propState: {
            value: '1',
            options: PRESET_OPTIONS.map((option) => ({
                ...option,
                label: `${option.label} with a very long label that never seems to end and goes on forever`,
            })),
            label: 'Tabs with long text',
        },
    },
];

export const TabGroupExample: ComponentExample<TabGroupProps> = {
    defaultState: {
        options: PRESET_OPTIONS,
    },
    presets,

    variants: {
        showTrail: {
            width: 'hug',
        },
    },
};
