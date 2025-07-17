import { AccordionProps } from '.';
import { createExampleChildElement } from '-/utils/createExampleChildElement';
import { ComponentExampleFn } from '-/utils/demo';

export const AccordionExample: ComponentExampleFn<AccordionProps> = ({ action, setState }) => ({
    render: ({ props, Component, id }) => {
        return (
            <>
                <Component
                    {...props}
                    leading={createExampleChildElement(props, 'leading', setState, action, id)}
                    trailing={createExampleChildElement(props, 'trailing', setState, action, id)}
                >
                    <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>Example Content</div>
                </Component>
            </>
        );
    },
    hideVariants: true,
});
