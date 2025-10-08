import { PhoneNumberInputProps } from '.';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<PhoneNumberInputProps>[] = [];

export const PhoneNumberInputExample: ComponentExampleFn<PhoneNumberInputProps> = ({ action }) => ({
    render: ({ props, Component }) => {
        return (
            <Component
                {...props}
                onChange={(value, countryCode) => {
                    action(`PhoneNumberInput onChange value: "${value}" countryCode: "${countryCode}"`);

                    props.onChange?.(value, countryCode);
                }}
            />
        );
    },
    variants: false,
});
