import { ChipUtilityProps } from '../../ChipUtility';
import { ComponentExample } from '../utils';

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
            },
        },
        {
            label: 'Trailing Icon',
            propState: {
                label: 'chip',
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
    ],
};
