import { useEffect, useRef } from 'react';

import './slider.scss';
import { SliderIntervalDots } from './SliderIntervalDots';
import { SliderKnob } from './SliderKnob';
// import { SliderTemplate } from './SliderTemplate';
import { useNormalizeSliderValue } from './useNormalizeSliderValue';
import { Txt } from '-/components/Txt';
import { CommonPropsLibrary } from '-/types/common';

export type SliderProps = Pick<CommonPropsLibrary, 'disabled' | 'name' | 'readOnly'> & {
    /**
     * The label of the slider.
     *
     * @required
     */
    label: string;
    /**
     * The numerical value of the slider.
     *
     * @required
     */
    value: number | [number, number];
    /**
     * Invoked with the new value when value changes.
     *
     * @required
     */
    onChange: (newValue: number | [number, number]) => void;
    /**
     * The minimum value of the slider.
     *
     * @default 0
     */
    min: number;
    /**
     * The maximum value of the slider.
     *
     * @default 100
     */
    max: number;
    /**
     * Indicates if marks should be displayed on the slider.
     *
     * @default false
     */
    marks?: boolean;
    /**
     * The number that specifies the granularity that the value must adhere to
     *
     * @default 1
     */
    step?: number;
    /** Optional function to format the display value of the slider. Useful for currency, percentages, etc. */
    formatValue?: (value: [number, number]) => string;
};

/**
 * A control element that allows customers to select a value or adjust a setting by moving the handle along a horizontal
 * track.
 *
 * @example
 *     import { Slider } from '@bspk/ui/Slider';
 *     import { useState } from 'react';
 *
 *     function Example() {
 *         const [value, setValue] = useState<number>(50);
 *
 *         return <Slider value={value} min={0} max={100} label="Slider Example" onChange={setValue} />;
 *     }
 *
 * @name Slider
 * @phase Dev
 */
function Slider({
    value,
    onChange,
    min = 0,
    max = 100,
    label,
    marks = false,
    step = 1,
    disabled = false,
    readOnly = false,
    formatValue,
}: SliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef<0 | 1 | null>(null);

    const { normalizeSliderValue } = useNormalizeSliderValue({
        min,
        max,
        step,
    });

    // Support both single value and range
    const isRange = Array.isArray(value);
    let val0 = isRange ? value[0] : (value as number);
    let val1 = isRange ? value[1] : (value as number);

    // Ensure val0 <= val1 for rendering
    if (val0 > val1) {
        [val0, val1] = [val1, val0];
    }

    const getValueFromPosition = (clientX: number) => {
        const slider = sliderRef.current;
        if (!slider) return min;

        const { left, width } = slider.getBoundingClientRect();
        let percent = (clientX - left) / width;
        percent = Math.max(0, Math.min(1, percent));
        return normalizeSliderValue(min + percent * (max - min));
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDraggingRef.current === null || disabled || readOnly) return;
        const newValue = getValueFromPosition(e.clientX);

        if (isRange) {
            if (isDraggingRef.current === 0) {
                // Move only val0, val1 stays the same
                onChange([normalizeSliderValue(newValue), val1]);
            } else {
                // Move only val1, val0 stays the same
                onChange([val0, normalizeSliderValue(newValue)]);
            }
        } else {
            onChange(normalizeSliderValue(newValue));
        }
    };

    const handleMouseUp = () => {
        isDraggingRef.current = null;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || readOnly) return;
        const clickValue = getValueFromPosition(e.clientX);
        if (isRange) {
            if (Math.abs(clickValue - val0) < Math.abs(clickValue - val1)) {
                onChange([Math.min(clickValue, val1), val1] as [number, number]);
                isDraggingRef.current = 0;
            } else {
                onChange([val0, Math.max(clickValue, val0)] as [number, number]);
                isDraggingRef.current = 1;
            }
        } else {
            onChange(normalizeSliderValue(clickValue));
        }
    };

    const handleKnobMouseDown = (knobIndex: 0 | 1) => (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || readOnly) return;
        e.stopPropagation();
        isDraggingRef.current = knobIndex;
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleKnobKeyDown = (knobIndex: 0 | 1) => (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled || readOnly) return;
        let newValue = knobIndex === 0 ? val0 : val1;
        if (e.key === 'ArrowLeft') {
            newValue = newValue - step;
        } else if (e.key === 'ArrowRight') {
            newValue = newValue + step;
        } else {
            return;
        }
        newValue = normalizeSliderValue(newValue);

        if (isRange) {
            if (knobIndex === 0) {
                onChange([newValue, val1]);
            } else {
                onChange([val0, newValue]);
            }
        } else {
            onChange(normalizeSliderValue(newValue));
        }
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const percent0 = Math.min(Math.max(((val0 - min) / (max - min)) * 100, 0), 100);
    const percent1 = Math.min(Math.max(((val1 - min) / (max - min)) * 100, 0), 100);

    const displayValue = formatValue
        ? formatValue(isRange ? [val0, val1] : [val0, val1])
        : isRange
          ? `${val0} – ${val1}`
          : `${val0}`;

    return (
        <div data-bspk="slider" data-disabled={disabled || undefined} data-readonly={readOnly || undefined}>
            <div data-top-labels>
                <Txt variant="labels-small">{label}</Txt>
                <Txt data-value-label>{displayValue}</Txt>
            </div>
            <div data-slider-parent>
                <div
                    aria-disabled={disabled || undefined}
                    aria-label={label}
                    aria-readonly={readOnly || undefined}
                    aria-valuemax={max}
                    aria-valuemin={min}
                    aria-valuenow={val0}
                    aria-valuetext={displayValue}
                    data-slider-body
                    onClick={handleTrackClick}
                    onKeyDown={(e) => {
                        if (disabled || readOnly) return;
                        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                            if (!isRange) {
                                handleKnobKeyDown(0)(e as React.KeyboardEvent<HTMLDivElement>);
                            }
                        }
                    }}
                    ref={sliderRef}
                    role="slider"
                    tabIndex={disabled ? -1 : 0}
                >
                    <div data-slider-background />
                    <div
                        data-slider-fill
                        style={{
                            left: isRange ? `${percent0}%` : '0%',
                            width: isRange ? `${percent1 - percent0}%` : `${percent0}%`,
                        }}
                    />
                    {marks && (
                        <SliderIntervalDots max={max} min={min} step={step} value={isRange ? [val0, val1] : val0} />
                    )}
                </div>
                {isRange && (
                    <SliderKnob
                        aria-label={`${label} minimum`}
                        aria-valuemax={max}
                        aria-valuemin={min}
                        aria-valuenow={val0}
                        aria-valuetext={val0.toString()}
                        onKeyDown={handleKnobKeyDown(0)}
                        onMouseDown={handleKnobMouseDown(0)}
                        tabIndex={disabled ? -1 : 0}
                        valuePercent={percent0}
                    />
                )}
                <SliderKnob
                    aria-label={isRange ? `${label} maximum` : label}
                    aria-valuemax={max}
                    aria-valuemin={min}
                    aria-valuenow={val1}
                    aria-valuetext={val1.toString()}
                    onKeyDown={handleKnobKeyDown(isRange ? 1 : 0)}
                    onMouseDown={handleKnobMouseDown(isRange ? 1 : 0)}
                    tabIndex={disabled ? -1 : 0}
                    valuePercent={percent1}
                />
            </div>
            <div data-bottom-labels>
                <Txt data-min-label variant="body-small">
                    {min}
                </Txt>
                <Txt data-max-label variant="body-small">
                    {max}
                </Txt>
            </div>
        </div>
    );
}

Slider.bspkName = 'Slider';

export { Slider };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
