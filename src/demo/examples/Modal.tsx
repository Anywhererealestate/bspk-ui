import { Button } from '../../Button';
import { Checkbox } from '../../Checkbox';
import { ListItem } from '../../ListItem';
import { ModalProps, Modal } from '../../Modal';
import { ComponentExampleFn } from '../utils';

export const ModalExample: ComponentExampleFn<ModalProps> = ({ action }) => ({
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
    presets: [
        {
            value: 'super long content',
            label: 'Modal (scrolling)',
            propState: {
                header: 'Header Only',
                description: 'This modal has no buttons.',
                open: true,
                children: (
                    <>
                        {Array(30)
                            .fill('')
                            .map((_, index) => (
                                <ListItem
                                    key={`key${index}`}
                                    label={`Option ${index + 1}`}
                                    onClick={() => action(`Option ${index + 1} clicked`)}
                                    trailing={<Checkbox aria-label="" name="" onChange={() => {}} value="" />}
                                />
                            ))}
                    </>
                ),
                callToAction: {
                    label: 'Call to Action',
                    onClick: () => action('Call to Action clicked'),
                },
            },
        },
    ],
});
