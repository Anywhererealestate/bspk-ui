import { ChangeEvent, useEffect, useRef } from 'react';

import { CommonProps, ElementProps, InvalidPropsLibrary } from '-/types/common';

import './checkbox.scss';

export type CheckboxProps = CommonProps<'aria-label' | 'disabled' | 'name'> &
    InvalidPropsLibrary &
    Required<CommonProps<'value'>> & {
        /**
         * If the checkbox is partially checked or
         * [indeterminate](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes).
         *
         * @default false
         */
        indeterminate?: boolean;
        /**
         * Marks the checkbox as checked.
         *
         * @default false
         */
        checked?: boolean;
        /**
         * The function to call when the checkbox is checked or unchecked.
         *
         * @required
         */
        onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
    };

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off. This is the base
 * element and if used directly you must wrap it with a label. This will more often be used in the CheckboxOption or
 * CheckboxGroup component.
 *
 * @example
 *     import { Checkbox } from '@bspk/ui/Checkbox';
 *
 *     function Example() {
 *         const [checked, setChecked] = React.useState(false);
 *
 *         return (
 *             <label htmlFor="sample-checkbox">
 *                 <Checkbox
 *                     aria-label="Sample"
 *                     checked={checked}
 *                     id="sample-checkbox"
 *                     name="sample-checkbox"
 *                     onChange={(nextChecked) => setChecked(nextChecked)}
 *                     value="sample"
 *                 />
 *                 Checkbox Label
 *             </label>
 *         );
 *     }
 *
 * @element
 *
 * @name Checkbox
 * @phase DesignReview
 */
function Checkbox({
    checked: checkedProp = false,
    indeterminate: indeterminateProp,
    invalid,
    disabled,
    errorMessage,

    ...props
}: ElementProps<CheckboxProps, 'input'>) {
    const indeterminate = !!indeterminateProp;
    const checked = !!checkedProp && !indeterminate;

    const inputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
        <span
            //
            data-bspk="checkbox"
        >
            <input
                {...props}
                aria-errormessage={errorMessage || undefined}
                aria-invalid={invalid || undefined}
                checked={checked}
                disabled={disabled || undefined}
                onChange={(event) => props.onChange(!!event.target.checked, event)}
                ref={(node) => {
                    if (!node) return;
                    inputRef.current = node;
                    node.indeterminate = indeterminate;
                }}
                type="checkbox"
            />
            <span aria-hidden>
                <svg data-checked fill="none" viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.485 10.182a1 1 0 0 1-1.414 0l-3.03-3.03a1 1 0 0 1 0-1.415l.14-.141a1 1 0 0 1 1.415 0l2.182 2.182 6.626-6.627a1 1 0 0 1 1.414 0l.142.142a1 1 0 0 1 0 1.414l-7.475 7.475Z"
                        fill="currentColor"
                    />
                </svg>
                <svg data-indeterminate fill="none" viewBox="0 0 12 4" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.44444 3.11089C0.892158 3.11089 0.444443 2.66318 0.444443 2.11089V1.88867C0.444443 1.33639 0.892158 0.888672 1.44444 0.888672H10.5556C11.1078 0.888672 11.5556 1.33639 11.5556 1.88867V2.11089C11.5556 2.66318 11.1078 3.11089 10.5556 3.11089H1.44444Z"
                        fill="currentColor"
                    />
                </svg>
            </span>
        </span>
    );
}

Checkbox.bspkName = 'Checkbox';

export { Checkbox };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
