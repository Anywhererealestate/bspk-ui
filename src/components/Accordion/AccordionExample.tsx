import { AccordionProps } from '.';
import { createExampleChildElement } from '-/utils/createExampleChildElement';
import { ComponentExampleFn } from '-/utils/demo';

export const exampleAccordionItem = (id: number, disabled?: boolean) => ({
    id,
    title: `Section ${id}`,
    disabled,
    children: <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>Example Content</div>,
});

export const AccordionExample: ComponentExampleFn<AccordionProps> = ({ action, setState }) => ({
    containerStyle: { minHeight: 225 },
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
                            title: `Section 1`,
                            leading: leadingElement,
                            trailing: trailingElement,
                            children: (
                                <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>
                                    Example Content
                                </div>
                            ),
                        },
                        ...(props.items ?? []),
                    ]}
                />
            </>
        );
    },
    presets: [
        {
            label: 'Multiple Sections',
            propState: {
                items: [exampleAccordionItem(2), exampleAccordionItem(3)],
            },
        },
        {
            label: 'Multiple Sections with 1 disabled',
            propState: {
                items: [exampleAccordionItem(2, true), exampleAccordionItem(3)],
            },
        },
    ],
    hideVariants: true,
});
