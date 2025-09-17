import { SvgCircle } from '@bspk/icons/Circle';
import { SvgSquare } from '@bspk/icons/Square';
import { SvgTriangle } from '@bspk/icons/Triangle';
import { ListItemGroupProps } from '.';
import { ComponentExampleFn } from '-/utils/demo';

export const ListItemGroupExample: ComponentExampleFn<ListItemGroupProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    defaultState: {
        items: [
            {
                label: 'Item 1',
                subText: 'Description for item 1 (button)',
                leading: <SvgTriangle />,
                onClick: () => action('Item 1 clicked'),
            },
            {
                label: 'Item 2',
                subText: 'Description for item 2',
                leading: <SvgCircle />,
            },
            {
                label: 'Item 3',
                subText: 'Description for item 3 (link)',
                leading: <SvgSquare />,
                href: '#item-3',
            },
        ],
    },
    disableProps: [],
    presets: [],
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
    variants: {},
});
