import { FocusTrap } from 'focus-trap-react';
import { ReactNode, useCallback, useEffect, useRef } from 'react';

import { Portal, PortalProps } from '-/components/Portal';
import { Scrim } from '-/components/Scrim';
import { useId } from '-/hooks/useId';
import { CommonProps, ElementAttributes, SetRef } from '-/types/common';

import './dialog.scss';

export type DialogProps = ElementAttributes<
    'div',
    CommonProps<'id' | 'owner'> &
        Pick<PortalProps, 'container'> & {
            /** The content of the dialog. */
            children?: ReactNode;
            /** A ref to the dialog element. */
            innerRef?: SetRef<HTMLDivElement>;
            /**
             * If the dialog should appear.
             *
             * @default false
             */
            open?: boolean;
            /**
             * Function to call when the dialog is closed.
             *
             * @type () => void
             * @required
             */
            onClose: () => void;
            /**
             * The placement of the dialog on the screen.
             *
             * @default center
             */
            placement?: 'bottom' | 'center' | 'left' | 'right' | 'top';
            /**
             * Whether the dialog should have a scrim behind it.
             *
             * @default true
             */
            showScrim?: boolean;
        }
>;

/**
 * Dialogs display important information that users need to acknowledge. They appear over the interface and block
 * further interactions until an action is selected.
 *
 * @example
 *     import { Dialog } from '@bspk/ui/Dialog';
 *     import { Button } from '@bspk/ui/Button';
 *
 *     function Example() {
 *         const [open, setOpen] = React.useState(false);
 *
 *         return (
 *             <>
 *                 <Button label="Open Dialog" onClick={() => setOpen(true)} />
 *                 <Dialog open={open} onClose={() => setOpen(false)}>
 *                     <h1>Dialog Title</h1>
 *                     <p>This is the content of the dialog.</p>
 *                     <button onClick={() => setOpen(false)}>Close</button>
 *                 </Dialog>
 *             </>
 *         );
 *     }
 *
 * @name Dialog
 * @phase Utility
 */
export function Dialog({
    children,
    innerRef,
    onClose,
    open = false,
    placement = 'center',
    showScrim = true,
    id: idProp,
    owner,
    container,
    attr,
}: DialogProps) {
    const id = useId(idProp);
    const boxRef = useRef<HTMLDivElement | null>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => e.key === 'Escape' && onClose(), [onClose]);

    useEffect(() => {
        document.documentElement.style.overflow = open ? 'hidden' : '';
        if (open) document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown, open]);

    return (
        open && (
            <Portal container={container}>
                <div
                    {...attr}
                    data-bspk="dialog"
                    data-bspk-owner={owner || undefined}
                    data-placement={placement}
                    id={id}
                    ref={innerRef}
                    role="presentation"
                >
                    <FocusTrap
                        focusTrapOptions={{
                            fallbackFocus: () => boxRef.current!,
                            clickOutsideDeactivates: true,
                        }}
                    >
                        <div
                            data-dialog-box
                            ref={(node) => {
                                boxRef.current = node;
                            }}
                            tabIndex={-1}
                        >
                            {children}
                        </div>
                    </FocusTrap>
                </div>
                <Scrim
                    onClick={() => {
                        onClose();
                    }}
                    owner="dialog"
                    visible={showScrim !== false}
                />
            </Portal>
        )
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
