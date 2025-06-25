/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';

import { AlertVariant, ElementProps } from '..';
import { Txt } from '../Txt';

const dimension = (value: number | string) => (typeof value === 'number' ? `${value}px` : `${value}`);

export function ExamplePlaceholder({
    hideSize = false,
    height = 100,
    width = '100%',
    direction = 'row',
    ...props
}: ElementProps<
    {
        hideSize?: boolean;
        height?: number | string;
        width?: number | string;
        direction?: 'column' | 'row';
    },
    'div'
>) {
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <div
            {...props}
            data-example-placeholder
            ref={ref}
            style={{
                ...props.style,
                width: dimension(width),
                height: dimension(height),
                flexDirection: direction,
            }}
        >
            {!hideSize && (
                <>
                    <Txt variant="labels-large">{dimension(width)}</Txt>
                    <Txt>&times;</Txt>
                    <Txt variant="labels-large">{dimension(height)}</Txt>
                </>
            )}
        </div>
    );
}

export type TypeProperty = {
    name: string;
    description?: string;
    type?: string[] | string;
    default?: unknown;
    required?: boolean;
    options?: number[] | string[];
    variants?: string[];
    references?: string[];
    minimum?: number;
    maximum?: number;
    example?: string;
    exampleType?: string;
};

export type DemoAction = (message: string, variant?: AlertVariant) => void;

export type DemoSetState<Props = Record<string, unknown>> = (
    next: Partial<Props> | ((prev: Props) => Partial<Props>),
) => void;

export type ComponentPhase =
    | 'AccessibilityReview'
    | 'Backlog'
    | 'DesignReview'
    | 'ProductionReady'
    | 'Utility'
    | 'WorkInProgress';

export type TypePropertyDemo = Omit<TypeProperty, 'example'> & {
    libraryDefault?: TypeProperty['default'];
    label?: string;
    example?: any;
};

export type TypePropertyDemoWithControls = Pick<TypeProperty, 'type'> &
    TypePropertyDemo & {
        haveControl: boolean;
        typeOptions: number[] | string[] | undefined;
        multiline?: boolean;
    };

export type ComponentExampleRenderProps<Props = Record<string, unknown>> = {
    props: Props;
    preset?: DemoPreset;
    setState: DemoSetState<Props>;
    Component: React.ComponentType<Props>;
    context?: {
        [key: string]: unknown;
        preset?: DemoPreset;
    };
    id: string;
};

export type ComponentExampleRender<Props = Record<string, unknown>> = (
    params: ComponentExampleRenderProps<Props>,
) => React.ReactNode;

export type ComponentExample<Props = Record<string, unknown>> = {
    /**
     * The style of the wrapping component.
     *
     * //
     */
    containerStyle?: React.CSSProperties | ((propState: Props) => React.CSSProperties);
    /**
     * True to hide all or a list of variants to hide.
     *
     * Helpful for hiding variants that can have unexpected collisions with the other examples.
     */
    hideVariants?: string[] | true;
    /**
     * This is used to set the initial propState of the component.
     *
     * Specifically to highlight certain features of the component.
     */
    presets?: Preset<Props>[];
    /**
     * This is used to set the initial propState of the component before any preset propState is applied.
     *
     * Specifically to highlight certain features of the component.
     */
    defaultState?: Partial<Props>;
    /**
     * The component to render in the example.
     *
     * By default, this will be the component that is being documented.
     *
     * If you only need to update the props of the component, you can use renderProps.
     */
    render?: ComponentExampleRender<Props>;
};

export type ComponentExampleFn<Props = Record<string, unknown>> = (params: {
    setState: DemoSetState<Props>;
    action: DemoAction;
}) => ComponentExample<Props>;

export type Preset<Props> = {
    /** The name of the preset. This is used to display the preset in the UI. */
    label: string;
    /** The props of the component. This is used to set props of the component. These values can't be changed in the UI. */
    propState?: Partial<Props>;
    /** Determines if the preset is the default preset. This is used to set the initial propState of the component. */
    isDefault?: boolean;
};

export type DemoPreset<P = Record<string, unknown>> = Preset<P> & {
    value: string;
};

export function createUid(prefix: string = 'uid'): string {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
