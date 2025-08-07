import { ElementType } from 'react';
import { ListItem, ListItemProps } from './ListItem';
import { createExampleChildElement } from '-/utils/createExampleChildElement';
import { ComponentExampleFn } from '-/utils/demo';

export const ListItemExample: ComponentExampleFn<ListItemProps> = ({ action, setState }) => ({
    render: ({ props, id }) => {
        const leading = createExampleChildElement({
            exampleState: props,
            name: 'leading',
            setState,
            action,
            id,
        });
        const trailing = createExampleChildElement({
            exampleState: props,
            name: 'trailing',
            setState,
            action,
            id,
        });

        let as: ElementType = props.as || 'div';

        if (trailing.componentName && ['Checkbox', 'Radio', 'Switch'].includes(trailing.componentName)) as = 'label';

        return <ListItem {...props} as={as} leading={leading.element} trailing={trailing.element} />;
    },
    presets: [
        {
            value: 'long-label',
            label: 'Long Label',
            propState: {
                label: 'This is a really long label that should be truncated if it exceeds the width of the ListItem',
                subText: 'See below for other leading and trailing examples',
                trailing: 'Checkbox',
                leading: 'Avatar',
            },
        },
    ],
});
