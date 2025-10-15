import { useState } from 'react';

import { RadioProps } from '-/components/RadioGroup';

/**
 * A hook to manage the state of a single radio-group-item. Used alongside the RadioGroupItem component.
 *
 * @example
 *     import { RadioGroupItem } from '@bspk/ui/RadioGroupItem';
 *     import { useRadioState } from '@bspk/ui/hooks/useRadioState';
 *
 *     export function Example() {
 *     const { radioProps } = useRadioState('fruits');
 *     return <RadioGroupItem aria-label="cherry" {...radioProps('cherry')} />;
 *     }
 *
 * @param name - The name of the radio-group-item. *
 * @param externalState - The externally managed state of the radio-group-item.
 * @returns Properties to pass to the radio-group-item and the state of the radio-group-item.
 */
export function useRadioState(
    name: string,
    externalState?: [value: string | undefined, onChange: (next: string) => void],
) {
    const localState = useState<string>();
    const [value, setValue] = externalState || localState;

    const radioProps = (radioValue: string): Pick<RadioProps, 'checked' | 'name' | 'onChange' | 'value'> => {
        return {
            name,
            checked: value === radioValue,
            value: radioValue,
            onChange: (checked) => {
                if (checked) setValue(radioValue);
            },
        };
    };

    return { radioProps, value, setValue };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
