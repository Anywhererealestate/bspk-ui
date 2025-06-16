/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';

import { ElementProps } from '..';
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
    properties?: TypeProperty[];
    references?: string[];
    minimum?: number;
    maximum?: number;
    example?: string;
};

export type DemoAction = (...str: unknown[]) => void;

export type DemoSetState<Props = Record<string, unknown>> = (next: Partial<Props>) => void;

export type DevPhase =
    | 'AccessibilityReview'
    | 'Backlog'
    | 'DesignReview'
    | 'ProductionReady'
    | 'Utility'
    | 'WorkInProgress';

export type TypePropertyDemo = Omit<TypeProperty, 'example'> & {
    properties?: TypePropertyDemo[];
    libraryDefault?: TypeProperty['default'];
    label?: string;
    example?: any;
};

export type TypePropertyDemoWithControls = Pick<TypeProperty, 'type'> &
    TypePropertyDemo & {
        haveControl: boolean;
        typeOptions: number[] | string[] | undefined;
        properties?: TypePropertyDemoWithControls[];
        multiline?: boolean;
    };

export type ComponentExampleRenderProps<Props = Record<string, unknown>> = {
    props: Props;
    preset?: DemoPreset;
    setState: DemoSetState<Props>;
    Component: React.ComponentType<Props>;
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
    containerStyle?: React.CSSProperties | ((state: Props) => React.CSSProperties);
    /**
     * Takes the current state and returns the props to be passed to the component.
     *
     * This is useful for dynamically generating props based on the state and context of the component.
     *
     * @param state The current state of the component.
     * @param context The context of the component, which can include the current preset.
     * @returns The props to be passed directly into the component.
     */
    propRenderOverrides?: (
        state: Props,
        context?: {
            [key: string]: unknown;
            preset?: DemoPreset;
        },
    ) => Props;
    /**
     * True to hide all or a list of variants to hide.
     *
     * Helpful for hiding variants that can have unexpected collisions with the other examples.
     */
    hideVariants?: string[] | true;
    /**
     * This is used to set the initial state of the component.
     *
     * Specifically to highlight certain features of the component.
     */
    presets?: Preset<Props>[];
    /**
     * The component to render in the example.
     *
     * By default, this will be the component that is being documented.
     *
     * If you only need to update the props of the component, you can use renderProps.
     */
    render?: ComponentExampleRender<Props>;
    /**
     * Useful for overriding the default props controls in the demo.
     *
     * If you change the type of a prop, you will probably need to specificy how to render them in renderProps.
     *
     * See the ListItem example for an of how to use this.
     */
    propControlsOverrides?: {
        [key: string]: Partial<TypePropertyDemo>;
    };
};

export type ComponentExampleFn<Props = Record<string, unknown>> = (params: {
    setState: DemoSetState<Props>;
    action: DemoAction;
}) => ComponentExample<Props>;

export type Preset<P> = {
    /** The name of the preset. This is used to display the preset in the UI. */
    label: string;
    /** The props of the component. This is used to set props of the component. These values can't be changed in the UI. */
    state?: Partial<P>;
    /** Determines if the preset is the default preset. This is used to set the initial state of the component. */
    isDefault?: boolean;
};

export type DemoPreset<P = Record<string, unknown>> = Preset<P> & {
    value: string;
};

export function createUid(prefix: string = 'uid'): string {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
