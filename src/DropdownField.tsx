import { DropdownProps, Dropdown } from './Dropdown';
import { FormFieldProps, FormField } from './FormField';

export type DropdownFieldProps = Pick<
    DropdownProps,
    | 'disabled'
    | 'itemCount'
    | 'name'
    | 'onChange'
    | 'options'
    | 'placeholder'
    | 'placement'
    | 'readOnly'
    | 'size'
    | 'value'
> &
    Pick<FormFieldProps, 'controlId' | 'errorMessage' | 'helperText' | 'label' | 'labelTrailing' | 'required'>;

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and Dropdown components.
 *
 * @example
 *     import React from 'react';
 *
 *     import { DropdownField } from '@bspk/ui/DropdownField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState(['option1']);
 *         return (
 *             <DropdownField
 *                 controlId="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={(nextValue) => setState(nextValue)}
 *                 options={[
 *                     { label: 'Option 1', value: 'option1' },
 *                     { label: 'Option 2', value: 'option2' },
 *                     { label: 'Option 3', value: 'option3' },
 *                 ]}
 *                 placeholder="Select one..."
 *                 value={state}
 *             />
 *         );
 *     }
 *
 * @name DropdownField
 */
function DropdownField({
    label,
    errorMessage: errorMessageProp,
    helperText,
    controlId: id,
    labelTrailing,
    required,
    ...dropdownProps
}: DropdownFieldProps) {
    const errorMessage = (!dropdownProps.readOnly && !dropdownProps.disabled && errorMessageProp) || undefined;

    return (
        <FormField
            controlId={id}
            data-bspk="dropdown-field"
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => (
                <Dropdown {...dropdownProps} {...fieldProps} aria-label={label} id={id} invalid={!!errorMessage} />
            )}
        </FormField>
    );
}

DropdownField.bspkName = 'DropdownField';

export { DropdownField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
