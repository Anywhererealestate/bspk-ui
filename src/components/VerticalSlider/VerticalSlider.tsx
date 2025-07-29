import { ReactNode, useRef } from 'react';

import './vertical-slider.scss';
import { SliderProps } from '-/components/Slider';
import { SliderKnob } from '-/components/Slider/SliderKnob';
import { useNormalizeSliderValue } from '-/components/Slider/useNormalizeSliderValue';

export type VerticalSliderProps = Pick<
    SliderProps,
    'disabled' | 'label' | 'maximum' | 'minimum' | 'onChange' | 'readOnly' | 'value'
> & {
    /**
     * The icon to display on the slider.
     *
     * @exampleType select
     * @options Icon
     */
    icon?: ReactNode;
    /**
     * How much the slider value should change when using the keyboard.
     *
     * @default 5
     */
    keyboardInterval?: number;
};

/**
 * A control element that allows customers to select a value or adjust a setting by moving the handle along a vertical
 * track.
 *
 * @example
 *     import { VerticalSlider } from '@bspk/ui/VerticalSlider';
 *
 *     function Example() {
 *         return <VerticalSlider>Example VerticalSlider</VerticalSlider>;
 *     }
 *
 * @name VerticalSlider
 * @phase Dev
 */
function VerticalSlider({
    value,
    onChange,
    minimum = 0,
    maximum = 100,
    label,
    disabled = false,
    icon,
    readOnly = false,
    keyboardInterval = 5,
}: VerticalSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const { normalizeSliderValue } = useNormalizeSliderValue({
        minimum,
        maximum,
        intervalType: 'continuous',
        interval: 1,
        precision: 0,
    });

    const getValueFromPosition = (clientY: number) => {
        const slider = sliderRef.current;
        if (!slider) return value;

        const { top, height } = slider.getBoundingClientRect();
        let percent = (clientY - top) / height;

        percent = Math.max(0, Math.min(1, percent));

        const invertedPercent = 1 - percent;

        return normalizeSliderValue(minimum + invertedPercent * (maximum - minimum));
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDraggingRef.current || disabled || readOnly) return;
        const newValue = getValueFromPosition(e.clientY);

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
        const newValue = getValueFromPosition(e.clientY);
        onChange(newValue);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (disabled || readOnly) return;

        let newValue = value;

        if (e.key === 'ArrowDown') {
            newValue = value - keyboardInterval;
        } else if (e.key === 'ArrowUp') {
            newValue = value + keyboardInterval;
        }

        onChange(normalizeSliderValue(newValue));
    };

    const valuePercent = Math.min(Math.max(((value - minimum) / (maximum - minimum)) * 100, 0), 100);

    return (
        <div data-bspk="vertical-slider">
            <div
                aria-label={label}
                aria-orientation="vertical"
                aria-readonly={readOnly}
                aria-valuemax={maximum}
                aria-valuemin={minimum}
                aria-valuenow={value}
                aria-valuetext={`${value}`}
                data-slider-body=""
                onKeyDown={disabled ? undefined : handleKeyDown}
                onMouseDown={handleMouseDown}
                ref={sliderRef}
                role="slider"
                tabIndex={-1}
            >
                <div data-slider-background="" />

                <div data-slider-fill="" style={{ height: `${valuePercent}%` }} />

                <SliderKnob tabIndex={0} valuePercent={valuePercent} vertical />
            </div>

            {icon && <div data-slider-icon="">{icon}</div>}
        </div>
    );
}

VerticalSlider.bspkName = 'VerticalSlider';

export { VerticalSlider };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
