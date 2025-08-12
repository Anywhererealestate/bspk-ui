// import { ElementProps } from '-/types/common';

type SliderKnobProps = {
    valuePercent: number;
    tabIndex?: number;
    onFocus?: () => void;
    vertical?: boolean;
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
};

export function SliderKnob({
    valuePercent,
    tabIndex,
    onFocus,
    onKeyDown,
    onMouseDown,
    vertical,
}: React.HTMLAttributes<HTMLDivElement> & SliderKnobProps) {
    const style = vertical ? { bottom: `calc(${valuePercent}% - 8px)` } : { left: `calc(${valuePercent}% - 8px)` };

    return (
        <div
            aria-label="Slider value"
            aria-orientation={vertical ? 'vertical' : 'horizontal'}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={valuePercent}
            data-slider-knob=""
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onMouseDown={onMouseDown}
            role="slider"
            style={style}
            tabIndex={tabIndex ?? 0}
        />
    );
}
