import './time-input.scss';
import { SvgSchedule } from '@bspk/icons/Schedule';
import { useEffect, useState } from 'react';
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
export const MERIDIEM_OPTIONS: Meridiem[] = ['AM', 'PM'];

type Meridiem = 'AM' | 'PM';

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
    const [meridiem, setMeridiem] = useState<Meridiem>('AM');

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

    useOutsideClick({ elements: [elements.floating], callback: () => setOpen(false), disabled: !open });

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
                            node.querySelector<HTMLElement>('[data-scroll-column="hours"]')?.focus();
                        }}
                        label="Select time"
                        owner="time-input"
                        style={floatingStyles}
                    >
                        <div data-scroll-values>
                            <TimeInputListbox
                                onSelect={setHours}
                                options={HOUR_OPTIONS.map((h) => h)}
                                selectedValue={hours}
                                type="hours"
                            />
                            <TimeInputListbox
                                onSelect={setMinutes}
                                options={MINUTE_OPTIONS}
                                selectedValue={minutes}
                                type="minutes"
                            />
                            <TimeInputListbox<Meridiem>
                                onSelect={setMeridiem}
                                onTab={(e) => {
                                    e.preventDefault();
                                    setOpen(false);
                                    setTimeout(() => elements.reference?.focus(), 10);
                                    // Focus back on the input after closing
                                }}
                                options={MERIDIEM_OPTIONS}
                                selectedValue={meridiem}
                                type="meridiem"
                            />
                        </div>
                    </Menu>
                </Portal>
            )}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
