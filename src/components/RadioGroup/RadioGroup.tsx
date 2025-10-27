import './radio-group.scss';
import { useFieldInit } from '-/components/Field';
import { RadioProps } from '-/components/Radio';
import { RadioOption, RadioOptionProps } from '-/components/RadioOption';
import { ElementProps, FieldControlProps } from '-/types/common';

export type RadioGroupOption = Pick<RadioOptionProps, 'checked' | 'description' | 'disabled' | 'label'> &
    Pick<RadioProps, 'value'>;

export type RadioGroupProps = FieldControlProps & {
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
};

/**
 * A group of radios that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * @example
 *     import { useState } from 'react';
 *     import { RadioGroup } from '@bspk/ui/RadioGroup';
 *
 *     function Example() {
 *         const [selectedOption, setSelectedOption] = useState<string>('1');
 *
 *         return (
 *             <RadioGroup
 *                 name="example-name"
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
    disabled = false,
    readOnly,
    invalid: invalidProp,
    required,
    id: idProp,
    'aria-describedby': ariaDescribedByProp,
    'aria-errormessage': ariaErrorMessageProp,
    ...props
}: ElementProps<RadioGroupProps, 'div'>) {
    const { id, ariaDescribedBy, ariaErrorMessage, invalid } = useFieldInit({
        idProp,
        required,
        disabled,
        readOnly,
        invalidProp,
    });

    return (
        <div
            {...props}
            aria-describedby={ariaDescribedByProp || ariaDescribedBy || undefined}
            data-bspk="radio-group"
            id={id}
            role="radiogroup"
        >
            {options.map(({ label, description, value, ...option }, index) => {
                return (
                    <RadioOption
                        aria-describedby={ariaDescribedByProp || ariaDescribedBy || undefined}
                        aria-errormessage={ariaErrorMessageProp || ariaErrorMessage || undefined}
                        checked={groupValue === value}
                        description={description}
                        disabled={disabled || option.disabled}
                        invalid={invalid || undefined}
                        key={`radio-option-${value || index}`}
                        label={label}
                        name={name}
                        onChange={(checked) => checked && onChange(value)}
                        required={required}
                        value={value}
                    />
                );
            })}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
