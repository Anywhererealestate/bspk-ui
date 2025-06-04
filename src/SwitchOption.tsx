import { SwitchProps, Switch } from './Switch';
import { ToggleOptionProps, ToggleOption } from './ToggleOption';

export type SwitchOptionProps = Omit<SwitchProps, 'aria-label'> & Pick<ToggleOptionProps, 'description' | 'label'>;

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * @name SwitchOption
 */
function SwitchOption({ label, description, ...checkboxProps }: SwitchOptionProps) {
    return (
        <ToggleOption data-bspk="switch-option" description={description} label={label}>
            <Switch {...checkboxProps} aria-label={label} />
        </ToggleOption>
    );
}

SwitchOption.bspkName = 'SwitchOption';

export { SwitchOption };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
