import { RadioGroupProps } from '.';
import { CheckboxGroupExample } from '-/components/Checkbox/CheckboxGroupExample';
import { ComponentExample } from '-/utils/demo';

export const presets = (CheckboxGroupExample.presets as ComponentExample<RadioGroupProps>['presets']) || [];

export const RadioGroupExample: ComponentExample<RadioGroupProps> = {
    presets,
};
