export const useNormalizeSliderValue = ({
    minimum,
    maximum,
    intervalType,
    interval,
    precision,
}: {
    minimum: number;
    maximum: number;
    intervalType: 'continuous' | 'discrete';
    interval: number;
    precision: number;
}) => {
    const clamp = (val: number) => Math.min(Math.max(val, minimum), maximum);

    const normalizeSliderValue = (val: number) => {
        let newValue = clamp(val);

        if (intervalType === 'discrete') {
            newValue = Math.round(newValue / interval) * interval;
        } else {
            const factor = Math.pow(10, precision);
            newValue = Math.round(newValue * factor) / factor;
        }

        return clamp(newValue);
    };

    return { normalizeSliderValue };
};
