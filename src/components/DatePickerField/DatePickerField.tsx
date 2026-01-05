import { DatePicker, DatePickerProps } from '-/components/DatePicker';
import { Field, FieldControlProps, propsWithAria } from '-/components/Field';
import { useId } from '-/hooks/useId';

export type DatePickerFieldProps = FieldControlProps<DatePickerProps>;

/**
 * A field wrapper for the DatePicker component.
 *
 * This component takes properties from the FormField and DatePicker components.
 *
 * @name DatePickerField
 * @phase UXReview
 *
 * @generated
 */
export function DatePickerField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    style,
    id: idProp,
    ...controlProps
}: DatePickerFieldProps) {
    const id = useId(idProp);
    return (
        <Field
            controlId={id}
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={labelTrailing}
            style={style}
        >
            <DatePicker {...propsWithAria({ id, controlProps, errorMessage, helperText })} />
        </Field>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
