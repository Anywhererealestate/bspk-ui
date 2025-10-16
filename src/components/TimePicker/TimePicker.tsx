import './time-picker.scss';
import { SvgSchedule } from '@bspk/icons/Schedule';
import { FocusTrap } from 'focus-trap-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TimePickerListbox } from './Listbox';
import { TimePickerSegment } from './Segment';
import { Button } from '-/components/Button';
import { FieldContextProps, useFieldInit } from '-/components/Field';
import { InputProps } from '-/components/Input';
import { Menu } from '-/components/Menu';
import { Portal } from '-/components/Portal';
import { useFloating } from '-/hooks/useFloating';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { ElementProps } from '-/types/common';
import { handleKeyDown } from '-/utils/handleKeyDown';

export const MINUTE_OPTIONS = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
export const HOUR_OPTIONS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
export const MERIDIEM_OPTIONS = ['AM', 'PM'];

type Minute = (typeof MINUTE_OPTIONS)[number];
type Hour = (typeof HOUR_OPTIONS)[number];
type Meridiem = (typeof MERIDIEM_OPTIONS)[number];

export type TimePickerProps = Partial<FieldContextProps> &
    Pick<InputProps, 'name' | 'size'> & {
        value?: string;
    };

/**
 * An input field that allows a customer to manually type in a specific time or triggers a time picker combobox to
 * select a date.
 *
 * @example
 *     import { TimePicker } from '@bspk/ui/TimePicker';
 *
 *     function Example() {
 *         return (
 *             <Field>
 *                 <FieldLabel>Time</FieldLabel>
 *                 <TimePicker />
 *                 <FieldDescription>The time picker allows you to select a time.</FieldDescription>
 *             </Field>
 *         );
 *     }
 *
 * @name TimePicker
 * @phase UXReview
 */
