import { SvgClose } from '@bspk/icons/Close';
import { ReactNode } from 'react';
import './drawer.scss';
import { Button } from '-/components/Button';

const DEFAULT = {
    variant: 'none',
    open: false,
    placement: 'right',
} as const;

export type DrawerProps = {
    /**
     * The content of the drawer.
     *
     * @required
     */
    children: ReactNode;
    /**
     * Controls whether the drawer is open.
     *
     * @default false
     */
    open?: boolean;
    /**
     * The variant of the drawer.
     *
     * @default none
     */
    variant?: 'modal' | 'none' | 'persistent';
    /**
     * The placement of the drawer.
     *
     * @default right
     */
    placement?: 'bottom' | 'left' | 'right' | 'top';
    /** Optional callback when the drawer requests to close. */
    onClose?: () => void;
};

/**
 * Drawer component displays a panel that slides in from the edge of the screen. It can be used to show additional
 * content or actions without navigating away from the current view.
 *
 * Supports modal, persistent, and none variants, and can be placed on any screen edge.
 *
 * @example
 *     import { Drawer } from '@bspk/ui/Drawer';
 *
 *     function Example() {
 *         return <Drawer>Example Drawer</Drawer>;
 *     }
 *
 * @name Drawer
 * @phase Dev
 */

function Drawer({
    children,
    open = DEFAULT.open,
    variant = DEFAULT.variant,
    placement = 'right',
    onClose,
}: DrawerProps) {
    if (!open) return null;

    return (
        <aside
            aria-modal={variant === 'modal' ? 'true' : undefined}
            data-bspk="drawer"
            data-placement={placement}
            data-variant={variant}
            role={variant === 'modal' ? 'dialog' : 'complementary'}
        >
            {/* <button
                aria-label="Close drawer"
                data-close
                onClick={onClose}
                style={{ position: 'absolute', top: 8, right: 8 }}
                type="button"
            >
                ×
            </button> */}
            <Button
                icon={<SvgClose />}
                iconOnly
                label="close"
                // onClick={dialogProps.onClose}
                onClick={onClose}
                variant="tertiary"
            />
            <div data-content>{children}</div>
        </aside>
    );
}

Drawer.bspkName = 'Drawer';

export { Drawer };
