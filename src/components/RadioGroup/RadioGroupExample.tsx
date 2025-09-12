import { RadioGroupProps } from '.';
import { CheckboxGroupExample } from '-/components/CheckboxGroup/CheckboxGroupExample';
import { RadioExample } from '-/components/Radio/RadioExample';
import { ComponentExample } from '-/utils/demo';

export const presets = (CheckboxGroupExample.presets as ComponentExample<RadioGroupProps>['presets']) || [];

export const RadioGroupExample: ComponentExample<RadioGroupProps> = {
    render: RadioExample.render,
    presets,
};
