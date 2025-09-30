import './radio-group.scss';
import { RadioOption, RadioOptionProps } from '-/components/RadioOption';
import { useId } from '-/hooks/useId';
import { ElementProps, CommonProps, FormFieldControlProps } from '-/types/common';

export type RadioGroupOption = Pick<RadioOptionProps, 'checked' | 'description' | 'disabled' | 'label' | 'name'> &
    Required<CommonProps<'value'>>;

export type RadioGroupProps = CommonProps<'disabled' | 'name'> &
    FormFieldControlProps & {
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
    label: groupLabel,
    hideLabel: hideLabelProp = false,
    disabled: disabledGroup = false,
    ...props
}: ElementProps<RadioGroupProps, 'div'>) {
    const id = `radio-group-${useId()}`;

    return (
        <div
            {...props}
            aria-describedby={props['aria-describedby']}
            aria-errormessage={props['aria-errormessage']}
            aria-label={hideLabelProp ? groupLabel : undefined}
            aria-labelledby={!hideLabelProp ? `${id}-label` : undefined}
            data-bspk="radio-group"
            id={id}
            role="radiogroup"
        >
            {!hideLabelProp && <label id={`${id}-label`}>{groupLabel}</label>}
            <div role="presentation">
                {options.map(({ label, description, disabled, value }, index) => {
                    return (
                        <RadioOption
                            checked={groupValue === value}
                            description={description}
                            disabled={disabledGroup || disabled}
                            key={`radio-option-${value || index}`}
                            label={label}
                            name={name}
                            onChange={(checked) => checked && onChange(value)}
                            value={value}
                        />
                    );
                })}
            </div>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
