import { Radio } from './Radio';
import { ToggleOptionProps, ToggleOption } from './ToggleOption';

import { ElementProps, CommonProps } from './';

export type RadioGroupOption = Pick<ToggleOptionProps, 'description' | 'label'> & Required<CommonProps<'value'>>;

export type RadioGroupProps = CommonProps<'name' | 'value'> & {
    /**
     * The function to call when the radios are changed.
     *
     * @required
     */
    onChange: (value: string) => void;
    /**
     * The options for the radios.
     *
     * @type RadioGroupOption[]
     * @required
     */
    options: RadioGroupOption[];
    /** The size of the radio group labels. */
    size?: 'base' | 'large' | 'small';
};

/**
 * A group of radios that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * @name RadioGroup
 */
function RadioGroup({
    onChange,
    options = [],
    name,
    value: groupValue,
    size,
    ...props
}: ElementProps<RadioGroupProps, 'div'>) {
    return (
        <div {...props} data-bspk="radio-group" role="radiogroup" style={{ display: 'contents' }}>
            {options.map(({ label, description, value }) => {
                return (
                    <ToggleOption description={description} key={value} label={label} size={size}>
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
