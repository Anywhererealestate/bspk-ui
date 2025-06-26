import './dialog.scss';
import { FocusTrap } from 'focus-trap-react';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { Portal } from './Portal';
import { useId } from './hooks/useId';
import { useLockBodyScroll } from './hooks/useLockBodyScroll';
import { useOutsideClick } from './hooks/useOutsideClick';

import { CommonProps, ElementProps, SetRef } from './';

export type DialogProps = CommonProps<'data-bspk-owner' | 'id'> & {
    /** The content of the dialog. */
    children?: ReactNode;
    /** A ref to the dialog element. */
    innerRef?: SetRef<HTMLDivElement>;
    /**
     * If the dialog should appear.
     *
     * @example
     *     false;
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
};

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
function Dialog({
    //
    children,
    innerRef,
    onClose,
    open,
    placement = 'center',
    showScrim,
    id: idProp,
    ...containerProps
}: ElementProps<DialogProps, 'div'>) {
    const hideScrim = showScrim === false;
    const id = useId(idProp);
    const boxRef = useRef<HTMLDivElement | null>(null);
    const [visibility, setVisibilityState] = useState<'hidden' | 'hiding' | 'show' | 'showing'>(
        open ? 'show' : 'hidden',
    );

    const prevVisibility = useRef(visibility);

    const setVisibility = useCallback((next: typeof visibility) => {
        setVisibilityState((prev) => {
            prevVisibility.current = prev;
            return next;
        });
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => e.key === 'Escape' && onClose(), [onClose]);

    useEffect(() => {
        if (open) {
            if (prevVisibility.current.startsWith('show')) return;
            setVisibility('showing');
            return;
        }

        if (prevVisibility.current.startsWith('hid')) return;
        setVisibility('hiding');
    }, [open, setVisibility]);

    useEffect(() => {
        if (prevVisibility.current === visibility) return;

        if (visibility === 'showing') {
            document.body.style.overflow = 'hidden';
            setTimeout(() => setVisibility('show'), 10);
        }

        if (visibility === 'hiding') {
            document.body.style.overflow = '';
            setTimeout(() => setVisibility('hidden'), 10);
        }
    }, [setVisibility, visibility]);

    useEffect(() => {
        if (visibility.startsWith('hid')) return;

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown, visibility]);

    useOutsideClick([boxRef.current], onClose, !open);

    useLockBodyScroll(visibility !== 'hidden');

    return (
        visibility !== 'hidden' && (
            <Portal>
                <div
                    {...containerProps}
                    data-bspk="dialog"
                    data-placement={placement}
                    data-visibility={visibility}
                    id={id}
                    ref={innerRef}
                    role="presentation"
                >
                    {!hideScrim && <div aria-hidden="true" data-dialog-backdrop />}
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
            </Portal>
        )
    );
}

Dialog.bspkName = 'Dialog';

export { Dialog };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
