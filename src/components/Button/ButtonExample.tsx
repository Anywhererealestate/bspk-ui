import { SvgFlagUnitedStates } from '@bspk/icons/FlagUnitedStates';
import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
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
        label: 'Custom',
        propState: {
            label: 'Country picker',
            variant: 'secondary',
            children: (
                <span
                    aria-hidden="true"
                    style={{
                        display: 'flex',
                        gap: 'var(--spacing-sizing-01)',
                        padding: '0 var(--spacing-sizing-01) 0 var(--spacing-sizing-02)',
                    }}
                >
                    <SvgFlagUnitedStates />
                    <SvgKeyboardArrowDown />
                </span>
            ),
        },
    },
];

export const ButtonExample: ComponentExample<ButtonProps> = {
    presets,
    variants: {
        iconOnly: () => ({ icon: <SvgPerson />, label: 'Person' }),
    },
};
