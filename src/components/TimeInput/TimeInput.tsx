import { SvgSchedule } from '@bspk/icons/Schedule';
import { useState } from 'react';
import { useCombobox } from '-/hooks/useCombobox';
import './time-input.scss';
import { TextInput, TextInputProps } from '-/components/TextInput';
import { Menu } from '../Menu';

const DEFAULT = {
    variant: 'none',
} as const;

export type TimeInputProps = Pick<
    TextInputProps,
    'aria-label' | 'disabled' | 'errorMessage' | 'id' | 'invalid' | 'name' | 'readOnly' | 'size'
> & {
    value?: string;
};

/**
 * Component description.
 *
 * @example
 *     import { TimeInput } from '@bspk/ui/TimeInput';
 *
 *     function Example() {
 *         return <TimeInput>Example TimeInput</TimeInput>;
 *     }
 *
 * @name TimeInput
 * @phase WorkInProgress
 */
function TimeInput({
    value,
    'aria-label': ariaLabel,
    disabled,
    errorMessage,
    id,
    invalid,
    readOnly,
    name,
    size,
}: TimeInputProps) {
    const [internalValue, setInternalValue] = useState(value);

    const {
        isOpen,
        toggleProps: { onClick, onKeyDownCapture, ...triggerProps },
        menuProps,
        closeMenu,
        elements,
    } = useCombobox({
        placement: 'bottom-start',
    });

    return (
        <>
            <TextInput
                aria-label={ariaLabel}
                autoComplete="off"
                containerRef={(node) => {
                    if (!node) return;
                    elements.setReference(node);
                }}
                data-bspk-owner="time-input"
                disabled={disabled}
                errorMessage={errorMessage}
                id={id}
                invalid={invalid}
                name={name}
                onChange={(next) => {
                    if (next === internalValue) return;
                    if (validTime(next)) setInternalValue(next);
                }}
                placeholder="--:-- PM"
                readOnly={readOnly}
                showClearButton={false}
                size={size}
                value={internalValue}
                {...triggerProps}
                trailing={<SvgSchedule />}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                type="text"
            />
            <Menu {...menuProps} data-bspk-owner="time-input">
                {/**
                 * Three scrollable columns for the time input
                 *
                 * 1. Hour
                 * 2. Minute
                 * 3. AM/PM
                 */}
                <div data-hour>
                    <span>1</span>
                </div>
                <div data-minute>
                    <span>00</span>
                </div>
                <div data-meridiem>
                    <span>PM</span>
                </div>
            </Menu>
        </>
    );
}

function validTime(value: string): boolean {
    const timePattern = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    return timePattern.test(value);
}

TimeInput.bspkName = 'TimeInput';

export { TimeInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
