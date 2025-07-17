import { ListItemProps } from './ListItem';
import { createExampleChildElement } from '-/utils/createExampleChildElement';
import { ComponentExampleFn } from '-/utils/demo';

export const ListItemExample: ComponentExampleFn<ListItemProps> = ({ action, setState }) => ({
    render: ({ props, Component, id }) => {
        return (
            <Component
                {...props}
                leading={createExampleChildElement({ exampleState: props, name: 'leading', setState, action, id })}
                trailing={createExampleChildElement({ exampleState: props, name: 'trailing', setState, action, id })}
            />
        );
    },
    presets: [
        // really long label
        {
            value: 'long-label',
            label: 'Long Label',
            propState: {
                label: 'This is a really long label that should be truncated if it exceeds the width of the ListItem',
                trailing: 'Checkbox',
                leading: 'Avatar',
            },
        },
    ],
});
