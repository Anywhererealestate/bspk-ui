import './combo-box.scss';
import { ReactNode } from 'react';

const DEFAULT = {
    variant: 'none',
} as const;

export type ComboBoxProps = {
    /**
     * The content of the combo-box.
     *
     * @required
     */
    children: ReactNode;
    /**
     * The variant of the combo-box.
     *
     * @default none
     */
    variant?: 'none';
};

/**
 * Component description.
 *
 * @example
 *     import { ComboBox } from '@bspk/ui/ComboBox';
 *
 *     function Example() {
 *         return <ComboBox>Example ComboBox</ComboBox>;
 *     }
 *
 * @name ComboBox
 */
function ComboBox({ children, variant = DEFAULT.variant }: ComboBoxProps) {
    return (
        <span data-bspk="combo-box" data-variant={variant || undefined}>
            {children}
        </span>
    );
}

ComboBox.bspkName = 'ComboBox';

export { ComboBox };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
