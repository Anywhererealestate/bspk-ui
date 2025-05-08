import { SvgClose } from '@bspk/icons/Close';
import { css } from '@emotion/react';
import { useMemo } from 'react';

import { Button } from './Button';
import { Dialog, DialogProps } from './Dialog';
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
 * TODO: Add support for custom header and footer
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
            <div css={style} data-modal-body>
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

export const style = css`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: var(--spacing-sizing-02);
    padding: var(--spacing-sizing-04);

    > header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-sizing-04);
    }

    main {
        overflow: auto;
        flex: 1;
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
