import { useEffect, useRef } from 'react';

import './slider.scss';
import { SliderIntervalDots } from './SliderIntervalDots';
import { SliderKnob } from './SliderKnob';
import { SliderTemplate } from './SliderTemplate';
import { useNormalizeSliderValue } from './useNormalizeSliderValue';
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
    value: number;
    /**
     * Invoked with the new value when value changes.
     *
     * @required
     */
    onChange: (newValue: number) => void;
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
    formatValue?: (value: number) => string;
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
    name,
}: SliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const { normalizeSliderValue } = useNormalizeSliderValue({
        min,
        max,
        step,
    });

    const getValueFromPosition = (clientX: number) => {
        const slider = sliderRef.current;
        if (!slider) return value;

        const { left, width } = slider.getBoundingClientRect();
        let percent = (clientX - left) / width;

        percent = Math.max(0, Math.min(1, percent));

        return normalizeSliderValue(min + percent * (max - min));
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDraggingRef.current || disabled || readOnly) return;
        const newValue = getValueFromPosition(e.clientX);

        onChange(newValue);
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (disabled || readOnly) return;
        isDraggingRef.current = true;
        const newValue = getValueFromPosition(e.clientX);
        onChange(newValue);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled || readOnly) return;

        let newValue = value;

        if (e.key === 'ArrowLeft') {
            newValue = value - step;
        } else if (e.key === 'ArrowRight') {
            newValue = value + step;
        } else {
            return;
        }

        onChange(normalizeSliderValue(newValue));
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const valuePercent = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

    return (
        <SliderTemplate
            disabled={disabled}
            displayValue={formatValue ? formatValue(value) : undefined}
            handleMouseDown={handleMouseDown}
            label={label}
            max={max}
            min={min}
            name={name}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            sliderRef={sliderRef}
            value={value}
        >
            <div data-slider-fill="" style={{ width: `${valuePercent}%` }} />

            {marks && <SliderIntervalDots max={max} min={min} step={step} value={value} />}

            <SliderKnob tabIndex={0} valuePercent={valuePercent} />
        </SliderTemplate>
    );
}

Slider.bspkName = 'Slider';

export { Slider };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
