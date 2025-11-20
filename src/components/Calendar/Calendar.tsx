import './calendar.scss';
import { format, isValid, startOfToday } from 'date-fns';
import { useMemo, useState } from 'react';
import { Kind, CONFIG, useKeyDownCaptures, optionIdGenerator, HeaderButton } from './utils';
import { useId } from '-/hooks/useId';

export type CalendarProps = {
    /**
     * The currently selected date
     *
     * @type Date
     */
    value: Date | undefined;
    /** Fires when the date changes with the new date */
    onChange: (newDate: Date) => void;
    /**
     * When true, keyboard focus is trapped within the calendar component on initial render.
     *
     * Only applicable if the Calendar is used in a popover like in DatePicker.
     *
     * @default false
     */
    focusInit?: boolean;
    /** The id of the calendar component. */
    id?: string;
};

/**
 * Allows customers to select the date, month, and year.
 *
 * @name Calendar
 * @phase UXReview
 */
export function Calendar({ id, value: valueProp, onChange, focusInit = false }: CalendarProps) {
    const baseId = useId(id);

    const [kind, setKind] = useState<Kind>('day');

    const [activeDate, setActiveDate] = useState<Date>(valueProp && isValid(valueProp) ? valueProp : startOfToday());
    const config = useMemo(() => CONFIG[kind], [kind]);
    const rows = useMemo(() => config.rows(activeDate), [config, activeDate]);

    const { handleKeyDownCapture } = useKeyDownCaptures({
        config,
        activeDate,
        setActiveDate,
        rows,
    });

    const generateOptionId = optionIdGenerator(baseId);

    return (
        <div data-bspk="calendar" id={baseId}>
            <div data-header>
                <HeaderButton
                    activeDate={activeDate}
                    direction="prev2"
                    header={config.direction.prev2}
                    setActiveDate={setActiveDate}
                />
                <HeaderButton
                    activeDate={activeDate}
                    direction="prev"
                    header={config.direction.prev}
                    setActiveDate={setActiveDate}
                />
                <span data-title>{config.headerLabel(activeDate, setKind)}</span>
                <HeaderButton
                    activeDate={activeDate}
                    direction="next"
                    header={config.direction.next}
                    setActiveDate={setActiveDate}
                />
                <HeaderButton
                    activeDate={activeDate}
                    direction="next2"
                    header={config.direction.next2}
                    setActiveDate={setActiveDate}
                />
            </div>
            <table data-kind={kind} role="grid">
                {config.tableHeader}
                <tbody onKeyDownCapture={handleKeyDownCapture}>
                    {rows.map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((date) => {
                                const label = format(date, config.optionLabelFormat);
                                const optionId = generateOptionId(date);
                                const isActive = config.compare(date, activeDate);
                                return (
                                    <td
                                        aria-label={format(date, config.optionAriaLabelFormat)}
                                        data-selected={isActive || undefined}
                                        id={optionId}
                                        key={date.toString()}
                                        onClick={() => config.optionOnClick({ date, setActiveDate, onChange, setKind })}
                                        ref={(node) => {
                                            if (focusInit && isActive && node) {
                                                setTimeout(() => {
                                                    node.focus({ preventScroll: true });
                                                }, 0);
                                            }
                                        }}
                                        role={isActive ? 'gridcell' : undefined}
                                        tabIndex={isActive ? 0 : -1}
                                    >
                                        {label}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
