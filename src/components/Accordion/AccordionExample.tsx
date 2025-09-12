import { AccordionProps } from '.';
import { createExampleChildElement } from '-/utils/createExampleChildElement';
import { ComponentExampleFn } from '-/utils/demo';

const AccordionContent = () => (
    <p>
        Actualize the plan and markets. Going forward, we should harness the asset. Leverage skillsets to achieve
        maximum market share.
    </p>
);

export const presets = [
    {
        label: 'Multiple Sections',
        propState: {
            items: [
                {
                    id: '2',
                    title: 'Section 2',
                    children: <AccordionContent />,
                },
                {
                    id: '3',
                    title: 'Section 3',
                    children: <AccordionContent />,
                },
            ],
        },
    },
    {
        label: 'Multiple Sections with 1 disabled',
        propState: {
            items: [
                { id: '2', title: 'Section 2', disabled: true, children: <AccordionContent /> },
                { id: '3', title: 'Section 3', children: <AccordionContent /> },
            ],
        },
    },
    {
        label: 'Multiple Sections with 1 disabled and open',
        propState: {
            items: [
                { id: '2', title: 'Section 2', disabled: true, isOpen: true, children: <AccordionContent /> },
                { id: '3', title: 'Section 3', children: <AccordionContent /> },
            ],
        },
    },
];

export const AccordionExample: ComponentExampleFn<AccordionProps> = ({ action, setState }) => ({
    containerStyle: { minHeight: 225 },
    render: ({ props, Component, id, preset }) => {
        const trailing = createExampleChildElement({
            exampleState: props,
            name: 'trailing',
            setState,
            action,
            id,
        });
        const leading = createExampleChildElement({
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
                            id: '1',
                            title: `Section 1`,
                            leading: leading.element,
                            trailing: trailing.element,
                            children: <AccordionContent />,
                        },
                        ...(props.items ?? []),
                    ]}
                    key={preset?.label}
                />
            </>
        );
    },
    presets,
    variants: false,
});
