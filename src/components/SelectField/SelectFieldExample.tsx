import { SelectFieldProps } from '.';
import { presets as selectPresets, SelectExample } from '-/components/Select/SelectExample';
import { ComponentExample } from '-/utils/demo';

export const presets = selectPresets.map((preset, index) => ({
    ...preset,
    propState: {
        ...preset.propState,
        controlId: `example-select-${index}`,
    },
}));

export const SelectFieldExample: ComponentExample<SelectFieldProps> = {
    defaultState: SelectExample.defaultState,
    presets,
};
