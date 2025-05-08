import { Switch, SwitchProps } from './Switch';
import { ToggleOption, ToggleOptionProps } from './ToggleOption';

export type SwitchOptionProps = Omit<SwitchProps, 'aria-label'> &
    Pick<ToggleOptionProps, 'description' | 'label' | 'size'>;

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * @name SwitchOption
 */
function SwitchOption({ label, description, size, ...checkboxProps }: SwitchOptionProps) {
    return (
        <ToggleOption data-checkbox-field description={description} label={label} size={size}>
            <Switch {...checkboxProps} aria-label={label} />
        </ToggleOption>
    );
}

SwitchOption.bspkName = 'SwitchOption';

export { SwitchOption };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
