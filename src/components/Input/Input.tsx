import './input.scss';
import { SvgCancel } from '@bspk/icons/Cancel';
import { HTMLInputTypeAttribute, ReactNode, useMemo, useRef } from 'react';
import { Button } from '-/components/Button';
import { useTimeout } from '-/hooks/useTimeout';
import { CommonProps, ElementProps, SetRef, FieldControlProps } from '-/types/common';

export const DEFAULT = {
    size: 'medium',
    value: '',
    type: 'text' as Extract<HTMLInputTypeAttribute, 'number' | 'text'>,
    autoComplete: 'off',
} as const;

export type InputProps = CommonProps<'owner' | 'size'> &
    FieldControlProps & {
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
        type?: Extract<HTMLInputTypeAttribute, 'number' | 'password' | 'text'>;
        /**
         * Specifies if user agent has any permission to provide automated assistance in filling out form field values
         *
         * @default off
         */
        autoComplete?: 'off' | 'on';
        /**
         * Specifies if the clear button should be shown. This should almost always be true, but can be set to false.
         *
         * @default true
         */
        showClearButton?: boolean;
        /** Additional props to pass to the underlying input element. */
        inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputProps>;
    };

/**
 * An input that allows users to enter text, numbers or symbols in a singular line. This is a utility element and is not
 * intended to be used directly but rather through the Input, and other components.
 *
 * @example
 *     import { Input } from '@bspk/ui/Input';
 *
 *     () => {
 *         const [value, setValue] = useState<string>();
 *
 *         return (
 *             <div style={{ width: 320 }}>
 *                 <Field
 *                     controlId="example-control-id"
 *                     helperText="This is an example input field."
 *                     label="Example Input"
 *                 >
 *                     <Input id="example-control-id" name="example-name" onChange={setValue} value={value} />
 *                 </Field>
 *             </div>
 *         );
 *     };
 *
 * @name Input
 * @phase Utility
 */
export function Input({
    invalid,
    onChange,
    size = DEFAULT.size,
    value = DEFAULT.value,
    name,
    'aria-label': ariaLabel = 'Input',
    inputRef,
    required = false,
    placeholder,
    id,
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
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    ...props
}: ElementProps<InputProps, 'div'>) {
    const showClearButton = useMemo(
        () => showClearButtonProp !== false && !readOnly && !disabled && !!value?.toString().length,
        [showClearButtonProp, readOnly, disabled, value],
    );

    const inputRefInternal = useRef<HTMLInputElement | null>(null);

    const focusTimeout = useTimeout();

    return (
        <div
            {...props}
            data-bspk="input"
            data-bspk-owner={owner || undefined}
            data-disabled={disabled || undefined}
            data-empty={!value.toString().length || undefined}
            data-invalid={invalid || undefined}
            data-readonly={readOnly || undefined}
            data-show-clear-button={showClearButton || undefined}
            data-size={size}
            ref={containerRef}
        >
            {leading && <span data-leading>{leading}</span>}

            <input
                {...inputProps}
                aria-describedby={ariaDescribedBy || undefined}
                aria-errormessage={ariaErrorMessage || undefined}
                aria-invalid={invalid || undefined}
                aria-label={ariaLabel}
                autoComplete={autoComplete}
                data-main-input
                disabled={disabled || undefined}
                id={id}
                name={name}
                onBlur={(event) => {
                    inputProps?.onBlur?.(event);
                }}
                onChange={(event) => {
                    onChange(event.target.value, event);
                }}
                onFocus={(event) => {
                    inputProps?.onFocus?.(event);
                }}
                placeholder={placeholder || ' '}
                readOnly={readOnly || undefined}
                ref={(node) => {
                    if (!node) return;
                    inputRef?.(node);
                    inputRefInternal.current = node;
                }}
                required={required || undefined}
                type={type}
                value={value || ''}
            />
            {trailing && <span data-trailing>{trailing}</span>}
            {showClearButton && (
                <Button
                    data-clear-button
                    icon={<SvgCancel />}
                    iconOnly
                    label="Clear"
                    onClick={() => {
                        onChange('');
                        inputRefInternal.current?.focus();
                    }}
                    onFocus={() => {
                        focusTimeout.clear();
                    }}
                    size={size}
                    variant="tertiary"
                />
            )}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
