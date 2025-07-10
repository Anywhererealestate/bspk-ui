/* eslint-disable @typescript-eslint/no-explicit-any */ import { SvgContentCopy } from '@bspk/icons/ContentCopy';
import { SvgDiamond } from '@bspk/icons/Diamond';

import { ListItem, ListItemProps } from '.';
import { Avatar } from '-/components/Avatar';
import { Checkbox } from '-/components/Checkbox';
import { Img } from '-/components/Img';
import { Radio } from '-/components/Radio';
import { Switch } from '-/components/Switch';
import { Tag } from '-/components/Tag';
import { Txt } from '-/components/Txt';
import { ComponentExampleFn, DemoAction, DemoSetState } from '-/utils/demo';


export const ListItemExample: ComponentExampleFn<ListItemProps> = ({ action, setState }) => ({
    render: ({ props, Component, id }) => {
        return (
            <Component
                {...props}
                leading={createChildrenElement(props, 'leading', setState, action, id)}
                trailing={createChildrenElement(props, 'trailing', setState, action, id)}
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

export const createChildrenElement = (
    state: Record<string, any>,
    name: string,
    setState: DemoSetState,
    action: DemoAction,
    id?: string,
) => {
    const componentName = state[name];

    if (componentName === 'Checkbox' || componentName === 'Radio' || componentName === 'Switch') {
        let As: typeof Checkbox | typeof Radio | typeof Switch = Checkbox;
        if (componentName === 'Radio') As = Radio;
        else if (componentName === 'Switch') As = Switch;

        const toggleName = `data-${name}-toggle-${id}`;
        return (
            <As
                aria-label={`${componentName} demo`}
                checked={state[toggleName]}
                disabled={state.disabled}
                name={`${name}-toggle`}
                onChange={(checked: boolean) => {
                    setState({ [toggleName]: checked });
                }}
                onClick={() => action(`${name} ${componentName} clicked`)}
                readOnly={state.readOnly}
                value={`${name}-${componentName}`}
            />
        );
    }

    if (componentName === 'ListItemButton')
        return (
            <ListItem.Button
                icon={<SvgContentCopy />}
                label="LI Button"
                onClick={() => action('ListItem button clicked')}
            />
        );

    if (componentName === 'Img') return <Img alt="placeholder" src="/placeholder.svg" />;

    if (componentName === 'Avatar') return <Avatar name="List Item" showTooltip={false} />;

    if (componentName === 'Tag') {
        return <Tag>Tag</Tag>;
    }

    if (componentName === 'Txt') return <Txt>Text</Txt>;

    if (componentName === 'Icon') return <SvgDiamond />;

    return null;
};
