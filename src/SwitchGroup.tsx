import { Switch } from './Switch';
import { ToggleOption, ToggleOptionProps } from './ToggleOption';

import { ToggleControlProps, ElementProps, CommonProps } from './';

export type SwitchGroupOption = Pick<ToggleControlProps<HTMLInputElement>, 'value'> &
    Pick<ToggleOptionProps, 'description' | 'label'>;

export type SwitchGroupProps = CommonProps<'aria-label' | 'name'> & {
    /**
     * The function to call when the switches are changed.
     *
     * @required
     */
    onChange: (value: string[]) => void;
    /**
     * The options for the switches.
     *
     * @type SwitchGroupOption[]
     * @required
     */
    options: SwitchGroupOption[];
    /**
     * The values of the switches in the on state.
     *
     * @type string[]
     */
    values?: SwitchGroupProps['options'][number]['value'][];
};

/**
 * A group of switches that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * @name SwitchGroup
 */
function SwitchGroup({ onChange, options = [], name, values = [], ...props }: ElementProps<SwitchGroupProps, 'div'>) {
    return (
        <div {...props} data-control-group data-switch-group role="group">
            {options.map(({ label, description, value }) => (
                <ToggleOption description={description} key={value} label={label}>
                    <Switch
                        aria-label={label}
                        checked={values.includes(value)}
                        name={name}
                        onChange={(checked) => {
                            onChange(checked ? [...values, value] : values.filter((v) => v !== value));
                        }}
                        value={value}
                    />
                </ToggleOption>
            ))}
        </div>
    );
}

SwitchGroup.bspkName = 'SwitchGroup';

export { SwitchGroup };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
