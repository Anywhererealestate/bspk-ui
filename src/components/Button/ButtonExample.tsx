import { SvgPerson } from '@bspk/icons/Person';
import { ButtonProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<ButtonProps>[] = [
    {
        label: 'Icon & Text',
        propState: {
            icon: 'Add',
            label: 'Add',
            iconOnly: false,
        },
    },
    {
        label: 'Text only',
        propState: {
            label: 'Add',
            icon: undefined,
            iconOnly: false,
        },
    },
    {
        label: 'Icon only',
        propState: {
            iconOnly: true,
            icon: 'Add',
            label: 'Add',
        },
    },
    {
        label: 'With aria-label',
        propState: {
            iconOnly: false,
            icon: 'Add',
            label: 'Add',
            'aria-label': 'Custom aria-label',
        },
    },
];

export const ButtonExample: ComponentExample<ButtonProps> = {
    presets,
    variants: {
        iconOnly: () => ({ icon: <SvgPerson />, label: 'Person' }),
    },
};
