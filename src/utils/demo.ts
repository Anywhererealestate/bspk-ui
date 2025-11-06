/* eslint-disable @typescript-eslint/no-explicit-any */

import { CSSProperties, ReactNode } from 'react';
import { AlertVariant, DataProps } from '-/types/common';
import { ComponentMeta } from '-/types/meta';

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

export type TypePropertyDemo = Omit<TypeProperty, 'example'> & {
    libraryDefault?: TypeProperty['default'];
    label?: string;
    example?: any;
    disabled?: boolean;
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
    variant?: {
        name: string;
        value: unknown;
    };
    id: string;
};

export type ComponentExampleRender<Props = Record<string, unknown>> = (
    params: ComponentExampleRenderProps<Props>,
) => React.ReactNode;

export type ComponentVariantOverride<Props> = {
    [K in keyof Props]?: Props[K] | { options: Props[K][] };
};

export type ComponentPageSection<Props = Record<string, unknown>> = {
    title: string;
    content: (params: {
        Component?: React.ComponentType<Props>;
        props: Props;
        CodeExample: CodeExample;
        Syntax: Syntax;
    }) => React.ReactNode;
    location?: 'afterDemo' | 'beforeDemo';
};

export type ComponentVariantOverrides<Props = Record<string, unknown>, PropName extends keyof Props = keyof Props> = {
    /**
     * Hide the variant entirely by setting to false.
     *
     * Set specific prop overrides for the variant. e.g. when demoing iconOnly, we want to set the icon prop.
     */
    [Key in PropName]?: ComponentVariantOverride<Props> | false;
};

export type ComponentExample<Props = Record<string, unknown>, PropName extends keyof Props = keyof Props> = {
    /**
     * The style of the wrapping component.
     *
     * @example
     *     { width: '100%' },
     */
    containerStyle?: React.CSSProperties | ((propState: Props) => React.CSSProperties);
    /**
     * False to hide all or a record of variants to hide or modify props.
     *
     * Helpful for hiding or setting static default props for specific variants
     */
    variants?: ComponentVariantOverrides<Props> | boolean;
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
    /**
     * We may not want certain props editable in the props table.
     *
     * Setting this to true will disable all props.
     *
     * Or you can pass an array of prop names to disable specific props.
     */
    disableProps?: PropName[] | true;
    /** The sections of the example. */
    sections?: ComponentPageSection<Props>[];
    /** The scope to pass to the renderer for live editing. */
    scope?: Record<string, unknown>;
};

export type Syntax = (params: {
    code: string;
    language?: PrettyParser;
    style?: CSSProperties;
    pretty?: boolean;
}) => React.ReactNode;

export type CodeExample = (
    params: DataProps & {
        containerStyle?: CSSProperties;
        children: ReactNode;
        accessibility?: boolean;
        code?: {
            language?: PrettyParser | undefined;
            str: string;
        };
    },
) => React.ReactNode;

export type PrettyParser = 'css' | 'estree' | 'html' | 'scss' | 'typescript';

export type ComponentExampleFn<Props = Record<string, unknown>> = (params: {
    setState: DemoSetState<Props>;
    action: DemoAction;
    componentsMeta: ComponentMeta[];
}) => ComponentExample<Props>;

export type OnHandlers = `on${string}`;

export type Preset<Props> = {
    /**
     * A description of the design pattern this preset demonstrates. When applied, it showcases the specific use case or
     * behavior of the component.
     */
    designPattern?: string;
    /** The name of the preset. This is used to display the preset in the UI. */
    label: string;
    /** The props of the component. This is used to set props of the component. These values can't be changed in the UI. */
    propState: Omit<Props, OnHandlers> & Record<OnHandlers, unknown>;
    otherState?: Record<string, Record<string, unknown> | unknown> & Record<string, unknown>;
};

export type DemoPreset<P = Record<string, unknown>> = Preset<P> & {
    value: string;
};

export function createUid(prefix: string = 'uid'): string {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
