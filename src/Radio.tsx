import './radio.scss';
import { ToggleControlProps, ElementProps } from './';

export type RadioProps = Pick<
    ToggleControlProps<HTMLInputElement>,
    'aria-label' | 'checked' | 'disabled' | 'invalid' | 'name' | 'onChange' | 'value'
>;

/**
 * A round control that allows user to choose one option from a set. This is the base element and if used directly you
 * must wrap it with a label. This will more often be used in the RadioOption or RadioGroup component.
 *
 * @element
 *
 * @name Radio
 */
function Radio(props: ElementProps<RadioProps, 'input'>) {
    const { checked = false, invalid, disabled, onChange, ...otherProps } = props;

    return (
        <span data-bspk="radio">
            <input
                {...otherProps}
                checked={!!checked}
                data-invalid={invalid || undefined}
                disabled={disabled || undefined}
                onChange={(event) => onChange(!!event.target.checked, event)}
                type="radio"
            />
            <span aria-hidden />
        </span>
    );
}

Radio.bspkName = 'Radio';

export { Radio };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
