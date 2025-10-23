import { useState } from 'react';

import { RadioProps } from '-/components/Radio';

/**
 * A hook to manage the state of a single radio. Used alongside the Radio component.
 *
 * @example
 *     import { Radio } from '@bspk/ui/Radio';
 *     import { useRadioState } from '@bspk/ui/hooks/useRadioState';
 *
 *     function Example() {
 *     const { radioProps } = useRadioState('fruits');
 *     return <Radio aria-label="cherry" {...radioProps('cherry')} />;
 *     }
 *
 * @param name - The name of the radio.
 * @param externalState - The externally managed state of the radio.
 * @returns Properties to pass to the radio and the state of the radio.
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
