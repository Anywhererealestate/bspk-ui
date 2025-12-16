import { ReactNode } from 'react';
import { ExamplePlaceholder } from '-/components/ExamplePlaceholder';

export const Slot = ExamplePlaceholder;

function BlockExample(props: { name: string; children: ReactNode }) {
    return {
        ...props,
        type: '',
        props: {},
        key: '',
    };
}

BlockExample.Pattern = (props: { children: ReactNode }) => {
    return {
        ...props,
        type: '',
        props: {},
        key: '',
    };
};

BlockExample.Component = BlockExample.Pattern;

export { BlockExample };
