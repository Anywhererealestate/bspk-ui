import { SvgClose } from '@bspk/icons/Close';
import { ReactNode, useMemo, useRef } from 'react';

import { Button, ButtonProps } from '-/components/Button';
import { DialogProps, Dialog } from '-/components/Dialog';
import { Txt } from '-/components/Txt';
import { useEventListener } from '-/hooks/useAddEventListener';
import { useDebounceCallback } from '-/hooks/useDebounceCallback';
import { useUIContext } from '-/hooks/useUIContext';
import { CallToActionButton } from '-/types/common';

import './modal.scss';

// This hook is used to set the height of the modal based on the dialog box height.
// It listens to the resize event and updates the modal height accordingly.
function useDialogHeight() {
    const onResize = () => {
        const { dialogBox, modal } = modalRefs.current || {};
        if (!dialogBox || !modal) return;
        modal.style.height = `${dialogBox.offsetHeight}px`;
        modal.style.visibility = '';
    };

    useEventListener('resize', useDebounceCallback(onResize, 100));

    const modalRefs = useRef<{
        dialogBox: HTMLDivElement | null;
        modal: HTMLDivElement | null;
    } | null>(null);

    return {
        setModalRefs: (node: HTMLElement | null) => {
            if (!node) return;
            const dialogBox = node.querySelector<HTMLDivElement>('[data-dialog-box]');
            const modal = node.querySelector<HTMLDivElement>('[data-bspk="modal"]');
            modalRefs.current = {
                dialogBox,
                modal,
            };
            if (!dialogBox || !modal) return;
            modal.style.height = `${dialogBox.offsetHeight}px`;
            modal.style.visibility = '';
        },
    };
}

export type ModalCallToAction = Pick<ButtonProps, 'destructive'> & Pick<CallToActionButton, 'label' | 'onClick'>;

export type ModalProps = Pick<DialogProps, 'data-bspk-owner' | 'id' | 'innerRef' | 'onClose' | 'open'> & {
    /**
     * Modal header.
     *
     * @example
     *     Change your email
     *
     * @required
     */
    header: string;
    /**
     * Modal description. Used for the
     * [aria-description](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-description)
     * attribute.
     *
     * @example
     *     Email change confirmation.
     *
     * @required
     */
    description: string;
    /**
     * Whether to show the cancel button in the footer.
     *
     * Providing a string will set the label of the cancel button.
     *
     * @default false
     */
    cancelButton?: boolean | string;
    /**
     * The call to action button to display in the footer of the modal.
     *
     * @example
     *     {
     *     label: 'Confirm',
     *     onClick: () => action('Confirm clicked'),
     *     }
     */
    callToAction?: ModalCallToAction;
    /**
     * The format of the buttons in the footer. Ignored if not mobile.
     *
     * @default horizontal
     */
    buttonFormat?: 'horizontal' | 'vertical';
    /**
     * The content of the modal.
     *
     * @example
     *     Are you sure you want to change your email address? A confirmation email will be sent to your new address to verify the change. Please check your inbox and follow the instructions to complete the process.
     *
     * @type multiline
     */
    children?: ReactNode;
};

/**
 * Modals display important information that users need to acknowledge. They appear over the interface and block further
 * interactions until an action is selected. Modal is a wrapper around the Dialog component that provides a header and
 * footer for the dialog.
 *
 * @example
 *     import React from 'react';
 *
 *     import { Button } from '@bspk/ui/Button';
 *     import { Modal } from '@bspk/ui/Modal';
 *
 *     export function Example() {
 *         const [open, setOpen] = React.useState(false);
 *
 *         return (
 *             <>
 *                 <Button label="Open Dialog" onClick={() => setOpen(true)} />
 *                 <Modal
 *                     description="Example description"
 *                     header="Example header"
 *                     onClose={() => setOpen(false)}
 *                     open={open}
 *                 >
 *                     Example Modal
 *                 </Modal>
 *             </>
 *         );
 *     }
 *
 * @ignoreRefs ButtonProps
 *
 * @name Modal
 * @phase Dev
 */
function Modal({
    header,
    description,
    children,
    callToAction,
    cancelButton,
    buttonFormat = 'horizontal',
    innerRef,
    ...dialogProps
}: ModalProps) {
    const { isMobile } = useUIContext();

    const buttons: ButtonProps[] = useMemo(() => {
        const nextButtons: ButtonProps[] = [];

        if (callToAction) {
            nextButtons.push({
                ...callToAction,
                variant: 'primary',
                size: isMobile ? 'medium' : 'small',
            });
        }

        if (callToAction && cancelButton) {
            nextButtons.push({
                label: typeof cancelButton === 'string' ? cancelButton : 'Cancel',
                onClick: dialogProps.onClose,
                variant: 'tertiary',
                size: isMobile ? 'medium' : 'small',
            });
        }

        return nextButtons;
    }, [callToAction, cancelButton, dialogProps.onClose, isMobile]);

    const { setModalRefs } = useDialogHeight();

    return (
        <Dialog
            {...dialogProps}
            aria-description={description}
            aria-label={header}
            innerRef={setModalRefs}
            placement="center"
            showScrim={true}
        >
            <div data-bspk="modal" ref={(node) => innerRef?.(node)} style={{ visibility: 'hidden' }}>
                <header>
                    <Txt as="div" data-dialog-title variant="heading-h4">
                        {header}
                    </Txt>
                    <Button
                        icon={<SvgClose />}
                        label="close"
                        onClick={dialogProps.onClose}
                        showLabel={false}
                        variant="tertiary"
                    />
                </header>
                <main>{children}</main>
                {Array.isArray(buttons) && buttons.length > 0 && (
                    <footer data-button-format={buttonFormat}>
                        {buttons.map((buttonProps, idx) => (
                            <Button key={idx} {...buttonProps} size={isMobile ? 'medium' : 'small'} />
                        ))}
                    </footer>
                )}
            </div>
        </Dialog>
    );
}

Modal.bspkName = 'Modal';

export { Modal };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
