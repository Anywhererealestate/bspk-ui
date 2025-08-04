import { useEffect, useRef } from 'react';
import { SliderProps } from '-/components/Slider';
import { SliderIntervalDots } from '-/components/Slider/SliderIntervalDots';
import { SliderKnob } from '-/components/Slider/SliderKnob';
import { SliderTemplate } from '-/components/Slider/SliderTemplate';

import '-/components/Slider/slider.scss';
import { useNormalizeSliderValue } from '-/components/Slider/useNormalizeSliderValue';

export type RangeSliderProps = Pick<
    SliderProps,
    'disabled' | 'label' | 'marks' | 'max' | 'min' | 'name' | 'readOnly' | 'step'
> & {
    /**
     * The numerical value of the slider.
     *
     * @required
     */
    value: [number, number];
    /**
     * Invoked with the new value when value changes.
     *
     * @required
     */
    onChange: (newValue: [number, number]) => void;
    /** Optional function to format the display value of the slider. Useful for currency, percentages, etc. */
    formatValue?: (value: [number, number]) => string;
};

/**
 * A control element that allows customers to select a value or adjust a setting by moving the handle along a horizontal
 * track.
 *
 * @example
 *     import { RangeSlider } from '@bspk/ui/RangeSlider';
 *     import { useState } from 'react';
 *
 *     const [value, setValue] = useState<[number, number]>([20, 80]);
 *
 *     function Example() {
 *         return <RangeSlider min={0} max={100} value={value} onChange={setValue} />;
 *     }
 *
 * @name RangeSlider
 * @phase Dev
 */
function RangeSlider({
    value = [0, 0],
    onChange,
    min = 0,
    max = 100,
    label,
    step = 1,
    disabled = false,
    readOnly = false,
    formatValue,
    marks = false,
    name,
}: RangeSliderProps) {
    const { normalizeSliderValue } = useNormalizeSliderValue({
        min,
        max,
        step,
    });
    const sliderRef = useRef<HTMLDivElement>(null);

    const activeThumbRef = useRef<0 | 1 | null>(null);
    const lastActiveThumbRef = useRef<0 | 1>(0);

    const clamp = (val: number) => Math.min(Math.max(val, min), max);

    const getValueFromPosition = (clientX: number) => {
        const slider = sliderRef.current;
        if (!slider) return min;

        const { left, width } = slider.getBoundingClientRect();
        let percent = (clientX - left) / width;
        percent = Math.max(0, Math.min(1, percent));

        const newValue = normalizeSliderValue(min + percent * (max - min));

        return clamp(newValue);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (disabled || readOnly) return;
        const newValue = getValueFromPosition(e.clientX);
        const [start, end] = value;

        const distanceToStart = Math.abs(newValue - start);
        const distanceToEnd = Math.abs(newValue - end);
        const thumb = distanceToStart < distanceToEnd ? 0 : 1;

        activeThumbRef.current = thumb;
        lastActiveThumbRef.current = thumb;

        updateValue(thumb, newValue);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (disabled || readOnly || activeThumbRef === null) return;
        const newValue = getValueFromPosition(e.clientX);
        updateValue(activeThumbRef.current, newValue);
    };

    const handleMouseUp = () => {
        activeThumbRef.current = null;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const updateValue = (thumb: 0 | 1 | null, newVal: number) => {
        if (thumb === null) return;

        const [start, end] = value;
        const newValue: [number, number] = thumb === 0 ? [newVal, end] : [start, newVal];

        onChange(newValue.sort((a, b) => a - b));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled || readOnly || activeThumbRef === null) return;

        const thumbToMove = activeThumbRef.current ?? lastActiveThumbRef.current ?? 0;

        let delta = 0;

        switch (e.key) {
            case 'ArrowLeft':
                delta = -step;
                break;
            case 'ArrowRight':
                delta = step;
                break;
            default:
                return;
        }

        e.preventDefault();

        const [start, end] = value;

        const currentVal = thumbToMove === 0 ? start : end;
        const newVal = normalizeSliderValue(currentVal + delta);

        lastActiveThumbRef.current = thumbToMove;
        updateValue(thumbToMove, newVal);
    };

    useEffect(() => {
        const [start, end] = value;
        const clampedStart = Math.min(Math.max(start, min), max);
        const clampedEnd = Math.min(Math.max(end, min), max);

        if (clampedStart !== start || clampedEnd !== end) {
            onChange([clampedStart, clampedEnd]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max]);

    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [start, end] = value;
    const startPercent = ((start - min) / (max - min)) * 100;
    const endPercent = ((end - min) / (max - min)) * 100;

    const fillLeft = Math.min(startPercent, endPercent);
    const fillWidth = Math.abs(endPercent - startPercent);

    return (
        <SliderTemplate
            disabled={disabled}
            displayValue={formatValue ? formatValue(value) : `${start} - ${end}`}
            handleMouseDown={handleMouseDown}
            label={label}
            max={max}
            min={min}
            name={name}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            sliderRef={sliderRef}
            value={start}
        >
            <div
                data-slider-fill=""
                style={{
                    left: `${fillLeft}%`,
                    width: `${fillWidth}%`,
                }}
            />

            {marks && <SliderIntervalDots max={max} min={min} step={step} value={start} />}

            <SliderKnob
                onFocus={() => {
                    activeThumbRef.current = 0;
                    lastActiveThumbRef.current = 0;
                }}
                tabIndex={0}
                valuePercent={startPercent}
            />

            <SliderKnob
                onFocus={() => {
                    activeThumbRef.current = 1;
                    lastActiveThumbRef.current = 1;
                }}
                tabIndex={0}
                valuePercent={endPercent}
            />
        </SliderTemplate>
    );
}

RangeSlider.bspkName = 'RangeSlider';

export { RangeSlider };
