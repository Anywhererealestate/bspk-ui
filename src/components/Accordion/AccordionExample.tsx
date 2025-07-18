import { AccordionProps } from '.';
import { createExampleChildElement } from '-/utils/createExampleChildElement';
import { ComponentExampleFn } from '-/utils/demo';

export const AccordionExample: ComponentExampleFn<AccordionProps> = ({ action, setState }) => ({
    render: ({ props, Component, id }) => {
        const trailingElement = createExampleChildElement({
            exampleState: props,
            name: 'trailing',
            setState,
            action,
            id,
        });
        const leadingElement = createExampleChildElement({
            exampleState: props,
            name: 'leading',
            setState,
            action,
            id,
        });

        return (
            <>
                <Component
                    {...props}
                    items={[
                        {
                            id: 1,
                            title: 'First Section',
                            leading: leadingElement,
                            trailing: trailingElement,
                            children: (
                                <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>
                                    Example Content
                                </div>
                            ),
                        },
                        {
                            id: 2,
                            title: 'Second Section',
                            leading: leadingElement,
                            trailing: trailingElement,
                            children: (
                                <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>
                                    Example Content
                                </div>
                            ),
                        },
                        {
                            id: 3,
                            title: 'Third Section',
                            leading: leadingElement,
                            trailing: trailingElement,
                            children: (
                                <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>
                                    Example Content
                                </div>
                            ),
                        },
                        {
                            id: 4,
                            title: 'Fourth Section',
                            leading: leadingElement,
                            trailing: trailingElement,
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
