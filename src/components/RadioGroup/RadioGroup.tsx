import './radio-group.scss';
import { RadioGroupItem } from './RadioGroupItem';
import { ToggleOption, ToggleOptionProps } from '-/components/ToggleOption';
import { useId } from '-/hooks/useId';
import { ElementProps, CommonProps } from '-/types/common';

export type RadioGroupOption = Pick<ToggleOptionProps, 'description' | 'disabled' | 'label'> &
    Required<CommonProps<'value'>>;

export type RadioGroupProps = CommonProps<'disabled' | 'id' | 'name'> & {
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
     * Hides the RadioGroup label. When label isn't showing it is used as the aria-label prop.
     *
     * @default false
     */
    hideLabel?: boolean;
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
 * @phase UXReview
 */
export function RadioGroup({
    onChange,
    options = [],
    name,
    value: groupValue,
    hideLabel: hideLabelProp = false,
    disabled: disabledGroup = false,
    id: idProp,
    ...props
}: ElementProps<RadioGroupProps, 'div'>) {
    const id = `radio-group-${useId(idProp)}`;

    return (
        <div
            {...props}
            aria-describedby={props['aria-describedby']}
            aria-errormessage={props['aria-errormessage']}
            aria-labelledby={!hideLabelProp ? `${id}-label` : undefined}
            data-bspk="radio-group"
            id={id}
            role="radiogroup"
        >
            {options.map(({ label, description, disabled, value }, index) => {
                return (
                    <ToggleOption
                        data-bspk="radio-group-item-option"
                        description={description}
                        disabled={disabled}
                        key={`radio-group-item-option-${value || index}`}
                        label={label}
                    >
                        <RadioGroupItem
                            checked={groupValue === value}
                            disabled={disabled || disabledGroup}
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
