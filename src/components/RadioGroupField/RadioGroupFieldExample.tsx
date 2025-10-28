import { RadioGroupFieldProps } from '.';
import { RadioGroupExample as radioGroupExample } from '-/components/RadioGroup/RadioGroupExample';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<RadioGroupFieldProps>[] = radioGroupExample.presets!.map((preset) => ({
    ...preset,
    propState: {
        label: 'Checkbox Group Field',
        ...preset.propState,
    },
}));

export const RadioGroupFieldExample: ComponentExample<RadioGroupFieldProps> = {
    presets,
    defaultState: {
        ...radioGroupExample.defaultState,
    },
};
