/* eslint-disable @cspell/spellchecker */
import { useState, useEffect } from 'react';

import { SkeletonProps } from '../../Skeleton';
import { useTimeout } from '../../hooks/useTimeout';
import { ComponentExample } from '../utils';

export const SkeletonExample: ComponentExample<SkeletonProps> = {
    render: ({ props, preset, Component }) => {
        if (preset?.label === 'Loading Transition') return <SkeletonTransition {...props} Component={Component} />;
        return <Component {...props} />;
    },
    presets: [
        {
            label: 'Loading Transition',
            propState: {
                textVariant: 'body-base',
                textLines: 3,
            },
        },
    ],
};

function SkeletonTransition({ Component, ...props }: { Component: React.ComponentType<Record<string, unknown>> }) {
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
