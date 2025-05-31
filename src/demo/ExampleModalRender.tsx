import { useId } from 'react';

import { Button } from '../Button';
import { ModalProps, Modal } from '../Modal';
import { useModalState } from '../hooks/useModalState';

import { Preset, DemoSetState } from './examples';

export function ExampleModalRender({
    props,
    preset,
    setState,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: ModalProps & Record<string, any>;
    preset?: Preset<ModalProps>;
    setState: DemoSetState;
}) {
    let label = 'Open Modal';

    const dialogId = useId();
    const openKey = `${dialogId}-open`;

    const { open, onClose, onOpen } = useModalState(!!props[openKey], (next) => setState({ [openKey]: next }));

    const presetState: Partial<ModalProps> = preset?.state || {};
    if (presetState?.placement) label += ` (${presetState?.placement})`;

    return (
        <>
            <Button label={label} onClick={() => onOpen()} />
            <Modal data-example-component id="exampleId" {...props} onClose={onClose} open={open}>
                <pre>{JSON.stringify(props, null, '\t')}</pre>
            </Modal>
        </>
    );
}
