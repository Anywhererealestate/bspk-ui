import { useCallback, useMemo, useState } from 'react';

import { SwitchProps } from '../Switch';

/**
 * A hook to manage the state of a group of switches. Used alongside the SwitchGroup component.
 *
 * @example
 *     import { Switch } from '@bspk/ui/Switch';
 *     import { useSwitchGroupState } from '@bspk/ui/hooks/useSwitchGroupState';
 *
 *     export function Example() {
 *     const allValues = ['Red', 'Orange', 'Yellow', 'Green'];
 *
 *     const { allSwitchProps, switchProps, values } = useSwitchGroupState(allValues, 'fruits');
 *
 *     return (
 *     <>
 *     <pre>Selected Values: {values.join(', ')}</pre>
 *     <Switch aria-label="All" {...allSwitchProps} />
 *     {allValues.map((value) => (
 *     <Switch key={value} aria-label={value} {...switchProps(value)} />
 *     ))}
 *     </>
 *     );
 *     }
 *
 * @param allValues - The values of the switches.
 * @param name - The name of the switches.
 * @param externalState - The externally managed state of the switches.
 * @returns Properties to pass to the switch, other helper functions, and the state of the switch.
 */
export function useSwitchGroupState(
    allValues: string[],
    name: string,
    externalState?: [values: string[], setValues: (next: string[]) => void],
) {
    const localState = useState<string[]>([]);
    const [values, setValues] = externalState || localState;

    const toggleValue = useCallback(
        (itemValue: string, checked: boolean) => {
            setValues(
                allValues.flatMap((value) => {
                    if (value === itemValue) return checked ? value : [];
                    return values.includes(value) ? value : [];
                }),
            );
        },
        [allValues, setValues, values],
    );

    const switchProps = useCallback(
        (value: string): Pick<SwitchProps, 'checked' | 'name' | 'onChange' | 'value'> => ({
            checked: values.includes(value),
            name,
            onChange: (checked) => toggleValue(value, checked),
            value,
        }),
        [values, name, toggleValue],
    );

    const allSwitchProps = useMemo((): Pick<SwitchProps, 'checked' | 'name' | 'onChange' | 'value'> => {
        return {
            checked: allValues.length === values.length,
            name,
            onChange: () => setValues(allValues.length === values.length ? [] : allValues),
            value: 'all',
        };
    }, [allValues, values.length, name, setValues]);

    return { toggleValue, allSwitchProps, switchProps, values, setValues };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
