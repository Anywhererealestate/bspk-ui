import { Switch } from './Switch';
import { ToggleOptionProps, ToggleOption } from './ToggleOption';

import { ElementProps, CommonProps } from './';

export type SwitchGroupOption = Pick<
    ToggleOptionProps,
    'description' | 'label'
> &
    Required<CommonProps<'value'>>;

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
     * @example
     *     [
     *         { value: '1', label: 'Option 1' },
     *         { value: '2', label: 'Option 2' },
     *         { value: '3', label: 'Option 3' },
     *     ];
     *
     * @type Array<SwitchGroupOption>
     * @required
     */
    options: SwitchGroupOption[];
    /**
     * The values of the switches in the on state.
     *
     * @type Array<string>
     */
    value?: SwitchGroupProps['options'][number]['value'][];
};

/**
 * A group of switches that allows users to choose one or more items from a list
 * or turn an feature on or off.
 *
 * @example
 *     import { useState } from 'react';
 *     import { SwitchGroup } from '@bspk/ui/SwitchGroup';
 *
 *     export function Example() {
 *         const [enabledValues, setEnabledValues] = useState<string[]>([]);
 *
 *         return (
 *             <SwitchGroup
 *                 aria-label="Example aria-label"
 *                 name="Example name"
 *                 onChange={setEnabledValues}
 *                 options={[
 *                     { value: '1', label: 'Option 1' },
 *                     { value: '2', label: 'Option 2' },
 *                     { value: '3', label: 'Option 3' },
 *                 ]}
 *                 values={enabledValues}
 *             />
 *         );
 *     }
 *
 * @name SwitchGroup
 */
function SwitchGroup({
    onChange,
    options = [],
    name,
    value: values = [],
    ...props
}: ElementProps<SwitchGroupProps, 'div'>) {
    return (
        <div {...props} data-bspk="switch-group" role="group">
            {options.map(({ label, description, value }) => (
                <ToggleOption
                    description={description}
                    key={value}
                    label={label}
                >
                    <Switch
                        aria-label={label}
                        checked={values.includes(value)}
                        name={name}
                        onChange={(checked) => {
                            onChange(
                                checked
                                    ? [...values, value]
                                    : values.filter((v) => v !== value),
                            );
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
