import './toggle-option.scss';
import { ReactElement } from 'react';

export type ToggleOptionProps = {
    /**
     * The label of the field. Also used as the aria-label of the checkbox.
     *
     * @required
     */
    label: string;
    /** The description of the field. */
    description?: string;
    /** The control element to use. */
    children?: ReactElement;
    /** The size of the control option label. */
    size?: 'base' | 'large' | 'small';
};

/**
 * A utility component that wraps a checkbox, radio, and switch.
 *
 * @name ToggleOption
 */
function ToggleOption({ label, description, children, size }: ToggleOptionProps) {
    return (
        <label data-bspk="toggle-option" data-size={size}>
            <span data-control>{children}</span>
            <span data-content>
                <span data-label>{label}</span>
                {description && <span data-description>{description}</span>}
            </span>
        </label>
    );
}

ToggleOption.bspkName = 'ToggleOption';

export { ToggleOption };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
