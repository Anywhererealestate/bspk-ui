import { useEffect, useRef } from 'react';
import { SliderProps } from '-/components/Slider';
import { SliderIntervalDots } from '-/components/Slider/SliderIntervalDots';
import { SliderKnob } from '-/components/Slider/SliderKnob';
import { SliderTemplate } from '-/components/Slider/SliderTemplate';

import '-/components/Slider/slider.scss';
import { useNormalizeSliderValue } from '-/components/Slider/useNormalizeSliderValue';

export type RangeSliderProps = Pick<
    SliderProps,
    'disabled' | 'interval' | 'intervalType' | 'label' | 'maximum' | 'minimum' | 'precision' | 'readOnly'
> & {
    value: [number, number];
    onChange: (newValue: [number, number]) => void;
    /** Optional function to format the display value of the slider. Useful for currency, percentages, etc. */
    getDisplayValue?: (value: [number, number]) => string;
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
 *         return <RangeSlider minimum={0} maximum={100} value={value} onChange={setValue} />;
 *     }
 *
 * @name RangeSlider
 * @phase WorkInProgress
 */
function RangeSlider({
    value = [0, 0],
    onChange,
    minimum = 0,
    maximum = 100,
    label,
    intervalType = 'continuous',
    interval = 1,
    disabled = false,
    precision = 0,
    readOnly = false,
    getDisplayValue,
}: RangeSliderProps) {
    const { normalizeSliderValue } = useNormalizeSliderValue({
        minimum,
        maximum,
        intervalType,
        interval,
        precision,
    });
    const sliderRef = useRef<HTMLDivElement>(null);

    const activeThumbRef = useRef<0 | 1 | null>(null);
    const lastActiveThumbRef = useRef<0 | 1>(0);

    const clamp = (val: number) => Math.min(Math.max(val, minimum), maximum);

    const getValueFromPosition = (clientX: number) => {
        const slider = sliderRef.current;
        if (!slider) return minimum;

        const { left, width } = slider.getBoundingClientRect();
        let percent = (clientX - left) / width;
        percent = Math.max(0, Math.min(1, percent));

        const newValue = normalizeSliderValue(minimum + percent * (maximum - minimum));

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

        const step = intervalType === 'discrete' ? interval : Math.pow(10, -precision);
        let delta = 0;

        switch (e.key) {
            case 'ArrowLeft':
                delta = -step;
                break;
            case 'ArrowRight':
                delta = step;
                break;
            default:
                return; // Ignore other keys
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
        const clampedStart = Math.min(Math.max(start, minimum), maximum);
        const clampedEnd = Math.min(Math.max(end, minimum), maximum);

        if (clampedStart !== start || clampedEnd !== end) {
            onChange([clampedStart, clampedEnd]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minimum, maximum]);

    const [start, end] = value;
    const startPercent = ((start - minimum) / (maximum - minimum)) * 100;
    const endPercent = ((end - minimum) / (maximum - minimum)) * 100;

    const fillLeft = Math.min(startPercent, endPercent);
    const fillWidth = Math.abs(endPercent - startPercent);

    return (
        <SliderTemplate
            disabled={disabled}
            displayValue={getDisplayValue ? getDisplayValue(value) : `${start} - ${end}`}
            handleMouseDown={handleMouseDown}
            label={label}
            maximum={maximum}
            minimum={minimum}
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

            {intervalType === 'discrete' && (
                <SliderIntervalDots interval={interval} maximum={maximum} minimum={minimum} value={start} />
            )}

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
