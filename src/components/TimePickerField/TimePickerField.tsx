import { Field, FieldControlProps, propsWithAria } from '-/components/Field';
import { TimePicker, TimePickerProps } from '-/components/TimePicker';
import { useId } from '-/hooks/useId';

export type TimePickerFieldProps = FieldControlProps<TimePickerProps>;

/**
 * A field wrapper for the TimePicker component.
 *
 * This component takes properties from the FormField and TimePicker components.
 *
 * @name TimePickerField
 * @phase UXReview
 *
 * @generated
 */
export function TimePickerField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    style,
    id: idProp,
    ...controlProps
}: TimePickerFieldProps) {
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
            <TimePicker {...propsWithAria({ id, controlProps, errorMessage, helperText })} />
        </Field>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
