/* eslint-disable @cspell/spellchecker */
import { ComponentExample, ExamplePlaceholder } from '@utils';
import { useState, useEffect } from 'react';

import { Avatar } from '../../Avatar';
import { SkeletonProps } from '../../Skeleton';
import { useTimeout } from '../../hooks/useTimeout';

export const SkeletonExample: ComponentExample<SkeletonProps> = {
    render: ({ props, preset, Component }) => {
        if (preset?.label === 'Loading Transition') return <SkeletonTransition {...props} Component={Component} />;
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
};

function SkeletonTransition({
    Component,
    ...props
}: SkeletonProps & { Component: React.ComponentType<SkeletonProps> }) {
    const loadingTimeout = useTimeout();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(false);
        loadingTimeout.set(() => setLoaded(true), 3000);
    }, [loadingTimeout, props.variant]);

    return (
        <Component {...props}>
            {loaded && (
                <>
                    {props.variant === 'rectangular' && (
                        <ExamplePlaceholder height={props.height} width={props.width} />
                    )}
                    {props.variant === 'circular' && (
                        <ExamplePlaceholder
                            height={props.height}
                            style={{ borderRadius: '100%' }}
                            width={props.width}
                        />
                    )}
                    {props.variant === 'photo' && (
                        <ExamplePlaceholder height={props.height} width={props.width}>
                            Loaded
                        </ExamplePlaceholder>
                    )}
                    {props.variant === 'profile' && <Avatar color="red" name="Bob Boberson" />}
                    {props.variant === 'thumbnail' && <ExamplePlaceholder height={props.height} width={props.width} />}
                </>
            )}
        </Component>
    );
}
