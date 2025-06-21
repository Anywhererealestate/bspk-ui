import './modal.scss';
import { SvgClose } from '@bspk/icons/Close';
import { ReactNode, useMemo } from 'react';

import { Button, ButtonProps } from './Button';
import { DialogProps, Dialog } from './Dialog';
import { Txt } from './Txt';
import { useResponsive } from './hooks/useResponsive';

import { CallToActionButton } from '.';

export type ModalCallToAction = Pick<ButtonProps, 'destructive'> & Pick<CallToActionButton, 'label' | 'onClick'>;

export type ModalProps = Pick<DialogProps, 'id' | 'innerRef' | 'onClose' | 'open'> & {
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
 * @phase WorkInProgress
 */
function Modal({
    header,
    description,
    children,
    callToAction,
    cancelButton,
    buttonFormat = 'horizontal',
    ...dialogProps
}: ModalProps) {
    const { isMobile } = useResponsive();

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

    return (
        <Dialog {...dialogProps} aria-description={description} aria-label={header} placement="center" showScrim={true}>
            <div data-bspk="modal">
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
