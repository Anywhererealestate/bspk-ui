import { DatePickerProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<DatePickerProps>[] = [];

export const DatePickerExample: ComponentExample<DatePickerProps> = {
    defaultState: {
        value: undefined,
    },
    disableProps: [],
    presets,
    sections: [],
    variants: false,
};
