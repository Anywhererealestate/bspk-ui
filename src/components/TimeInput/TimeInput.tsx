import './time-input.scss';
import { SvgSchedule } from '@bspk/icons/Schedule';
import { FocusTrap } from 'focus-trap-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TimeInputListbox } from './Listbox';
import { TimeInputSegment } from './Segment';
import { Button } from '-/components/Button';
import { Menu } from '-/components/Menu';
import { Portal } from '-/components/Portal';
import { TextInputProps } from '-/components/TextInput';
import { useFloating } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { handleKeyDown } from '-/utils/handleKeyDown';

export const MINUTE_OPTIONS = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
export const HOUR_OPTIONS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
export const MERIDIEM_OPTIONS = ['AM', 'PM'];

type Minute = (typeof MINUTE_OPTIONS)[number];
type Hour = (typeof HOUR_OPTIONS)[number];
type Meridiem = (typeof MERIDIEM_OPTIONS)[number];

export type TimeInputProps = Pick<
    TextInputProps,
    | 'aria-describedby'
    | 'aria-errormessage'
    | 'aria-label'
    | 'disabled'
    | 'id'
    | 'invalid'
    | 'name'
    | 'readOnly'
    | 'size'
> & {
    value?: string;
};

/**
 * An input field that allows a customer to manually type in a specific time or triggers a time picker combobox to
 * select a date.
 *
 * @example
 *     import { TimeInput } from '@bspk/ui/TimeInput';
 *
 *     function Example() {
 *         return <TimeInput>Example TimeInput</TimeInput>;
 *     }
 *
 * @name TimeInput
 * @phase UXReview
 */
export function TimeInput({
    value,
    'aria-label': ariaLabel,
    disabled,
    id: idProp,
    invalid,
    readOnly,
    name,
    size,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
}: TimeInputProps) {
    const id = useId(idProp);

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

    const [open, setOpen] = useState(false);

    const { floatingStyles, elements } = useFloating({
        strategy: 'fixed',
        refWidth: true,
        offsetOptions: 4,
        hide: !open,
    });

    useEffect(() => {
        if (open) elements.reference?.querySelector<HTMLElement>('[data-scroll-column="hours"]')?.focus();
    }, [elements.reference, open]);

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
                aria-describedby={ariaErrorMessage || ariaDescribedBy || undefined}
                data-aria-label={ariaLabel || undefined}
                data-bspk="time-input"
                data-disabled={disabled || undefined}
                data-invalid={invalid || undefined}
                data-name={name || undefined}
                data-open={open || undefined}
                data-readonly={readOnly || undefined}
                data-size={size || undefined}
                data-value={inputValue || undefined}
                id={id}
                onClickCapture={() => {
                    elements.reference?.querySelector<HTMLElement>('[tabIndex]')?.focus();
                }}
                onKeyDownCapture={handleKeyDown({ Escape: () => setOpen(false) })}
                ref={elements.setReference}
                role="group"
            >
                <TimeInputSegment
                    disabled={disabled}
                    name={`${name}-hours`}
                    onChange={(next) => setHours(next || undefined)}
                    readOnly={readOnly}
                    type="hours"
                    value={hours}
                />
                <span aria-hidden="true">:</span>
                <TimeInputSegment
                    disabled={disabled}
                    name={`${name}-minutes`}
                    onChange={(next) => setMinutes(next || undefined)}
                    readOnly={readOnly}
                    type="minutes"
                    value={minutes}
                />
                <TimeInputSegment
                    disabled={disabled}
                    name={`${name}-meridiem`}
                    onChange={(next) => setMeridiem(next || 'AM')}
                    readOnly={readOnly}
                    type="meridiem"
                    value={meridiem}
                />
                <Button
                    icon={<SvgSchedule />}
                    iconOnly
                    innerRef={(node) => {
                        buttonRef.current = node;
                    }}
                    label={`${open ? 'Close' : 'Open'} Time Picker`}
                    onClick={() => {
                        setOpen(!open);
                        elements.reference?.focus();
                    }}
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
                        owner="time-input"
                        style={floatingStyles}
                    >
                        <FocusTrap
                            focusTrapOptions={{
                                fallbackFocus: () => listBoxRefs.current!.hours!,
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
                                <TimeInputListbox
                                    onSelect={(next) => {
                                        setHours(next as Hour);
                                        setTimeout(() => listBoxRefs.current?.minutes?.focus(), 10);
                                    }}
                                    options={hourOptions}
                                    selectedValue={hours}
                                    type="hours"
                                />
                                <TimeInputListbox
                                    onSelect={(next) => {
                                        setMinutes(next as Minute);
                                        setTimeout(() => listBoxRefs.current?.meridiem?.focus(), 10);
                                    }}
                                    options={minuteOptions}
                                    selectedValue={minutes}
                                    type="minutes"
                                />
                                <TimeInputListbox
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
