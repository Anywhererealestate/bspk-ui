export const useNormalizeSliderValue = ({ min, max, step }: { min: number; max: number; step: number }) => {
    const clamp = (val: number) => Math.min(Math.max(val, min), max);

    const normalizeSliderValue = (val: number) => {
        let newValue = clamp(val);

        newValue = Math.round(newValue / step) * step;

        // Fix floating-point precision issues
        newValue = parseFloat(newValue.toFixed(10));

        return clamp(newValue);
    };

    return { normalizeSliderValue };
};
