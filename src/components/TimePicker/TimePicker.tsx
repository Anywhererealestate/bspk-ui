import './time-picker.scss';
import { SvgSchedule } from '@bspk/icons/Schedule';
import { FocusTrap } from 'focus-trap-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { TimePickerListbox } from './Listbox';
import { TimePickerSegment } from './Segment';
import {
    HOUR_OPTIONS,
    MINUTE_OPTIONS,
    MERIDIEM_OPTIONS,
    Meridiem,
    partsToStringValue,
    stringValueToParts,
} from './utils';
import { Button } from '-/components/Button';
import { useFieldInit } from '-/components/Field';
import { InputProps } from '-/components/Input';
import { Menu } from '-/components/Menu';
import { Portal } from '-/components/Portal';
import { useFloating } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { ElementProps, FieldControlProps } from '-/types/common';
import { handleKeyDown } from '-/utils/handleKeyDown';

export type TimePickerProps = FieldControlProps & Pick<InputProps, 'size'>;

/**
 * An input field that allows a customer to manually type in a specific time or triggers a time picker combobox to
 * select a date.
 *
 * For a more complete example with field usage, see the TimePickerField component.
 *
 * @example
 *     import { TimePicker } from '@bspk/ui/TimePicker';
 *
 *     function ExampleStandalone() {
 *         const [value, onChange] = React.useState('');
 *
 *         return <TimePicker aria-label="Time" name="time" value={value} onChange={onChange} />;
 *     }
 *
 *     function ExampleWithField() {
 *         const [value, onChange] = React.useState('');
 *
 *         return (
 *             <Field>
 *                 <FieldLabel>Time</FieldLabel>
 *                 <TimePicker value={value} onChange={onChange} />
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
    required = false,
    onChange: onChangeProp,
    'aria-label': ariaLabel = 'Time picker',
    ...props
}: ElementProps<TimePickerProps, 'div'>) {
    /** FieldInit > */
    const id = useId(idProp);
    const { ariaDescribedBy, ariaErrorMessage } = useFieldInit({
        htmlFor: id,
        required,
    });
    const invalid = !disabled && !readOnly && (invalidProp || !!ariaErrorMessage);
    /** < FieldInit */

    const menuId = `${id}-time-picker-menu`;

    const { hours, minutes, meridiem } = useMemo(() => stringValueToParts(value || '00:00'), [value]);

    const setValue = useCallback(
        (
            params: Partial<{
                hours?: string;
                minutes?: string;
                meridiem?: Meridiem;
            }>,
        ) => {
            const nextValue = { hours, minutes, meridiem, ...params };
            onChangeProp(
                partsToStringValue(nextValue.hours?.toString(), nextValue.minutes?.toString(), nextValue.meridiem),
            );
        },
        [hours, minutes, meridiem, onChangeProp],
    );

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

    const [firstField, setFirstField] = useState<HTMLElement | null>(null);

    return (
        <>
            <div
                {...props}
                aria-describedby={ariaErrorMessage || ariaDescribedBy || undefined}
                aria-label={ariaLabel || undefined}
                data-bspk="time-picker"
                data-disabled={disabled || undefined}
                data-invalid={invalid || undefined}
                data-name={name || undefined}
                data-open={open || undefined}
                data-readonly={readOnly || undefined}
                data-size={size || undefined}
                data-value={value || undefined}
                onClickCapture={() => {
                    if (disabled || readOnly) return;
                    elements.reference?.querySelector<HTMLElement>('[tabIndex]')?.focus();
                }}
                onKeyDownCapture={handleKeyDown({ Escape: () => setOpen(false) })}
                ref={(node) => {
                    elements.setReference(node);
                }}
                role="group"
                tabIndex={-1}
            >
                <input
                    aria-hidden
                    data-sr-only
                    id={id}
                    name={name}
                    onChange={(e) => onChangeProp(e.target.value)}
                    onFocus={() => firstField?.focus()}
                    tabIndex={-1}
                    value={value}
                />
                <TimePickerSegment
                    disabled={disabled}
                    name={`${name}-hours`}
                    onChange={(next) => setValue({ hours: next || undefined })}
                    readOnly={readOnly}
                    setRef={setFirstField}
                    type="hours"
                    value={hours}
                />
                <span aria-hidden="true">:</span>
                <TimePickerSegment
                    disabled={disabled}
                    name={`${name}-minutes`}
                    onChange={(next) => setValue({ minutes: next || undefined })}
                    readOnly={readOnly}
                    type="minutes"
                    value={minutes}
                />
                <TimePickerSegment
                    disabled={disabled}
                    name={`${name}-meridiem`}
                    onChange={(next) => setValue({ meridiem: next || 'AM' })}
                    readOnly={readOnly}
                    type="meridiem"
                    value={meridiem}
                />
                <Button
                    aria-controls={open ? menuId : undefined}
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    as="span"
                    disabled={disabled || readOnly}
                    icon={<SvgSchedule />}
                    iconOnly
                    innerRef={(node) => {
                        buttonRef.current = node;
                    }}
                    label={`${open ? 'Close' : 'Open'} Time Picker`}
                    onClick={() => setOpen(!open)}
                    role="combobox"
                    variant="tertiary"
                />
            </div>
            {!!open && (
                <Portal>
                    <Menu
                        id={menuId}
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
                                        setValue({ hours: next });
                                        setTimeout(() => listBoxRefs.current?.minutes?.focus(), 10);
                                    }}
                                    options={hourOptions}
                                    selectedValue={hours}
                                    type="hours"
                                />
                                <TimePickerListbox
                                    onSelect={(next) => {
                                        setValue({ minutes: next });
                                        setTimeout(() => listBoxRefs.current?.meridiem?.focus(), 10);
                                    }}
                                    options={minuteOptions}
                                    selectedValue={minutes}
                                    type="minutes"
                                />
                                <TimePickerListbox
                                    onSelect={(next) => {
                                        setValue({ meridiem: next as Meridiem });
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
