import { ElementType } from 'react';
import { ListItem, ListItemProps } from './ListItem';
import { ElementProps } from '-/types/common';
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
        label: 'As Role Button',
        propState: {
            as: undefined,
            label: 'as="button"',
            role: 'button',
            subText: 'Button example',
            trailing: undefined,
            leading: undefined,
            'aria-disabled': true,
        } as ElementProps<ListItemProps<'div'>, 'div'>,
    },
    {
        label: 'As Button',
        propState: {
            label: 'as="button"',
            as: 'button',
            subText: 'Button example',
            trailing: undefined,
            leading: undefined,
            disabled: undefined,
            readOnly: undefined,
        } as ElementProps<ListItemProps<'button'>, 'button'>,
    },
    {
        label: 'As Button Disabled',
        propState: {
            label: 'as="button"',
            as: 'button',
            subText: 'Disabled button example',
            trailing: undefined,
            leading: undefined,
            disabled: true,
            readOnly: false,
        } as ElementProps<ListItemProps<'button'>, 'button'>,
    },
    {
        label: 'As Button Read Only',
        propState: {
            label: 'as="button"',
            as: 'button',
            subText: 'Read only button example',
            trailing: undefined,
            leading: undefined,
            readOnly: true,
            disabled: undefined,
        } as ElementProps<ListItemProps<'button'>, 'button'>,
    },
];

export const ListItemExample: ComponentExampleFn<ListItemProps> = ({ action, setState }) => ({
    presets,
    render: ({ props, id, preset }) => {
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

        if (!preset) return null;

        if (trailing.componentName && ['Checkbox', 'Radio', 'Switch'].includes(trailing.componentName)) as = 'label';

        return (
            <ListItem {...props} aria-disabled={false} as={as} leading={leading.element} trailing={trailing.element} />
        );
    },
    variants: false,
});
