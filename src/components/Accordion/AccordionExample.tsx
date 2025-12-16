import { AccordionProps } from '.';
import { Avatar } from '-/components/Avatar';
import { ComponentExampleFn, Preset } from '-/utils/demo';

const AccordionContent = () => (
    <p>
        Actualize the plan and markets. Going forward, we should harness the asset. Leverage skillsets to achieve
        maximum market share.
    </p>
);

export const presets: Preset<AccordionProps>[] = [
    {
        label: 'Default',
        propState: {
            items: [
                {
                    id: '1',
                    title: `Section 1`,
                    subtitle: 'Subtitle',
                    children: <AccordionContent />,
                },
                {
                    id: '2',
                    title: 'Section 2',
                    children: <AccordionContent />,
                    leading: <Avatar name="Avatar" size="small" />,
                    trailing: <span>Trailing</span>,
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
        label: '1 disabled',
        propState: {
            items: [
                {
                    id: '1',
                    title: `Section 1`,
                    children: <AccordionContent />,
                },
                { id: '2', title: 'Section 2', disabled: true, children: <AccordionContent /> },
                { id: '3', title: 'Section 3', children: <AccordionContent /> },
            ],
        },
    },
    {
        label: '1 disabled and open (but not showing)',
        hideDemoOption: true,
        propState: {
            items: [
                {
                    id: '1',
                    title: `Section 1`,
                    children: <AccordionContent />,
                },
                { id: '2', title: 'Section 2', disabled: true, isOpen: true, children: <AccordionContent /> },
                { id: '3', title: 'Section 3', children: <AccordionContent /> },
            ],
        },
    },
];

export const AccordionExample: ComponentExampleFn<AccordionProps> = () => ({
    containerStyle: { width: 400, minHeight: 225 },
    defaultState: {
        items: [
            {
                id: '1',
                title: `Section 1`,
                children: <AccordionContent />,
            },
            {
                id: '2',
                title: 'Section 2',
                children: <AccordionContent />,
                leading: <Avatar name="Avatar" size="small" />,
                trailing: <span>Trailing</span>,
            },
            {
                id: '3',
                title: 'Section 3',
                children: <AccordionContent />,
            },
        ],
    },
    presets,
    variants: false,
});
