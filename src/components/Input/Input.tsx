import './input.scss';
import { DEFAULT, InputElement, InputElementProps } from './InputElement';
import { useFieldInit } from '-/components/Field';
import { ElementProps } from '-/types/common';

export type InputProps = Omit<InputElementProps, 'ariaDescribedBy' | 'ariaErrorMessage'>;

/**
 * An input that allows users to enter text, numbers or symbols in a singular line.
 *
 * @example
 *     import { useState } from 'react';
 *     import { Input } from '@bspk/ui/Input';
 *     import { Field, FieldLabel } from '@bspk/ui/Field';
 *
 *     export function Example() {
 *         const [value, setValue] = useState<string>('');
 *
 *         return (
 *             <Field>
 *                 <FieldLabel>Example Label</FieldLabel>
 *                 <Input name="Example name" onChange={setValue} value={value} />
 *             </Field>
 *         );
 *     }
 *
 * @name Input
 * @phase UXReview
 */
export function Input({
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
    showClearButton: showClearButtonProp = true,
    owner,
    inputProps,
    ...props
}: ElementProps<InputProps, 'div'>) {
    const { id, ariaDescribedBy, ariaErrorMessage, invalid } = useFieldInit({
        id: idProp,
        required,
        readOnly,
        disabled,
        invalid: invalidProp,
    });

    return (
        // data-bspk="input" -- because InputElement already has it :)
        <InputElement
            {...props}
            aria-label={ariaLabel}
            ariaDescribedBy={ariaDescribedBy}
            ariaErrorMessage={ariaErrorMessage}
            autoComplete={autoComplete}
            containerRef={containerRef}
            disabled={disabled}
            id={id}
            inputProps={inputProps}
            inputRef={inputRef}
            invalid={invalid}
            leading={leading}
            name={name}
            onChange={onChange}
            owner={owner}
            placeholder={placeholder}
            readOnly={readOnly}
            showClearButton={showClearButtonProp}
            size={size}
            trailing={trailing}
            type={type}
            value={value}
        />
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
