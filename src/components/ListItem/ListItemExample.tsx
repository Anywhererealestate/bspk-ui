import { ElementType } from 'react';
import { ListItem, ListItemProps } from './ListItem';
import { createExampleChildElement } from '-/utils/createExampleChildElement';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<ListItemProps>[] = [
    {
        label: 'Long Label',
        propState: {
            label: 'This is a really long label that should be truncated if it exceeds the width of the ListItem',
            as: undefined,
            subText: 'See below for other leading and trailing examples',
            trailing: 'Checkbox',
            leading: 'Avatar',
        },
    },
    {
        label: 'As Button',
        propState: {
            label: 'as="button"',
            as: 'button',
            subText: 'Button example',
            trailing: undefined,
            leading: 'Avatar',
        },
    },
    {
        label: 'As Button Disabled',
        propState: {
            label: 'as="button"',
            as: 'button',
            disabled: true,
            subText: 'Disabled button example',
            trailing: undefined,
            leading: 'Avatar',
        },
    },
    {
        label: 'As Button Read Only',
        propState: {
            label: 'as="button"',
            as: 'button',
            subText: 'Read only button example',
            trailing: undefined,
            leading: 'Avatar',
        },
    },
];

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
    presets,
});
