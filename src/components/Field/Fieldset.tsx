import './field.scss';

import { FieldProps } from './Field';
import { labelledById, errorMessageId, describedById } from './utils';
import { InlineAlert } from '-/components/InlineAlert';

/**
 * Wrapper component for form controls.
 *
 * Children should be one of the following: DatePicker, Input, InputNumber, InputPhone, Password, Select, Textarea, or
 * TimePicker.
 *
 * @example
 *     import { Input } from '@bspk/ui/Input';
 *     import { Fieldset } from '@bspk/ui/Field';
 *
 *     () => {
 *         const [state, setState] = useState<string | undefined>(undefined);
 *         const [error, setError] = useState<string | undefined>(undefined);
 *
 *         return (
 *             <Fieldset
 *                 label="Example label"
 *                 helperText="This is an example description."
 *                 errorMessage={error}
 *                 required
 *             >
 *                 <Input
 *                     aria-label="example aria-label"
 *                     name="example-text"
 *                     onChange={(next) => {
 *                         setState(next);
 *                     }}
 *                     value={state}
 *                 />
 *             </Fieldset>
 *         );
 *     };
 *
 * @name Fieldset
 * @phase Utility
 */
export function Fieldset({
    children,
    label,
    helperText,
    labelTrailing,
    errorMessage,
    required,
    controlId: id,
    ...props
}: FieldProps) {
    return (
        <fieldset {...props} data-bspk-utility="field" role="group">
            <legend data-field-label id={labelledById(id)}>
                <span>{label}</span>
                {required && <span data-required>{' (Required)'}</span>}
                {labelTrailing && (
                    <span aria-hidden data-trailing>
                        {labelTrailing}
                    </span>
                )}
            </legend>
            {children}
            {errorMessage ? (
                <InlineAlert id={errorMessageId(id)} label={errorMessage} owner="field-error" variant="error" />
            ) : (
                helperText && (
                    <p data-field-description id={describedById(id)}>
                        {helperText}
                    </p>
                )
            )}
        </fieldset>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
