/* eslint-disable @typescript-eslint/no-explicit-any */
import { SvgContentCopy } from '@bspk/icons/ContentCopy';
import { SvgDiamond } from '@bspk/icons/Diamond';

import { Avatar } from '../../Avatar';
import { Checkbox } from '../../Checkbox';
import { Img } from '../../Img';
import { LEADING_COMPONENTS, TRAILING_COMPONENTS, ListItem } from '../../ListItem';
import { Radio } from '../../Radio';
import { Switch } from '../../Switch';
import { Tag } from '../../Tag';
import { Txt } from '../../Txt';
import { ComponentExampleFn, DemoAction, DemoSetState } from '../utils';

export const ListItemExample: ComponentExampleFn = ({ action, setState }) => ({
    containerStyle: { width: '50%' },
    propRenderOverrides: (state) => {
        return {
            ...state,
            leading: createChildrenElement(state, 'leading', setState, action),
            trailing: createChildrenElement(state, 'trailing', setState, action),
        };
    },
    propControlsOverrides: {
        leading: {
            options: [...LEADING_COMPONENTS],
            type: 'select',
        },
        trailing: {
            options: [...TRAILING_COMPONENTS],
            type: 'select',
        },
    },
});

export const createChildrenElement = (
    state: Record<string, any>,
    name: string,
    setState: DemoSetState,
    action: DemoAction,
) => {
    const componentName = state[name];

    if (componentName === 'Checkbox' || componentName === 'Radio' || componentName === 'Switch') {
        let As: typeof Checkbox | typeof Radio | typeof Switch = Checkbox;
        if (componentName === 'Radio') As = Radio;
        else if (componentName === 'Switch') As = Switch;

        return (
            <As
                aria-label={`${componentName} demo`}
                checked={state[`${name}-toggle`]}
                name={`${name}-toggle`}
                onChange={(checked: boolean) => {
                    setState({ [`${name}-toggle`]: checked });
                }}
                onClick={() => action(`${name} ${componentName} clicked`)}
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
