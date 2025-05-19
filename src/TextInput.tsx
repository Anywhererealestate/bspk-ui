import { SvgCancel } from '@bspk/icons/Cancel';
import './text-input.scss';
import { ChangeEvent, HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, ReactNode } from 'react';

import { useId } from './hooks/useId';

import { ElementProps, CommonProps } from '.';

export type TextInputProps = CommonProps<
    'aria-label' | 'disabled' | 'id' | 'invalid' | 'name' | 'readOnly' | 'required' | 'size' | 'value'
> & {
    /**
     * Callback when the value of the field changes.
     *
     * @type (next: String, Event) => void
     * @required
     */
    onChange: (next: string, event?: ChangeEvent<HTMLInputElement>) => void;
    /** The ref of the container. */
    containerRef?: (node: HTMLElement | null) => void;
    /** The ref of the input. */
    inputRef?: (node: HTMLElement | null) => void;
    /** The trailing element to display in the field. */
    trailing?: ReactNode;
    /** The leading element to display in the field. */
    leading?: ReactNode;
    /** The placeholder of the field. */
    placeholder?: string;
    /** The type of the input. */
    type?: Extract<HTMLInputTypeAttribute, 'number' | 'text'>;
    /**
     * Specifies if user agent has any permission to provide automated assistance in filling out form field values.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
     *
     * @default off
     */
    autoComplete?: HTMLInputAutoCompleteAttribute;
};

/**
 * A text input that allows users to enter text, numbers or symbols in a singular line. This is the base element and is
 * not intended to be used directly. Use the TextField component.
 *
 * @element
 *
 * @name TextInput
 */
function TextInput({
    invalid: invalidProp,
    onChange,
    size = 'medium',
    value = '',
    name,
    'aria-label': ariaLabel,
    inputRef,
    required,
    placeholder,
    id: idProp,
    leading,
    trailing,
    type,
    readOnly,
    disabled,
    autoComplete = 'off',
    containerRef,
    ...otherProps
}: ElementProps<TextInputProps, 'div'>) {
    const id = useId(idProp);

    const invalid = !readOnly && !disabled && invalidProp;

    return (
        <div
            data-bspk="text-input"
            data-disabled={disabled || undefined}
            data-invalid={invalid || undefined}
            data-readonly={readOnly || undefined}
            data-required={required || undefined}
            data-size={size}
            ref={containerRef}
            {...otherProps}
        >
            {leading && <span data-leading>{leading}</span>}
            <input
                aria-invalid={invalid || undefined}
                aria-label={ariaLabel}
                autoComplete={autoComplete}
                disabled={disabled || undefined}
                id={id}
                name={name}
                onChange={(event) => {
                    onChange(event.target.value, event);
                }}
                placeholder={placeholder || ' '}
                readOnly={readOnly || undefined}
                ref={inputRef}
                required={required || undefined}
                type={type}
                value={value}
            />
            {trailing && <span data-trailing>{trailing}</span>}
            {value?.toString().length > 0 && !readOnly && !disabled && (
                <button aria-label="clear" data-clear onClick={() => onChange('')}>
                    <SvgCancel />
                </button>
            )}
        </div>
    );
}

TextInput.bspkName = 'TextInput';

export { TextInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
