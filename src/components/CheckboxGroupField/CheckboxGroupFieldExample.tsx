import { CheckboxGroupFieldProps } from '.';
import { CheckboxGroupExample as checkboxGroupExample } from '-/components/CheckboxGroup/CheckboxGroupExample';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<CheckboxGroupFieldProps>[] = checkboxGroupExample.presets!.map((preset) => ({
    ...preset,
    propState: {
        label: 'Checkbox Group Field',
        ...preset.propState,
    },
}));

export const CheckboxGroupFieldExample: ComponentExample<CheckboxGroupFieldProps> = {
    presets,
    defaultState: {
        ...checkboxGroupExample.defaultState,
    },
};
