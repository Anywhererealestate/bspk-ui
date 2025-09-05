import { SvgClose } from '@bspk/icons/Close';
import { ReactNode, useRef, useEffect } from 'react';
import './drawer.scss';
import { Button } from '-/components/Button';
import { Dialog, DialogProps } from '-/components/Dialog';
import { Txt } from '-/components/Txt';

export type DrawerProps = Pick<DialogProps, 'container' | 'id' | 'innerRef' | 'owner'> & {
    /** Drawer header. */
    header?: string;
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
     * When true the drawer is temporarily displayed above all other content until closed.
     *
     * @default true
     */
    modal?: boolean;
    /**
     * If true, a close button will be displayed in the drawer header.
     *
     * @default false
     */
    closeButton?: boolean;
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
 * @example
 *     import React from 'react';
 *
 *     import { Button } from '@bspk/ui/Button';
 *     import { Drawer } from '@bspk/ui/Drawer';
 *
 *     export function Example() {
 *         const [open, setOpen] = React.useState(false);
 *
 *         return (
 *             <>
 *                 <Button label="Open Drawer" onClick={() => setOpen(true)} />
 *                 <Drawer
 *                     id="exampleId"
 *                     onClose={() => setOpen(false)}
 *                     open={open}
 *                     placement="right"
 *                     modal={false}
 *                     header="Example Drawer"
 *                     closeButton={true}
 *                 >
 *                     Example Drawer
 *                 </Drawer>
 *             </>
 *         );
 *     }
 *
 * @name Drawer
 * @phase UXReview
 */

export function Drawer({
    header,
    children,
    open = false,
    modal = true,
    closeButton = false,
    placement = 'right',
    onClose,
    ...dialogProps
}: DrawerProps) {
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);

    const setCloseButtonRef = (instance: HTMLButtonElement | null) => {
        closeButtonRef.current = instance;
    };

    useEffect(() => {
        if (open && closeButtonRef.current) {
            closeButtonRef.current.focus();
        }
    }, [open]);
    if (!open) return null;
    const drawerContent = (
        <section
            aria-modal={modal ? 'true' : undefined}
            data-bspk="drawer"
            data-no-portal={modal ? null : true}
            data-persistent-placement={modal ? null : placement}
            role={modal ? 'dialog' : 'complementary'}
        >
            {(header || closeButton) && (
                <div data-drawer-close-only={!header} data-drawer-header>
                    {header && (
                        <Txt as="div" data-drawer-title variant="heading-h4">
                            {header}
                        </Txt>
                    )}
                    {closeButton && (
                        <Button
                            icon={<SvgClose />}
                            iconOnly
                            innerRef={setCloseButtonRef}
                            label="close"
                            onClick={onClose}
                            variant="tertiary"
                        />
                    )}
                </div>
            )}

            {children}
        </section>
    );

    return modal ? (
        <Dialog
            {...dialogProps}
            onClose={onClose || (() => {})}
            open={open}
            placement={placement}
            showScrim={true}
            widthFull={placement === 'bottom' || placement === 'top'}
        >
            {drawerContent}
        </Dialog>
    ) : (
        drawerContent
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
