import { Checkbox, CheckboxProps } from './Checkbox';
import { ToggleOption } from '-/components/ToggleOption';
import { ElementProps } from '-/types/common';
import { ComponentExample } from '-/utils/demo';

export const CheckboxExample: ComponentExample<ElementProps<CheckboxProps, 'input'>> = {
    defaultState: {
        disabled: false,
        value: 'option1',
        name: 'Checkbox group',
    },
    render: ({ props, setState }) => {
        return (
            <ToggleOption disabled={props.disabled} label="Example Option" readOnly={props.readOnly}>
                <Checkbox
                    {...props}
                    onChange={(checked) => {
                        setState({ checked });
                    }}
                />
            </ToggleOption>
        );
    },
};
