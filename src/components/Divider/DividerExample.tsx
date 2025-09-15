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
                <ExamplePlaceholder direction={props.orientation !== 'vertical' ? 'row' : 'column'} style={style} />
                <Component {...props} />
                <ExamplePlaceholder direction={props.orientation !== 'vertical' ? 'row' : 'column'} style={style} />
            </div>
        );
    },
    presets,
};