export function TimePicker({
    value,
    disabled,
    id: idProp,
    invalid: invalidProp,
    readOnly,
    name,
    size,
    required: requiredProp,
    ...props
}: ElementProps<TimePickerProps, 'div'>) {
    const {
        id,
        ariaDescribedBy,
        ariaErrorMessage,
        invalid: hasError,
    } = useFieldInit({
        id: idProp,
        readOnly,
        disabled,
        invalid: invalidProp,
        required: requiredProp,
    });
    const invalid = !readOnly && !disabled && (invalidProp || hasError);

    const [inputValue, setInputValue] = useState(value);

    const [hours, setHours] = useState<(typeof HOUR_OPTIONS)[number]>();
    const [minutes, setMinutes] = useState<(typeof MINUTE_OPTIONS)[number]>();
    const [meridiem, setMeridiem] = useState<(typeof MERIDIEM_OPTIONS)[number]>('AM');

    useEffect(() => {
        setInputValue(
            `${hours?.toString().padStart(2, '0')}:${minutes?.toString().padStart(2, '0')} ${meridiem || ''}`.trim(),
        );
        if (hours !== undefined && minutes === undefined) setMinutes('00');
    }, [hours, minutes, meridiem]);

    const [open, setOpenState] = useState(false);

    const { floatingStyles, elements } = useFloating({
        strategy: 'fixed',
        refWidth: true,
        offsetOptions: 4,
        hide: !open,
    });

    const setOpen = useCallback(
        (nextOpen: boolean) => {
            setOpenState(nextOpen);

            if (!elements.reference || !buttonRef.current) return;

            // Focus the button when closing the menu
            if (!nextOpen && open) buttonRef.current.focus();

            // Focus the hours listbox when opening the menu
            if (nextOpen && !open)
                elements.reference.querySelector<HTMLElement>('[data-scroll-column="hours"]')?.focus();
        },
        [elements?.reference, open],
    );

    useOutsideClick({ elements: [elements.floating], callback: () => setOpen(false), disabled: !open });

    const { hourOptions, minuteOptions, meridiemOptions } = useMemo(
        () => ({
            hourOptions: HOUR_OPTIONS.map((h) => ({
                id: `${id}-hours-${h}`,
                value: h,
                label: h.toString().padStart(2, '0'),
            })),
            minuteOptions: MINUTE_OPTIONS.map((m) => ({
                id: `${id}-minutes-${m}`,
                value: m,
                label: m.toString().padStart(2, '0'),
            })),
            meridiemOptions: MERIDIEM_OPTIONS.map((m) => ({
                id: `${id}-meridiem-${m}`,
                value: m,
                label: m,
            })),
        }),
        [id],
    );

    const listBoxRefs = useRef<{
        hours?: HTMLElement | null;
        minutes?: HTMLElement | null;
        meridiem?: HTMLElement | null;
    } | null>(null);
    const buttonRef = useRef<HTMLElement | null>(null);

    return (
        <>
            <div
                {...props}
                aria-describedby={ariaErrorMessage || ariaDescribedBy || undefined}
                data-bspk="time-picker"
                data-disabled={disabled || undefined}
                data-invalid={invalid || undefined}
                data-name={name || undefined}
                data-open={open || undefined}
                data-readonly={readOnly || undefined}
                data-size={size || undefined}
                data-value={inputValue || undefined}
                id={id}
                onClickCapture={() => {
                    if (disabled || readOnly) return;
                    elements.reference?.querySelector<HTMLElement>('[tabIndex]')?.focus();
                }}
                onKeyDownCapture={handleKeyDown({ Escape: () => setOpen(false) })}
                ref={(node) => {
                    elements.setReference(node);
                }}
                role="group"
                tabIndex={disabled || readOnly ? -1 : 0}
            >
                <TimePickerSegment
                    disabled={disabled}
                    name={`${name}-hours`}
                    onChange={(next) => setHours(next || undefined)}
                    readOnly={readOnly}
                    type="hours"
                    value={hours}
                />
                <span aria-hidden="true">:</span>
                <TimePickerSegment
                    disabled={disabled}
                    name={`${name}-minutes`}
                    onChange={(next) => setMinutes(next || undefined)}
                    readOnly={readOnly}
                    type="minutes"
                    value={minutes}
                />
                <TimePickerSegment
                    disabled={disabled}
                    name={`${name}-meridiem`}
                    onChange={(next) => setMeridiem(next || 'AM')}
                    readOnly={readOnly}
                    type="meridiem"
                    value={meridiem}
                />
                <Button
                    disabled={disabled || readOnly}
                    icon={<SvgSchedule />}
                    iconOnly
                    innerRef={(node) => {
                        buttonRef.current = node;
                    }}
                    label={`${open ? 'Close' : 'Open'} Time Picker`}
                    onClick={() => setOpen(!open)}
                    variant="tertiary"
                />
            </div>
            {!!open && (
                <Portal>
                    <Menu
                        innerRef={(node) => {
                            if (!node) return;
                            elements.setFloating(node as HTMLElement);
                        }}
                        label="Select time"
                        owner="time-picker"
                        style={floatingStyles}
                    >
                        <FocusTrap
                            focusTrapOptions={{
                                fallbackFocus: () => listBoxRefs.current!.hours!,
                                clickOutsideDeactivates: true,
                            }}
                        >
                            <div
                                data-scroll-values
                                ref={(node) => {
                                    listBoxRefs.current = {
                                        hours: node?.querySelector('[data-scroll-column="hours"]') as HTMLElement,
                                        minutes: node?.querySelector('[data-scroll-column="minutes"]') as HTMLElement,
                                        meridiem: node?.querySelector('[data-scroll-column="meridiem"]') as HTMLElement,
                                    };
                                    listBoxRefs.current.hours?.focus();
                                }}
                            >
                                <TimePickerListbox
                                    onSelect={(next) => {
                                        setHours(next as Hour);
                                        setTimeout(() => listBoxRefs.current?.minutes?.focus(), 10);
                                    }}
                                    options={hourOptions}
                                    selectedValue={hours}
                                    type="hours"
                                />
                                <TimePickerListbox
                                    onSelect={(next) => {
                                        setMinutes(next as Minute);
                                        setTimeout(() => listBoxRefs.current?.meridiem?.focus(), 10);
                                    }}
                                    options={minuteOptions}
                                    selectedValue={minutes}
                                    type="minutes"
                                />
                                <TimePickerListbox
                                    onSelect={(next) => {
                                        setMeridiem(next as Meridiem);
                                        setOpen(false);
                                        setTimeout(() => buttonRef.current?.focus(), 10);
                                    }}
                                    options={meridiemOptions}
                                    selectedValue={meridiem}
                                    type="meridiem"
                                />
                            </div>
                        </FocusTrap>
                    </Menu>
                </Portal>
            )}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
