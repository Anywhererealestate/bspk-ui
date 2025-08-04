import { ReactNode } from 'react';

import { SliderProps } from './Slider';
import { Txt } from '-/components/Txt';

type SliderTemplateProps = Pick<SliderProps, 'disabled' | 'label' | 'max' | 'min' | 'name' | 'readOnly' | 'value'> & {
    children: ReactNode;
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    handleMouseDown: (e: React.MouseEvent) => void;
    sliderRef: React.RefObject<HTMLDivElement>;
    displayValue?: string;
};

export function SliderTemplate({
    children,
    onKeyDown,
    disabled,
    label,
    readOnly,
    value,
    min,
    max,
    handleMouseDown,
    sliderRef,
    displayValue,
    name,
}: SliderTemplateProps) {
    return (
        <div data-bspk="slider" data-disabled={disabled || undefined} data-readonly={readOnly || undefined}>
            <div data-top-labels="">
                <Txt variant="labels-small">{label}</Txt>

                <Txt data-value-label="">{displayValue ?? value}</Txt>
            </div>

            <div
                aria-hidden={true}
                data-slider-body=""
                onKeyDown={disabled ? undefined : onKeyDown}
                onMouseDown={handleMouseDown}
                ref={sliderRef}
                role="presentation"
                tabIndex={-1}
            >
                <div data-slider-background="" />

                {children}
            </div>

            <input
                aria-label={label}
                disabled={disabled}
                hidden={true}
                max={max}
                min={min}
                name={name}
                readOnly={readOnly}
                type="range"
                value={value}
            />

            <div data-bottom-labels="">
                <Txt data-min-label="" variant="body-small">
                    {min}
                </Txt>

                <Txt data-max-label="" variant="body-small">
                    {max}
                </Txt>
            </div>
        </div>
    );
}
