import { useState } from 'react';
import { SkeletonProps, SkeletonVariant } from '.';
import { Avatar } from '-/components/Avatar';
import { ExamplePlaceholder } from '-/components/ExamplePlaceholder';
import { useTimeout } from '-/hooks/useTimeout';
import { ComponentExample, ComponentExampleRenderProps } from '-/utils/demo';

export const SkeletonExample: ComponentExample<SkeletonProps> = {
    render: ({ props, preset, Component }) => {
        if (preset?.label === 'Loading Transition') return <SkeletonTransition Component={Component} props={props} />;
        return <Component {...props} />;
    },
    presets: [
        {
            label: 'Loading Transition',
            propState: {
                width: '100px',
                height: '100px',
            },
        },
    ],
    variants: {
        variant: (props) => ({
            children: props.variant ? PROP_VARIANT_CHILDREN[props.variant] : null,
        }),
    },
};

function SkeletonTransition({
    Component,
    props: { children, ...restProps },
}: Pick<ComponentExampleRenderProps<SkeletonProps>, 'Component' | 'props'>) {
    const [loaded, setLoaded] = useState(false);
    useTimeout(() => setLoaded(true), 3000);

    return <Component {...restProps}>{loaded && <>{children}</>}</Component>;
}

const PROP_VARIANT_CHILDREN: Record<SkeletonVariant, SkeletonProps['children']> = {
    rectangular: <ExamplePlaceholder height="100px" width="100px" />,
    circular: <ExamplePlaceholder height="100px" style={{ borderRadius: '100%' }} width="100px" />,
    photo: (
        <ExamplePlaceholder height="100px" width="100px">
            Loaded
        </ExamplePlaceholder>
    ),
    profile: <Avatar color="red" name="Bob Robertson" />,
    thumbnail: <ExamplePlaceholder height="100px" width="100px" />,
};
