import { useRef } from 'react';

import './slider.scss';
import { SliderIntervalDots } from './SliderIntervalDots';
import { SliderKnob } from './SliderKnob';
import { SliderTemplate } from './SliderTemplate';

export type SliderProps = {
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
    minimum: number;
    /**
     * The maximum value of the slider.
     *
     * @default 100
     */
    maximum: number;
    /**
     * Determines if the element is [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled).
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Determines if the element is [readonly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly).
     *
     * @default false
     */
    readOnly?: boolean;
    /**
     * If the slider's value interval should be continuous or discrete
     *
     * @default 'continuous'
     */
    intervalType?: 'continuous' | 'discrete';
    /**
     * The interval value when intervalType is set to 'discrete'. Ignored in continuous mode.
     *
     * @default 1
     */
    interval?: number;
    /**
     * Number of decimal places to round to in continuous mode. Ignored in discrete mode.
     *
     * @default 0
     */
    precision?: number;
};

/**
 * A control element that allows customers to select a value or adjust a setting by moving the handle along a horizontal
 * track.
 *
 * @example
 *     import { Slider } from '@bspk/ui/Slider';
 *
 *     function Example() {
 *         return <Slider>Example Slider</Slider>;
 *     }
 *
 * @name Slider
 * @phase WorkInProgress
 */
function Slider({
    value,
    onChange,
    minimum = 0,
    maximum = 100,
    label,
    intervalType = 'continuous',
    interval = 1,
    disabled = false,
    precision = 0,
    readOnly = false,
}: SliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const clamp = (val: number) => Math.min(Math.max(val, minimum), maximum);

    const getValueFromPosition = (clientX: number) => {
        const slider = sliderRef.current;
        if (!slider) return value;

        const { left, width } = slider.getBoundingClientRect();
        let percent = (clientX - left) / width;

        percent = Math.max(0, Math.min(1, percent));

        let newValue = minimum + percent * (maximum - minimum);

        if (intervalType === 'discrete') {
            newValue = Math.round(newValue / interval) * interval;
        } else {
            const factor = Math.pow(10, precision ?? 2);
            newValue = Math.round(newValue * factor) / factor;
        }

        return clamp(newValue);
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
            newValue = value - interval;
        } else if (e.key === 'ArrowRight') {
            newValue = value + interval;
        }

        newValue = clamp(newValue);

        if (intervalType === 'discrete') {
            newValue = Math.round(newValue / interval) * interval;
        } else {
            const factor = Math.pow(10, precision ?? 2);
            newValue = Math.round(newValue * factor) / factor;
        }

        onChange(newValue);
    };

    const valuePercent = Math.min(Math.max(((value - minimum) / (maximum - minimum)) * 100, 0), 100);

    return (
        <SliderTemplate
            disabled={disabled}
            handleKeyDown={handleKeyDown}
            handleMouseDown={handleMouseDown}
            label={label}
            maximum={maximum}
            minimum={minimum}
            readOnly={readOnly}
            sliderRef={sliderRef}
            value={value}
        >
            <div data-slider-fill="" style={{ width: `${valuePercent}%` }} />

            {intervalType === 'discrete' && (
                <SliderIntervalDots interval={interval} maximum={maximum} minimum={minimum} value={value} />
            )}

            <SliderKnob valuePercent={valuePercent} />
        </SliderTemplate>
    );
}

Slider.bspkName = 'Slider';

export { Slider };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
