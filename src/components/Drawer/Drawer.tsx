import { SvgClose } from '@bspk/icons/Close';
import { ReactNode } from 'react';
import './drawer.scss';
import { Button } from '-/components/Button';
import { Dialog } from '-/components/Dialog';

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
     * @default modal
     */
    variant?: 'modal' | 'permanent' | 'temporary';
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

export function Drawer({ children, open = false, variant = 'modal', placement = 'right', onClose }: DrawerProps) {
    if (!open) return null;
    const drawerContent = (
        <section
            aria-modal={variant === 'modal' ? 'true' : undefined}
            data-bspk="drawer"
            data-no-portal={variant !== 'modal' ? true : null}
            data-persistent-placement={variant !== 'modal' ? placement : null}
            data-variant={variant}
            role={variant === 'modal' ? 'dialog' : 'complementary'}
        >
            {variant === 'temporary' && (
                <Button icon={<SvgClose />} iconOnly label="close" onClick={onClose} variant="tertiary" />
            )}
            {/* <div data-content>{children}</div> */}
            {children}
        </section>
    );

    return variant === 'modal' ? (
        <Dialog
            onClose={onClose ?? (() => {})}
            open={open}
            placement={placement}
            showScrim={variant === 'modal' ? true : false}
            widthFull={placement === 'bottom' || placement === 'top'}
        >
            {drawerContent}

            {/* <section
                aria-modal={variant === 'modal' ? 'true' : undefined}
                data-bspk="drawer"
                data-variant={variant}
                role={variant === 'modal' ? 'dialog' : 'complementary'}
            > */}
            {/* <Button icon={<SvgClose />} iconOnly label="close" onClick={onClose} variant="tertiary" /> */}
            {/* <div data-content>{children}</div> */}
            {/* {children} */}
            {/* </section> */}
        </Dialog>
    ) : (
        drawerContent
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
