import { SvgChevronLeft } from '@bspk/icons/ChevronLeft';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { useEffect, useState } from 'react';
import '-/components/DatePicker/date-picker.scss';
import './year-picker.scss';

export type YearPickerProps = {
    /** The currently selected year and month */
    value?: number;
    /** Fires when the date changes with the new date */
    onChange?: (newValue: number) => void;
    /**
     * Determines how the YearPicker will appear.
     *
     * @default flat
     */
    variant?: 'elevated' | 'flat';
};

/**
 * A component or widget that allows customers to select a year, triggering the month picker post selection of the
 * month.
 *
 * @example
 *     import { YearPicker } from '@bspk/ui/YearPicker';
 *
 *     function Example() {
 *         const [date, setDate] = useState<number | undefined>(2025);
 *
 *         return <YearPicker value={date} onChange={setDate} />;
 *     }
 *
 * @name YearPicker
 * @phase Dev
 */
export function YearPicker({ onChange, value, variant = 'flat' }: YearPickerProps) {
    const currentYear = new Date().getFullYear();
    const endOfDecade = Math.ceil(value ?? currentYear / 10) * 10;

    const [internalValue, setInternalValue] = useState<number | undefined>(value);
    const [viewDecade, setViewDecade] = useState<number>(endOfDecade);

    useEffect(() => {
        if (value) {
            setInternalValue(value);
        }
    }, [value]);

    return (
        <div data-bspk="year-picker" data-variant={variant}>
            <div data-control-row="">
                <button
                    aria-label="Earlier years"
                    data-month-button=""
                    onClick={() => setViewDecade((prev) => prev - 10)}
                >
                    <SvgChevronLeft fontSize="24px" />
                </button>

                <div data-current-period="">
                    {viewDecade - 11} - {viewDecade}
                </div>

                <button
                    aria-label="Later years"
                    data-month-button=""
                    onClick={() => setViewDecade((prev) => prev + 10)}
                >
                    <SvgChevronRight fontSize="24px" />
                </button>
            </div>

            <div data-year-grid="">
                {Array.from({ length: 12 }, (_, i) => {
                    const year = viewDecade - 11 + i;

                    return (
                        <div data-selected={internalValue === year ? '' : undefined} data-year="" key={year}>
                            <button
                                onClick={() => {
                                    setInternalValue(year);

                                    if (onChange) {
                                        onChange(year);
                                    }
                                }}
                            >
                                {year}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

YearPicker.bspkName = 'YearPicker';
