import { AccordionGroupProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const AccordionGroupExample: ComponentExample<AccordionGroupProps> = {
    render: ({ props, Component }) => {
        return (
            <>
                <Component
                    {...props}
                    items={[
                        {
                            id: 1,
                            title: 'First Section',
                            children: (
                                <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>
                                    Example Content
                                </div>
                            ),
                        },
                        {
                            id: 2,
                            title: 'Second Section',
                            children: (
                                <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>
                                    Example Content
                                </div>
                            ),
                        },
                        {
                            id: 3,
                            title: 'Third Section',
                            children: (
                                <div style={{ padding: 50, textAlign: 'center', backgroundColor: '#DBDBDB' }}>
                                    Example Content
                                </div>
                            ),
                        },
                        {
                            id: 4,
                            title: 'Fourth Section',
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
};
