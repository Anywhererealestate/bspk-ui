import { useCallback, useMemo, useState } from 'react';

import { CheckboxProps } from '-/components/Checkbox';

/**
 * A hook to manage the state of a group of checkboxes. Used alongside the CheckboxGroup component.
 *
 * @example
 *     import { Checkbox } from '@bspk/ui/Checkbox';
 *     import { useCheckboxGroupState } from '@bspk/ui/hooks/useCheckboxGroupState';
 *
 *     function Example() {
 *     const allValues = ['Red', 'Orange', 'Yellow', 'Green'];
 *     const { allCheckboxProps, checkboxProps, values } = useCheckboxGroupState(allValues, 'fruits');
 *     return (
 *     <div>
 *     <pre>Selected Values: {values.join(', ')}</pre> <Checkbox aria-label="All" {...allCheckboxProps} />{' '}
 *     {allValues.map((value) => (
 *     <Checkbox key={value} aria-label={value} {...checkboxProps(value)} />
 *     ))}
 *     </div>
 *     );
 *     }
 *
 * @param allValues - The values of the checkboxes.
 * @param name - The name of the checkboxes.
 * @param externalState - The externally managed state of the checkboxes.
 * @returns Properties to pass to the checkbox, other helper functions, and the state of the checkbox.
 */
export function useCheckboxGroupState(
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

    const checkboxProps = useCallback(
        (value: string): Pick<CheckboxProps, 'checked' | 'name' | 'onChange' | 'value'> => ({
            checked: values.includes(value),
            name,
            onChange: (checked) => toggleValue(value, checked),
            value,
        }),
        [values, name, toggleValue],
    );

    const allCheckboxProps = useMemo((): Pick<
        CheckboxProps,
        'checked' | 'indeterminate' | 'name' | 'onChange' | 'value'
    > => {
        return {
            checked: allValues.length === values.length,
            indeterminate: values.length > 0 && values.length < allValues.length,
            name,
            onChange: () => setValues(allValues.length === values.length ? [] : allValues),
            value: 'all',
        };
    }, [allValues, values.length, name, setValues]);

    return { toggleValue, allCheckboxProps, checkboxProps, values, setValues };
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
