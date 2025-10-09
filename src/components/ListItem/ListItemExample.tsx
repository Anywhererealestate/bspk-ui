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

        switch (preset.label) {
            case 'Long Label':
                return <ListItem {...props} leading={leading.element} trailing={trailing.element} />;
            case 'As Button':
                return (
                    <ListItem
                        {...props}
                        leading={leading.element}
                        onClick={() => action('ListItem clicked')}
                        trailing={undefined}
                    />
                );
            case 'As Button Disabled':
                return (
                    <ListItem
                        {...props}
                        disabled={true}
                        leading={leading.element}
                        onClick={() => action('ListItem clicked')}
                        readOnly={undefined}
                        trailing={undefined}
                    />
                );
            case 'As Button Read Only':
                return (
                    <ListItem
                        {...props}
                        disabled={undefined}
                        leading={leading.element}
                        onClick={() => action('ListItem clicked')}
                        readOnly={true}
                        trailing={undefined}
                    />
                );
            default:
                return <ListItem {...props} as={as} leading={leading.element} trailing={trailing.element} />;
        }

        // return <ListItem {...props} as={as} leading={leading.element} trailing={trailing.element} />;
    },
});
