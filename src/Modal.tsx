import './modal.scss';
import { SvgClose } from '@bspk/icons/Close';
import { useMemo } from 'react';

import { Button } from './Button';
import { DialogProps, Dialog } from './Dialog';
import { Txt } from './Txt';
import { useId } from './hooks/useId';
import { srOnly } from './utils/srOnly';

export type ModalProps = DialogProps & {
    /**
     * Modal header.
     *
     * @required
     */
    header: string;
    /**
     * Modal description.
     *
     * @required
     */
    description: string;
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
 * @name Modal
 */
function Modal({
    //
    header,
    description,
    children,
    id: idProp,
    ...dialogProps
}: ModalProps) {
    const id = useId(idProp);

    const ids = useMemo(
        () => ({
            description: `dialog-dialog-${id}-description`,
            title: `dialog-dialog-${id}-title`,
        }),
        [id],
    );

    return (
        <Dialog {...dialogProps} aria-describedby={ids.description} aria-labelledby={ids.title}>
            <div data-bspk="modal">
                <header>
                    <Txt as="div" data-dialog-title id={ids.title} variant="heading-h4">
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
                <main>
                    <p {...srOnly(children)} data-dialog-description id={ids.description}>
                        {description}
                    </p>
                    {children}
                </main>
            </div>
        </Dialog>
    );
}

Modal.bspkName = 'Modal';

export { Modal };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
