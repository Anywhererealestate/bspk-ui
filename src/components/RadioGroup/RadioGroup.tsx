import { Radio } from '-/components/Radio';
import { ToggleOptionProps, ToggleOption } from '-/components/ToggleOption';
import { useId } from '-/hooks/useId';
import { ElementProps, CommonProps } from '-/types/common';

import './radio-group.scss';

export type RadioGroupOption = Pick<ToggleOptionProps, 'description' | 'label'> & Required<CommonProps<'value'>>;

export type RadioGroupProps = CommonProps<'disabled' | 'name'> & {
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
     *         },
     *         {
     *             value: '2',
     *             label: 'Option 2',
     *             description: 'Description here',
     *         },
     *         { value: '3', label: 'Option 3' },
     *     ];
     *
     * @type Array<RadioGroupOption>
     * @required
     */
    options: RadioGroupOption[];
    /**
     * The label of the radio group.
     *
     * @required
     */
    label: string;
    /**
     * Shows the RadioGroup label. When label isn't showing it is used as the aria-label prop.
     *
     * @default true
     */
    showLabel?: boolean;
};

/**
 * A group of radios that allows users to choose one or more items from a list or turn an feature on or off.
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
 * @phase DesignReview
 */
function RadioGroup({
    onChange,
    options = [],
    name,
    value: groupValue,
    label: groupLabel,
    showLabel = true,
    disabled,
    ...props
}: ElementProps<RadioGroupProps, 'div'>) {
    const id = `radio-group-${useId()}`;

    return (
        <div
            {...props}
            aria-labelledby={showLabel ? `${id}-label` : undefined}
            data-bspk="radio-group"
            data-disabled={disabled || undefined}
            id={id}
            role="group"
        >
            {showLabel && <label id={`${id}-label`}>{groupLabel}</label>}
            <div role="radiogroup">
                {options.map(({ label, description, value }, index) => {
                    return (
                        <ToggleOption description={description} key={`toggle-option-${value || index}`} label={label}>
                            <Radio
                                aria-label={label}
                                checked={groupValue === value}
                                disabled={disabled}
                                name={name}
                                onChange={(checked) => checked && onChange(value)}
                                value={value}
                            />
                        </ToggleOption>
                    );
                })}
            </div>
        </div>
    );
}

RadioGroup.bspkName = 'RadioGroup';

export { RadioGroup };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
