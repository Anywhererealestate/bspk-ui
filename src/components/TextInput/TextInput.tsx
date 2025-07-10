import { SvgCancel } from '@bspk/icons/Cancel';
import { ChangeEvent, HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, ReactNode } from 'react';

import { ElementProps, CommonProps, InvalidPropsLibrary, SetRef } from '-';
import { useId } from '-/hooks/useId';

import './text-input.scss';

export const DEFAULT = {
    size: 'medium',
    value: '',
    type: 'text' as Extract<HTMLInputTypeAttribute, 'number' | 'text'>,
    autoComplete: 'off',
} as const;

export type TextInputProps = CommonProps<
    'aria-label' | 'disabled' | 'id' | 'name' | 'readOnly' | 'required' | 'size' | 'value'
> &
    InvalidPropsLibrary & {
        /**
         * Callback when the value of the field changes.
         *
         * @required
         */
        onChange: (next: string, event?: ChangeEvent<HTMLInputElement>) => void;
        /** The ref of the container. */
        containerRef?: SetRef<HTMLDivElement>;
        /** The ref of the input. */
        inputRef?: SetRef<HTMLInputElement>;
        /**
         * The trailing element to display in the field.
         *
         * @exampleType string
         */
        trailing?: ReactNode;
        /**
         * The leading element to display in the field.
         *
         * @exampleType string
         */
        leading?: ReactNode;
        /** The placeholder of the field. */
        placeholder?: string;
        /**
         * The type of the input.
         *
         * @default text
         */
        type?: Extract<HTMLInputTypeAttribute, 'number' | 'text'>;
        /**
         * Specifies if user agent has any permission to provide automated assistance in filling out form field values
         *
         * @default off
         */
        autoComplete?: HTMLInputAutoCompleteAttribute;
        /**
         * Specifies if the clear button should be shown. This should almost always be true, but can be set to false.
         *
         * @default true
         */
        showClearButton?: boolean;
    };

/**
 * A text input that allows users to enter text, numbers or symbols in a singular line. This is the base element and is
 * not intended to be used directly. Use the TextField component.
 *
 * @example
 *     import { useState } from 'react';
 *     import { TextInput } from '@bspk/ui/TextInput';
 *
 *     export function Example() {
 *         const [value, setValue] = useState<string>('');
 *
 *         return <TextInput aria-label="Example aria-label" name="Example name" onChange={setValue} value={value} />;
 *     }
 *
 * @element
 *
 * @name TextInput
 * @phase DesignReview
 */
function TextInput({
    invalid: invalidProp,
    onChange,
    size = DEFAULT.size,
    value = DEFAULT.value,
    name,
    'aria-label': ariaLabel,
    inputRef,
    required,
    placeholder,
    id: idProp,
    leading,
    trailing,
    type = DEFAULT.type,
    readOnly,
    disabled,
    autoComplete = DEFAULT.autoComplete,
    containerRef,
    errorMessage,
    showClearButton = true,
    ...otherProps
}: ElementProps<TextInputProps, 'div'>) {
    const id = useId(idProp);

    const invalid = !readOnly && !disabled && invalidProp;

    return (
        <div
            data-bspk="text-input"
            data-clear-hidden={showClearButton === false || undefined}
            data-disabled={disabled || undefined}
            data-empty={!value.toString().length || undefined}
            data-invalid={invalid || undefined}
            data-readonly={readOnly || undefined}
            data-required={required || undefined}
            data-size={size}
            ref={containerRef}
            {...otherProps}
        >
            {leading && <span data-leading>{leading}</span>}

            <input
                aria-errormessage={errorMessage || undefined}
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
                value={value || ''}
            />

            {trailing && <span data-trailing>{trailing}</span>}

            {showClearButton !== false && (
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
