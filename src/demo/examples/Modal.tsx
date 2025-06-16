import { Button } from '../../Button';
import { ModalProps, Modal } from '../../Modal';
import { ComponentExampleFn } from '../utils';

export const ModalExample: ComponentExampleFn<ModalProps> = () => ({
    hideVariants: true,
    render: ({ props, setState }) => {
        const label = 'Open Modal';

        const { children, ...modalProps } = props;

        return (
            <>
                <Button label={label} onClick={() => setState({ open: true })} />
                <Modal data-example-component id="exampleId" {...modalProps} onClose={() => setState({ open: false })}>
                    {children}
                </Modal>
            </>
        );
    },
});
