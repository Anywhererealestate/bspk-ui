import { ModalProps, Modal } from '.';
import { Button } from '-/components/Button';
import { Checkbox } from '-/components/Checkbox';
import { ListItem } from '-/components/ListItem';
import { ComponentExampleFn } from '-/utils/demo';

export const ModalExample: ComponentExampleFn<ModalProps> = ({ action }) => ({
    variants: false,
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
        // confirmation modal
        {
            value: 'confirmation',
            label: 'Modal (confirmation)',
            propState: {
                header: 'Confirmation Modal',
                description: 'This modal has a call to action and a cancel button.',
                children: (
                    <p>
                            This is a confirmation modal. It has a call to action and a cancel button. The call to
                            action is the primary button and the cancel button is the tertiary button.
                        </p>
                ),
                callToAction: {
                    label: 'Call to Action',
                    onClick: () => action('Call to Action clicked'),
                },
                cancelButton: 'Cancel',
            },
        },
        {
            value: 'super long content',
            label: 'Modal (scrolling)',
            propState: {
                header: 'Header Only',
                description: 'This modal has no buttons.',
                children: (
                    <>
                        <p>
                            This is a demo of a scrolling modal. Most modals won&apos;t scroll but mobile uses modals as
                            dropdowns which may have more items than can fit in the screen.
                        </p>
                        {Array(30)
                            .fill('')
                            .map((_, index) => (
                                <ListItem
                                    as="label"
                                    key={`key${index}`}
                                    label={`Option ${index + 1}`}
                                    onClick={() => action(`Option ${index + 1} clicked`)}
                                    trailing={<Checkbox aria-label="" name="" onChange={() => {}} value="" />}
                                />
                            ))}
                    </>
                ),
            },
        },
    ],
});
