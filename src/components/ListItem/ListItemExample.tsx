import { ElementType } from 'react';
import { ListItem, ListItemProps } from './ListItem';
import { ElementProps } from '-/types/common';
import { createExampleChildElement } from '-/utils/createExampleChildElement';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets = (action: (param: string) => void): Preset<ListItemProps>[] => [
    {
        label: 'Long Label',
        propState: {
            label: 'This is a really long label that should be truncated if it exceeds the width of the ListItem',
            as: undefined,
            subText: 'See below for other leading and trailing examples',
            trailing: 'Checkbox',
            leading: 'Avatar',
            disabled: undefined,
            readOnly: undefined,
            'aria-disabled': undefined,
            'aria-readonly': undefined,
        } as ElementProps<ListItemProps<'div'>, 'div'>,
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
            disabled: undefined,
            readOnly: undefined,
            'aria-readonly': undefined,
            onClick: () => action('This is aria disabled and should not show'),
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
            'aria-disabled': undefined,
            'aria-readonly': undefined,
            onClick: () => action('This is not disabled or readonly and should show'),
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
            'aria-disabled': undefined,
            'aria-readonly': undefined,
            onClick: () => action('This is disabled and should not show'),
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
            'aria-disabled': undefined,
            'aria-readonly': undefined,
            onClick: () => action('This is readonly and should not show'),
        } as ElementProps<ListItemProps<'button'>, 'button'>,
    },
];

export const ListItemExample: ComponentExampleFn<ListItemProps> = ({ action, setState }) => ({
    presets: presets(action),
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

        return <ListItem {...props} as={as} leading={leading.element} trailing={trailing.element} />;
    },
    variants: false,
});
