import { RadioGroupProps } from '.';
import { CheckboxGroupExample } from '-/components/Checkbox/CheckboxGroupExample';
import { ComponentExample } from '-/utils/demo';
import { randomString } from '-/utils/random';

export const presets = (CheckboxGroupExample.presets as ComponentExample<RadioGroupProps>['presets']) || [];

export const RadioGroupExample: ComponentExample<RadioGroupProps> = {
    presets,
    render: ({ props, Component }) => {
        const id = `radio-group-example-${randomString(5)}`;

        return <Component {...props} id={id} />;
    },
    variants: false,
};
