type SliderKnobProps = {
    valuePercent: number;
    tabIndex?: number;
    onFocus?: () => void;
};

export function SliderKnob({ valuePercent, tabIndex, onFocus }: SliderKnobProps) {
    return (
        <div
            data-slider-knob=""
            onFocus={onFocus}
            style={{ left: `calc(${valuePercent}% - 8px)` }}
            tabIndex={tabIndex}
        />
    );
}
