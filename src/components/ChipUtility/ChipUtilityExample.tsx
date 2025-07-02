import { ChipUtilityProps } from '-/components/ChipUtility';
import { ComponentExample } from '-/utils/demo';

export const ChipUtilityExample: ComponentExample<ChipUtilityProps> = {
    presets: [
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
    ],
};
