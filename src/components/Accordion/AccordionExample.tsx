import { AccordionProps } from '.';
import { createExampleChildElement } from '-/utils/createExampleChildElement';
import { ComponentExampleFn } from '-/utils/demo';

export const AccordionExample: ComponentExampleFn<AccordionProps> = ({ action, setState }) => ({
    render: ({ props, Component, id }) => {
        return (
            <>
                <Component
                    {...props}
                    items={[
                        {
                            id: 1,
                            title: 'First Section',
                            leading: createExampleChildElement(props, 'leading', setState, action, id),
                            trailing: createExampleChildElement(props, 'trailing', setState, action, id),
                            children: (
                                <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>
                                    Example Content
                                </div>
                            ),
                        },
                        {
                            id: 2,
                            title: 'Second Section',
                            leading: createExampleChildElement(props, 'leading', setState, action, id),
                            trailing: createExampleChildElement(props, 'trailing', setState, action, id),
                            children: (
                                <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>
                                    Example Content
                                </div>
                            ),
                        },
                        {
                            id: 3,
                            title: 'Third Section',
                            leading: createExampleChildElement(props, 'leading', setState, action, id),
                            trailing: createExampleChildElement(props, 'trailing', setState, action, id),
                            children: (
                                <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>
                                    Example Content
                                </div>
                            ),
                        },
                        {
                            id: 4,
                            title: 'Fourth Section',
                            leading: createExampleChildElement(props, 'leading', setState, action, id),
                            trailing: createExampleChildElement(props, 'trailing', setState, action, id),
                            children: (
                                <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>
                                    Example Content
                                </div>
                            ),
                        },
                    ]}
                />
            </>
        );
    },
    hideVariants: true,
});
