import { CheckboxGroupFieldProps } from '.';
import { CheckboxGroupExample as controlExample } from '-/components/CheckboxGroup/CheckboxGroupExample';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<CheckboxGroupFieldProps>[] = controlExample.presets!.map((preset) => ({
    ...preset,
    propState: {
        ...preset.propState,
        label: 'Checkbox Group Field Label',
        description: 'This is a description for the checkbox group field.',
        errorMessage: 'This is an error message for the checkbox group field.',
    },
}));

export const CheckboxGroupFieldExample: ComponentExample<CheckboxGroupFieldProps> = {
    defaultState: {
        ...controlExample.defaultState,
    },
    disableProps: [],
    presets,
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
    variants: false,
};
