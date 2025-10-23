import './input.scss';
import { DEFAULT, InputElement, InputElementProps } from './InputElement';
import { useFieldInit } from '-/components/Field';
import { useId } from '-/hooks/useId';
import { ElementProps } from '-/types/common';

export type InputProps = Omit<InputElementProps, 'ariaDescribedBy' | 'ariaErrorMessage'>;

/**
 * An input that allows users to enter text, numbers or symbols in a singular line.
 *
 * For a more complete example with field usage, see the InputField component.
 *
 * @example
 *     import { useState } from 'react';
 *     import { Input } from '@bspk/ui/Input';
 *     import { Field, FieldLabel } from '@bspk/ui/Field';
 *
 *     function Example() {
 *         const [value, setValue] = useState('');
 *
 *         return (
 *             <Field>
 *                 <FieldLabel>Example Label</FieldLabel>
 *                 <Input name="example-name" onChange={setValue} value={value} />
 *                 <FieldDescription>This is an example input field.</FieldDescription>
 *             </Field>
 *         );
 *     }
 *
 *     function ExampleWithAriaLabel() {
 *         const [value, setValue] = useState('');
 *
 *         return <Input aria-label="Example Input" name="example-name" onChange={setValue} value={value} />;
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
    required = false,
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
    /** FieldInit > */
    const id = useId(idProp);
    const { ariaDescribedBy, ariaErrorMessage } = useFieldInit({
        htmlFor: id,
        required,
    });
    const invalid = !disabled && !readOnly && (invalidProp || !!ariaErrorMessage);
    /** < FieldInit */

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
