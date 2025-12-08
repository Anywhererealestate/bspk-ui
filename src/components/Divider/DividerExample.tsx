import { CSSProperties } from 'react';

import { DividerProps } from './Divider';
import { ExamplePlaceholder } from '-/components/ExamplePlaceholder';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<DividerProps>[] = [];

export const DividerExample: ComponentExample<DividerProps> = {
    render: ({ props, Component }) => {
        const style: CSSProperties =
            props.orientation === 'vertical' ? { height: 300, width: 100 } : { height: 100, width: '300px' };
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: props.orientation === 'vertical' ? 'row' : 'column',
                    alignItems: props.orientation === 'vertical' ? 'center' : 'stretch',
                    justifyContent: props.orientation === 'vertical' ? 'center' : 'stretch',
                    maxWidth: props.orientation !== 'vertical' ? '300px' : 'auto',
                }}
            >
                <ExamplePlaceholder
                    style={{ ...style, flexDirection: props.orientation !== 'vertical' ? 'row' : 'column' }}
                />
                <Component {...props} />
                <ExamplePlaceholder
                    style={{ ...style, flexDirection: props.orientation !== 'vertical' ? 'row' : 'column' }}
                />
            </div>
        );
    },
    presets: [
        {
            label: 'Divider - Horizontal',
            designPattern:
                'Horizontal thin line that separates grouped content in a list or other containers with the option to include a section/group label.',
            propState: {
                orientation: 'horizontal',
            },
        },
        {
            label: 'Divider - Vertical',
            designPattern:
                'Vertical thin line that separates grouped content or other visual elements within a container.',
            propState: {
                orientation: 'vertical',
            },
        },
    ],
};
