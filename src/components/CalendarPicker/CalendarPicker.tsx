import './calendar-picker.scss';
import { isValid } from 'date-fns';
import { FocusTrap } from 'focus-trap-react';
import { useMemo, useState, useEffect } from 'react';
import { Kind, useRows, useKeyDownCaptures, HeaderButton, CONFIG, useFocusNext } from './utils';
import { Button } from '-/components/Button';
import { useId } from '-/hooks/useId';
import { CommonProps } from '-/types/common';

export type CalendarPickerProps = CommonProps<'id'> & {
    /**
     * The currently selected date
     *
     * @type Date
     */
    value: Date | undefined;
    /** Fires when the date changes with the new date */
    onChange: (newDate: Date) => void;
    /**
     * Determines how the CalendarPicker will appear.
     *
     * @default flat
     */
    variant?: 'elevated' | 'flat';
};

/**
 * A component or widget that allows customers to select the date, month, and year.
 *
 * @example
 *     import { CalendarPicker } from '@bspk/ui/CalendarPicker';
 *
 *     function Example() {
 *         return <CalendarPicker>Example CalendarPicker</CalendarPicker>;
 *     }
 *
 * @name CalendarPicker
 * @phase Dev
 */
export function CalendarPicker({ id: idProp, value: valueProp, onChange, variant = 'flat' }: CalendarPickerProps) {
    const baseId = useId(idProp);
    const value = useMemo(() => (valueProp && isValid(valueProp) ? valueProp : new Date()), [valueProp]);

    const [kind, setKind] = useState<Kind>('day');
    const config = useMemo(() => CONFIG[kind], [kind]);

    const [activeDate, setActiveDate] = useState<Date>(value);
    useEffect(() => setActiveDate(value), [value]);

    const rows = useRows(config, activeDate, baseId);

    const { setFocusNext, gridRef, headerRef } = useFocusNext();

    const { handleKeyDownCapture } = useKeyDownCaptures({
        config,
        activeDate,
        setActiveDate: (next) => {
            setActiveDate(next);
            setFocusNext('day');
        },
    });

    return (
        <FocusTrap
            focusTrapOptions={{
                initialFocus: () => gridRef.current?.querySelector<HTMLElement>('[tabindex="0"]'),
                fallbackFocus: () => gridRef.current!.querySelector<HTMLElement>('[tabindex="0"]')!,
                clickOutsideDeactivates: true,
            }}
        >
            <div data-bspk="calendar-picker" data-kind={kind} data-variant={variant || 'flat'}>
                <div data-header ref={headerRef}>
                    <HeaderButton
                        activeDate={activeDate}
                        config={config.header['<<']}
                        direction="<<"
                        setActiveDate={setActiveDate}
                    />
                    <HeaderButton
                        activeDate={activeDate}
                        config={config.header['<']}
                        direction="<"
                        setActiveDate={setActiveDate}
                    />
                    <div data-title>
                        {config.header.label(activeDate, (nextKind) => {
                            setKind(nextKind);
                            setFocusNext(kind);
                        })}
                    </div>
                    <HeaderButton
                        activeDate={activeDate}
                        config={config.header['>']}
                        direction=">"
                        setActiveDate={setActiveDate}
                    />
                    <HeaderButton
                        activeDate={activeDate}
                        config={config.header['>>']}
                        direction=">>"
                        setActiveDate={setActiveDate}
                    />
                </div>
                <div
                    aria-label={config.gridLabel}
                    data-grid
                    onKeyDownCapture={handleKeyDownCapture}
                    ref={gridRef}
                    role="grid"
                >
                    {config.gridHeaderRow}
                    <div role="presentation">
                        <div data-row-group role="rowgroup">
                            {rows.map((row, rowIndex) => (
                                <div aria-rowindex={rowIndex + 1} data-row key={rowIndex} role="row">
                                    {row.map(({ value: date, label, id, 'aria-label': ariaLabel }, colIndex) => {
                                        const isSelected = config.isSame(date, value);
                                        const isActive = config.isSame(date, activeDate);
                                        const props = config.cellProps?.({ date, activeDate });

                                        return (
                                            <Button
                                                {...props}
                                                aria-colindex={colIndex + 1}
                                                aria-label={ariaLabel}
                                                aria-selected={isSelected}
                                                data-timestamp={date.getTime()}
                                                id={id}
                                                key={date.toString()}
                                                label={label}
                                                onClick={() => {
                                                    setActiveDate(date);

                                                    if (kind === 'day') onChange(date);
                                                    else setKind('day');

                                                    setFocusNext(kind);
                                                }}
                                                role="gridcell"
                                                size="large"
                                                tabIndex={isActive ? 0 : -1}
                                                variant={isSelected ? 'primary' : 'tertiary'}
                                                width="hug"
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </FocusTrap>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
