import { FormField, FormFieldWrapProps } from '-/components/FormField';
import { NumberInputProps, NumberInput } from '-/components/NumberInput';

export type NumberFieldProps = FormFieldWrapProps<NumberInputProps>;

/**
 * A input element that allows users to either input a numerical value or singularly increase or decrease the values by
 * pressing the (+) or (-).
 *
 * This component takes properties from the FormField and NumberInput components.
 *
 * @example
 *     import React from 'react';
 *
 *     import { NumberField } from '@bspk/ui/NumberField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState<number>();
 *
 *         return (
 *             <NumberField
 *                 controlId="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={(nextValue) => setState(nextValue)}
 *                 value={state}
 *             />
 *         );
 *     }
 *
 * @name NumberField
 * @phase UXReview
 */
export function NumberField({
    label,
    errorMessage,
    disabled,
    helperText,
    controlId,
    labelTrailing,
    required,
    invalid,
    ...inputProps
}: NumberFieldProps) {
    return (
        <FormField
            controlId={controlId}
            data-bspk="number-field"
            errorMessage={errorMessage}
            helperText={helperText}
            invalid={invalid}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => (
                <NumberInput
                    {...inputProps}
                    {...fieldProps}
                    aria-label={label}
                    disabled={disabled}
                    id={controlId}
                    invalid={invalid}
                />
            )}
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
