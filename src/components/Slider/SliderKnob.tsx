type SliderKnobProps = {
    valuePercent: number;
};

export function SliderKnob({ valuePercent }: SliderKnobProps) {
    return <div data-slider-knob="" style={{ left: `calc(${valuePercent}% - 8px)` }} />;
}
