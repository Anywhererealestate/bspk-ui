import { SwitchProps, Switch } from './Switch';
import { ToggleOptionProps, ToggleOption } from './ToggleOption';

export type SwitchOptionProps = Omit<SwitchProps, 'aria-label'> & Pick<ToggleOptionProps, 'description' | 'label'>;

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * If only a switch is needed, consider using the Switch component directly.
 *
 * @name SwitchOption
 * @phase DesignReview
 */
function SwitchOption({ label: labelProp, description, ...checkboxProps }: SwitchOptionProps) {
    const label = labelProp || description;

    return (
        label && (
            <ToggleOption data-bspk="switch-option" description={description} label={label}>
                <Switch {...checkboxProps} aria-label={label} />
            </ToggleOption>
        )
    );
}

SwitchOption.bspkName = 'SwitchOption';

export { SwitchOption };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
