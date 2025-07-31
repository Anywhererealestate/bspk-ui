import { ReactNode } from 'react';

import { SliderProps } from './Slider';
import { Txt } from '-/components/Txt';

type SliderTemplateProps = Pick<SliderProps, 'disabled' | 'label' | 'maximum' | 'minimum' | 'readOnly' | 'value'> & {
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
    minimum,
    maximum,
    handleMouseDown,
    sliderRef,
    displayValue,
}: SliderTemplateProps) {
    if (value < minimum || value > maximum) {
        // eslint-disable-next-line no-console
        console.error(`Slider '${label}' has out of bounds value`, {
            value,
            minimum,
            maximum,
        });
    }

    return (
        <div data-bspk="slider" data-disabled={disabled || undefined} data-readonly={readOnly || undefined}>
            <div data-top-labels="">
                <Txt variant="labels-small">{label}</Txt>

                <Txt data-value-label="">{displayValue ?? value}</Txt>
            </div>

            <div
                aria-label={label}
                aria-readonly={readOnly}
                aria-valuemax={maximum}
                aria-valuemin={minimum}
                aria-valuenow={value}
                aria-valuetext={`${displayValue || value}`}
                data-slider-body=""
                onKeyDown={disabled ? undefined : onKeyDown}
                onMouseDown={handleMouseDown}
                ref={sliderRef}
                role="slider"
                tabIndex={-1}
            >
                <div data-slider-background="" />

                {children}
            </div>

            <div data-bottom-labels="">
                <Txt data-min-label="" variant="body-small">
                    {minimum}
                </Txt>

                <Txt data-max-label="" variant="body-small">
                    {maximum}
                </Txt>
            </div>
        </div>
    );
}
