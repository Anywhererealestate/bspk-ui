import { SvgSchedule } from '@bspk/icons/Schedule';
import { useEffect, useState } from 'react';
import './time-input.scss';
import { TimeInputListbox } from './Listbox';
import { TimeInputSegment } from './Segment';
import { Button } from '-/components/Button';
import { Menu } from '-/components/Menu';
import { TextInputProps } from '-/components/TextInput';
import { useFloating } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { handleKeyDown } from '-/utils/handleKeyDown';

export const MINUTE_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
export const HOUR_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

type Meridiem = 'AM' | 'PM';
export const MERIDIEM_OPTIONS: Meridiem[] = ['AM', 'PM'];

export type TimeInputProps = Pick<
    TextInputProps,
    'aria-label' | 'disabled' | 'errorMessage' | 'id' | 'invalid' | 'name' | 'readOnly' | 'size'
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
 * @phase QA
 */
function TimeInput({
    value,
    'aria-label': ariaLabel,
    disabled,
    errorMessage,
    id: idProp,
    invalid,
    readOnly,
    name,
    size,
}: TimeInputProps) {
    const id = useId(idProp);

    const [inputValue, setInputValue] = useState(value);

    const [hours, setHours] = useState<number>();
    const [minutes, setMinutes] = useState<number>();
    const [meridiem, setMeridiem] = useState<Meridiem>('AM');

    useEffect(() => {
        setInputValue(
            `${hours?.toString().padStart(2, '0')}:${minutes?.toString().padStart(2, '0')} ${meridiem || ''}`.trim(),
        );
        if (hours !== undefined && minutes === undefined) setMinutes(0);
    }, [hours, minutes, meridiem]);

    const [open, setOpen] = useState(false);

    const { floatingStyles, elements } = useFloating({
        strategy: 'fixed',
        refWidth: true,
        offsetOptions: 4,
        hide: !open,
    });

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <div
                data-aria-label={ariaLabel || undefined}
                data-bspk="time-input"
                data-disabled={disabled || undefined}
                data-error={errorMessage || undefined}
                data-invalid={invalid || undefined}
                data-name={name || undefined}
                data-open={open || undefined}
                data-readonly={readOnly || undefined}
                data-size={size || undefined}
                data-value={inputValue || undefined}
                id={id}
                onClick={() => {
                    elements.reference?.querySelector<HTMLElement>('[tabIndex]')?.focus();
                }}
                onKeyDown={handleKeyDown({ Escape: () => setOpen(false) })}
                ref={elements.setReference}
                role="group"
            >
                <TimeInputSegment
                    ariaLabel={ariaLabel}
                    defaultValue={hours}
                    disabled={disabled}
                    name={`${name}-hours`}
                    onChange={(next) => setHours(next || undefined)}
                    readOnly={readOnly}
                    type="hours"
                />
                <span aria-hidden="true">:</span>
                <TimeInputSegment
                    ariaLabel={ariaLabel}
                    defaultValue={minutes}
                    disabled={disabled}
                    name={`${name}-minutes`}
                    onChange={(next) => setMinutes(next || undefined)}
                    readOnly={readOnly}
                    type="minutes"
                />
                <TimeInputSegment
                    ariaLabel={ariaLabel}
                    defaultValue={meridiem}
                    disabled={disabled}
                    name={`${name}-meridiem`}
                    onChange={(next) => setMeridiem(next || 'AM')}
                    readOnly={readOnly}
                    type="meridiem"
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
                <Menu
                    floating
                    innerRef={(node) => {
                        if (!node) return;
                        elements.setFloating(node as HTMLElement);
                        node.querySelector<HTMLElement>('[data-scroll-column="hours"]')?.focus();
                    }}
                    itemDisplayCount={false}
                    onOutsideClick={() => {
                        setOpen(false);
                    }}
                    owner="time-input"
                    style={{ ...floatingStyles }}
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
                        <TimeInputListbox
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
            )}
        </>
    );
}

TimeInput.bspkName = 'TimeInput';

export { TimeInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
