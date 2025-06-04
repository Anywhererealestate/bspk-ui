import { Radio } from './Radio';
import { ToggleOptionProps, ToggleOption } from './ToggleOption';

import { ElementProps, CommonProps } from './';

export type RadioGroupOption = Pick<
    ToggleOptionProps,
    'description' | 'label'
> &
    Required<CommonProps<'value'>>;

export type RadioGroupProps = CommonProps<'name'> & {
    /**
     * The value of the control.
     *
     * @example
     *     1;
     *
     * @required
     */
    value: string;
    /**
     * The function to call when the radios are changed.
     *
     * @example
     *     (value) => setState({ value }),
     *
     * @required
     */
    onChange: (value: string) => void;
    /**
     * The options for the radios.
     *
     * @example
     *     [
     *         {
     *             value: '1',
     *             label: 'Option 1',
     *             description: 'Description here',
     *         },
     *         { value: '2', label: 'Option 2' },
     *         { value: '3', label: 'Option 3' },
     *     ];
     *
     * @type Array<RadioGroupOption>
     * @required
     */
    options: RadioGroupOption[];
    /**
     * The size of the radio group labels.
     *
     * @default base
     */
    size?: 'base' | 'large' | 'small';
};

/**
 * A group of radios that allows users to choose one or more items from a list
 * or turn an feature on or off.
 *
 * @example
 *     import { useState } from 'react';
 *     import { RadioGroup } from '@bspk/ui/RadioGroup';
 *
 *     export function Example() {
 *         const [selectedOption, setSelectedOption] = useState<string>('1');
 *
 *         return (
 *             <RadioGroup
 *                 name="Example name"
 *                 onChange={(nextValue) => setSelectedOption(nextValue)}
 *                 options={[
 *                     {
 *                         value: '1',
 *                         label: 'Option 1',
 *                         description: 'Description here',
 *                     },
 *                     { value: '2', label: 'Option 2' },
 *                     { value: '3', label: 'Option 3' },
 *                 ]}
 *                 value={selectedOption}
 *             />
 *         );
 *     }
 *
 * @name RadioGroup
 */
function RadioGroup({
    onChange,
    options = [],
    name,
    value: groupValue,
    size = 'base',
    ...props
}: ElementProps<RadioGroupProps, 'div'>) {
    return (
        <div
            {...props}
            data-bspk="radio-group"
            role="radiogroup"
            style={{ display: 'contents' }}
        >
            {options.map(({ label, description, value }, index) => {
                return (
                    <ToggleOption
                        description={description}
                        key={`toggle-option-${value || index}`}
                        label={label}
                        size={size}
                    >
                        <Radio
                            aria-label={label}
                            checked={groupValue === value}
                            name={name}
                            onChange={(checked) => checked && onChange(value)}
                            value={value}
                        />
                    </ToggleOption>
                );
            })}
        </div>
    );
}

RadioGroup.bspkName = 'RadioGroup';

export { RadioGroup };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
