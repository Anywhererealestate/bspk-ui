/* eslint-disable @typescript-eslint/no-explicit-any */ import { SvgContentCopy } from '@bspk/icons/ContentCopy';
import { SvgDiamond } from '@bspk/icons/Diamond';
import { DemoAction, DemoSetState } from './demo';

import { Avatar } from '-/components/Avatar';
import { Checkbox } from '-/components/Checkbox';
import { Img } from '-/components/Img';
import { ListItem } from '-/components/ListItem';
import { Radio } from '-/components/Radio';
import { Switch } from '-/components/Switch';
import { Tag } from '-/components/Tag';
import { Txt } from '-/components/Txt';

type ExampleChildElementProps = {
    exampleState: Record<string, any>;
    name: string;
    setState: DemoSetState;
    action: DemoAction;
    id?: string;
};

/**
 * Returns example leading and trailing components for use in component examples. Allows which type of element is
 * rendered to be determined by the example state.
 */
export function createExampleChildElement({ exampleState, name, setState, action, id }: ExampleChildElementProps) {
    const componentName = exampleState[name];

    if (componentName === 'Checkbox' || componentName === 'Radio' || componentName === 'Switch') {
        let As: typeof Checkbox | typeof Radio | typeof Switch = Checkbox;
        if (componentName === 'Radio') As = Radio;
        else if (componentName === 'Switch') As = Switch;

        const toggleName = `data-${name}-toggle-${id}`;

        return (
            <As
                aria-label={`${componentName} demo`}
                checked={exampleState[toggleName]}
                disabled={exampleState.disabled}
                name={`${name}-toggle`}
                onChange={(checked: boolean) => {
                    setState({ [toggleName]: checked });
                }}
                onClick={() => action(`${name} ${componentName} clicked`)}
                readOnly={exampleState.readOnly}
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
        return <Tag label="Tag" />;
    }

    if (componentName === 'Txt') return <Txt>Text</Txt>;

    if (componentName === 'Icon') return <SvgDiamond />;

    return null;
}
