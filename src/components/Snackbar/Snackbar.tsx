import './snackbar.scss';
import { FocusTrap } from 'focus-trap-react';
import { ReactNode, isValidElement, useEffect, useRef } from 'react';
import { Button } from '-/components/Button';
import { Portal } from '-/components/Portal';
import { Truncated } from '-/components/Truncated';
import { useId } from '-/hooks/useId';
import { BspkIcon, CommonProps, SetRef } from '-/types/common';

export type SnackbarProps = CommonProps<'id'> & {
    /**
     * Text to be shown in the snackbar
     *
     * @required
     */
    text: string;
    /**
     * Whether to show a close button on the snackbar.
     *
     * Since there is no default timeout, this is true by default. You can provide a timeout to auto-dismiss the
     * snackbar in addition to the close button.
     *
     * @default true
     */
    closeButton?: boolean;
    /**
     * Label for the close button.
     *
     * @default Dismiss
     */
    closeButtonLabel?: string;
    /**
     * The icon of the button.
     *
     * @type BspkIcon
     */
    icon?: BspkIcon | ReactNode;
    /**
     * Callback when the snackbar is dismissed
     *
     * @required
     */
    onClose: () => void;
    /**
     * Time in milliseconds after which the snackbar will auto dismiss.
     *
     * If no timeout is provided, and closeButton is set to false the snackbar will not be dismissable.
     *
     * By default this is set to 5000 milliseconds (5 seconds). To disable auto-dismissal, set this to 0 or false.
     *
     * @default 5000
     */
    timeout?: number | false;
    /**
     * If the snackbar is open or not.
     *
     * @default false
     */
    open?: boolean;
    /** A ref to the snackbar element. */
    innerRef?: SetRef<HTMLDivElement>;
    /**
     * If focus trapping should be disabled. Generally this should not be disabled as snackbars should always trap
     * focus.
     *
     * @default false
     */
    disableFocusTrap?: boolean;
};

/**
 * Snackbars are intended to provide feedback about an action. Because of focus trap these will interrupt the customer
 * experience.
 *
 * #### Inline
 *
 * Inline snackbars are added inside the component that triggers them. They are controlled via props and state. These
 * are useful for smaller applications that do not require global state management.
 *
 * #### Managed
 *
 * Managed snackbars are controlled via the SnackbarManager component and the sendSnackBar and clearSnackBar functions.
 * This allows snackbars to be triggered from anywhere in the application without needing to pass props or state down
 * and prevents duplicate snackbars from being shown.
 *
 * @example
 *     import { Snackbar } from '@bspk/ui/Snackbar';
 *     import { Button } from '@bspk/ui/Button';
 *     import { useState } from 'react';
 *     import { sendSnackBar } from '@bspk/ui/Snackbar/Manager';
 *
 *     function ExampleComponent(props) {
 *         const [snackbarOpen, setSnackbarOpen] = useState(false);
 *
 *         return (
 *             <>
 *                 // -- inline snackbar
 *                 <Button label="Show snackbar" onClick={() => setSnackbarOpen(true)} size="medium" title="Snackbar" />
 *                 <Snackbar text="I am an example." open={snackbarOpen} onClose={() => setSnackbarOpen(false)} />
 *                 // -- managed snackbar
 *                 <Button
 *                     label="Show managed snackbar"
 *                     onClick={() => sendSnackBar({ text: 'I am a managed snackbar!' })}
 *                 />
 *             </>
 *         );
 *     }
 *
 * @name Snackbar
 *
 * @phase UXReview
 */
export function Snackbar({
    id: propId,
    text,
    timeout = 5000,
    closeButton = true,
    closeButtonLabel = 'Dismiss',
    icon,
    onClose,
    open = false,
    innerRef,
    disableFocusTrap = false,
}: SnackbarProps) {
    const id = useId(propId);
    const boxRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (open && timeout) {
            const timer = setTimeout(() => {
                onClose?.();
            }, timeout);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [open, timeout, onClose]);

    if (!open) return null;

    return (
        <Portal>
            <div aria-live="off" data-bspk="snackbar" id={id} ref={innerRef}>
                <FocusTrap
                    active={!disableFocusTrap}
                    focusTrapOptions={{
                        clickOutsideDeactivates: true,
                        fallbackFocus: () => boxRef.current!,
                    }}
                >
                    <div data-snackbar-content key={id} role="alert">
                        <div data-snackbar-icon-text>
                            {!!icon && isValidElement(icon) && (
                                <span aria-hidden={true} data-snackbar-icon>
                                    {icon}
                                </span>
                            )}
                            <Truncated data-label>{text}</Truncated>
                        </div>
                        {closeButton && <Button label={closeButtonLabel} onClick={onClose} variant="tertiary" />}
                    </div>
                </FocusTrap>
            </div>
        </Portal>
    );
}
