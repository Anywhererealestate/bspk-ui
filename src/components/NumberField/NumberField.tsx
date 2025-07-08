import { FormFieldProps, FormField } from '-/components/FormField';
import { NumberInputProps, NumberInput } from '-/components/NumberInput';

export type NumberFieldProps = Pick<
    NumberInputProps,
    | 'align'
    | 'disabled'
    | 'errorMessage'
    | 'id'
    | 'invalid'
    | 'max'
    | 'min'
    | 'name'
    | 'onChange'
    | 'readOnly'
    | 'size'
    | 'value'
> &
    Pick<FormFieldProps, 'controlId' | 'helperText' | 'label' | 'labelTrailing' | 'required'>;

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
 * @phase DesignReview
 */
function NumberField({
    label,
    errorMessage: errorMessageProp,
    helperText,
    controlId,
    labelTrailing,
    required,
    ...inputProps
}: NumberFieldProps) {
    const errorMessage = (!inputProps.readOnly && !inputProps.disabled && errorMessageProp) || undefined;

    return (
        <FormField
            controlId={controlId}
            data-bspk="number-field"
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => <NumberInput {...inputProps} {...fieldProps} aria-label={label} id={controlId} />}
        </FormField>
    );
}

NumberField.bspkName = 'NumberField';

export { NumberField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
