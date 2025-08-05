type SliderKnobProps = {
    valuePercent: number;
    tabIndex?: number;
    onFocus?: () => void;
    vertical?: boolean;
};

export function SliderKnob({ valuePercent, tabIndex, onFocus, vertical }: SliderKnobProps) {
    const style = vertical ? { bottom: `calc(${valuePercent}% - 8px)` } : { left: `calc(${valuePercent}% - 8px)` };

    return <div data-slider-knob="" onFocus={onFocus} style={style} tabIndex={tabIndex} />;
}
