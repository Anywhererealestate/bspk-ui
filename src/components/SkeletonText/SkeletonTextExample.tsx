/* eslint-disable @cspell/spellchecker */ import { useState, useEffect } from 'react';

import { useTimeout } from '-/hooks/useTimeout';
import { ComponentExample } from '-/utils/demo';

import { SkeletonTextProps } from '.';

export const SkeletonTextExample: ComponentExample<SkeletonTextProps> = {
    render: ({ props, preset, Component }) => {
        if (preset?.label === 'Loading Transition') return <SkeletonTextTransition {...props} Component={Component} />;
        return <Component {...props} />;
    },
    presets: [
        {
            label: 'Loading Transition',
            propState: {
                variant: 'body-base',
                lines: 3,
            },
        },
    ],
};

function SkeletonTextTransition({
    Component,
    ...props
}: SkeletonTextProps & {
    Component: React.ComponentType<SkeletonTextProps>;
}) {
    const loadingTimeout = useTimeout();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        loadingTimeout.set(() => setLoaded(true), 3000);
    }, [loadingTimeout]);
    return (
        <Component {...props}>
            {loaded && (
                <p>
                    Synergestic actionables turn the ship, or vertical integration, offerings locked and loaded, so get
                    buy-in.
                </p>
            )}
        </Component>
    );
}
