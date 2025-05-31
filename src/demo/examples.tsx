import { SvgCircle } from '@bspk/icons/Circle';
import { SvgContentCopy } from '@bspk/icons/ContentCopy';
import { SvgDiamond } from '@bspk/icons/Diamond';
import { SvgDiamondFill } from '@bspk/icons/DiamondFill';
import { SvgSquare } from '@bspk/icons/Square';
import { SvgSquareFill } from '@bspk/icons/SquareFill';
import { CSSProperties } from 'react';

import { Avatar, AvatarProps } from '../Avatar';
import { BannerAlertProps } from '../BannerAlert';
import { Button, ButtonProps } from '../Button';
import { Checkbox } from '../Checkbox';
import { DropdownOption, DropdownProps } from '../Dropdown';
import { EmptyStateProps } from '../EmptyState';
import { Img } from '../Img';
import { LEADING_COMPONENTS, TRAILING_COMPONENTS, ListItem } from '../ListItem';
import { MenuItem } from '../Menu';
import { ModalProps } from '../Modal';
import { Popover, PopoverProps } from '../Popover';
import { ProgressionStepperProps } from '../ProgressionStepper';
import { Radio } from '../Radio';
import { SegmentedControlProps } from '../SegmentedControl';
import { Switch } from '../Switch';
import { TabGroupProps } from '../TabGroup';
import { Tag } from '../Tag';
import { TextInputProps } from '../TextInput';
import { Txt } from '../Txt';
import { ColorVariant } from '../utils/colorVariants';

import { ExampleModalRender } from './ExampleModalRender';
import { ExamplePlaceholder } from './ExamplePlaceholder';

/* eslint-disable @typescript-eslint/no-explicit-any */

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

export type DemoSetState = (next: Record<string, unknown>) => void;

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

export type ComponentExample<Props = Record<string, unknown>> = {
    /**
     * The style of the wrapping component.
     *
     * //
     */
    containerStyle?: React.CSSProperties | ((state: Record<string, unknown>) => React.CSSProperties);
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
        state: Record<string, unknown>,
        context?: {
            [key: string]: unknown;
            preset?: DemoPreset;
        },
    ) => Record<string, unknown>;
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
    render?: (params: {
        props: Props;
        preset?: DemoPreset;
        Component: React.ComponentType<Record<string, unknown>>;
    }) => React.ReactNode;
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

export type Preset<P> = {
    /** The name of the preset. This is used to display the preset in the UI. */
    label: string;
    /** The props of the component. This is used to set props of the component. These values can't be changed in the UI. */
    state?: Partial<P>;
    /** Determines if the preset is the default preset. This is used to set the initial state of the component. */
    isDefault?: boolean;
};

export type DemoPreset<P = Record<string, unknown>> = Preset<P> & { value: string };

export function createUid(prefix: string = 'uid'): string {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

export const asProps = <P extends Record<string, unknown>>(p: Partial<P>): Partial<P> => p;

export const setPresets = <P extends Record<string, unknown>>(p: Preset<P>[] | (() => Preset<P>[])) =>
    typeof p === 'function' ? p() : p;

const buttonExamplePresets = setPresets<ButtonProps>([
    {
        label: 'Icon & Text',
        state: {
            icon: 'Add',
            label: 'Add',
        },
    },
    {
        label: 'Text only',
        state: {
            label: 'Add',
        },
    },
    {
        label: 'Icon only',
        state: {
            showLabel: false,
            icon: 'Add',
            label: 'Add',
        },
    },
]);

export const examples: (setState: DemoSetState, action: DemoAction) => Record<string, ComponentExample> = (
    setState,
    action,
) => ({
    Avatar: {
        presets: setPresets<AvatarProps>([
            {
                label: 'Name Only',
                state: {
                    name: 'Andre Giant',
                    image: undefined, // Ensure no image is set
                    initials: undefined, // Ensure no initials are set
                    icon: undefined, // Ensure no icon is set
                },
            },
            {
                label: 'With Initials',
                state: {
                    name: 'Andre Giant',
                    initials: 'GA',
                    image: undefined, // Ensure no image is set
                },
            },
            {
                label: 'With Icon',
                state: {
                    name: 'Andre Giant',
                    icon: 'Person',
                    image: undefined, // Ensure no image is set
                },
            },
            {
                label: 'With Image',
                state: {
                    name: 'Andre Giant',
                    image: '/profile.jpg',
                },
            },
        ]),
    },
    Button: {
        presets: buttonExamplePresets,
    },
    BannerAlert: {
        containerStyle: { width: '100%' },
        propRenderOverrides: (state, context) => {
            let nextHeader = state.header || 'This is a banner alert';
            if (context?.variantName === 'variant') {
                if (context?.variantValue === 'informational') nextHeader = 'This is informational banner';
                if (context?.variantValue === 'success') nextHeader = 'This is success banner';
                if (context?.variantValue === 'warning') nextHeader = 'This is warning banner';
                if (context?.variantValue === 'error') nextHeader = 'This is error banner';
            }
            return { ...state, header: nextHeader };
        },
        presets: setPresets<BannerAlertProps>([
            {
                label: 'With CallToAction',
                state: {
                    callToAction: {
                        label: 'Click me',
                        onClick: () => action('Call to action clicked!'),
                    },
                },
            },
            {
                label: 'Without OnClose',
                state: {
                    onClose: undefined,
                },
            },
        ]),
    },
    Card: {
        propRenderOverrides: (state) => ({
            ...state,
            children: (
                <ExamplePlaceholder
                    style={{
                        height: '200px',
                        width: '100%',
                        minWidth: '250px',
                    }}
                />
            ),
        }),
    },
    Divider: {
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
    },
    Dropdown: {
        presets: setPresets<DropdownProps>(() => {
            return [
                {
                    label: 'Simple',
                    state: {},
                },
                {
                    label: 'Multi',
                    state: { isMulti: true },
                },
                {
                    label: 'Trailing Tags',
                    state: asProps<DropdownProps<DropdownOption & { tag?: string; tagColor?: ColorVariant }>>({
                        options: [
                            //
                            { value: 'a', label: 'Package A', tag: 'Recommended', tagColor: 'blue' },
                            { value: 'b', label: 'Package B', tag: 'Best Value', tagColor: 'green' },
                            { value: 'c', label: 'Package C' },
                            { value: 'd', label: 'Package D' },
                        ],
                        renderListItem: (props) => {
                            return {
                                trailing:
                                    props.item.tag && props.item.tagColor ? (
                                        <Tag color={props.item.tagColor!} size="x-small">
                                            {props.item.tag}
                                        </Tag>
                                    ) : null,
                            };
                        },
                    }),
                },
                {
                    label: 'Trailing Text',
                    state: asProps<DropdownProps<DropdownOption & { price: number }>>({
                        options: [
                            //
                            { value: '1', label: 'Option A', price: 400 },
                            { value: '2', label: 'Option B', price: 1000 },
                            { value: '3', label: 'Option C', price: 1600 },
                            { value: '4', label: 'Option D', price: 2000 },
                        ],
                        renderListItem: (props) => {
                            return {
                                trailing: (
                                    <Txt>{`${new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }).format(props.item.price / 100)}`}</Txt>
                                ),
                            };
                        },
                    }),
                },
                {
                    label: 'Leading Avatar',
                    state: asProps<
                        DropdownProps<
                            MenuItem & {
                                profile: AvatarProps;
                            }
                        >
                    >({
                        options: [
                            //
                            {
                                value: 'Jessica',
                                label: 'Jessica P.',
                                profile: { name: 'Jessica P.' },
                            },
                            { value: 'Louis', label: 'Louis L.', profile: { name: 'Louis L.' } },
                            { value: 'Harvey', label: 'Harvey S.', profile: { name: 'Harvey S.' } },
                            { value: 'Mike', label: 'Mike R.', profile: { name: 'Mike R.' } },
                        ],
                        renderListItem: (props) => {
                            return {
                                leading: <Avatar size="small" {...props.item.profile} />,
                            };
                        },
                    }),
                },
            ];
        }),
    },
    EmptyState: {
        containerStyle: { width: '100%' },
        propRenderOverrides: (state, context) => {
            return {
                ...state,
                children:
                    context?.preset?.label === 'With Children' ? (
                        <ExamplePlaceholder
                            style={{
                                height: '200px',
                                width: '60%',
                                minWidth: '250px',
                            }}
                        />
                    ) : null,
            };
        },
        presets: setPresets<EmptyStateProps>([
            {
                label: 'With CallToAction',
                state: {
                    header: 'No payment methods added',
                    body: 'Add a card to your account for faster checkout.',
                    callToAction: {
                        label: 'Add payment method',
                        onClick: () => action('Add payment method clicked!'),
                    },
                },
            },
            {
                label: 'With Children',
                state: {
                    header: 'No payment methods added',
                    body: 'Add a card to your account for faster checkout.',
                    callToAction: {
                        label: 'Add payment method',
                        onClick: () => action('Add payment method clicked!'),
                    },
                },
            },
        ]),
    },
    Fab: {
        containerStyle: { width: '100%' },
        presets: buttonExamplePresets,
    },
    ListItem: {
        containerStyle: { width: '50%' },
        propRenderOverrides: (state) => {
            return {
                ...state,
                leading: createChildrenElement(state, 'leading', setState, action),
                trailing: createChildrenElement(state, 'trailing', setState, action),
            };
        },
        propControlsOverrides: {
            leading: {
                options: [...LEADING_COMPONENTS],
                type: 'select',
            },
            trailing: {
                options: [...TRAILING_COMPONENTS],
                type: 'select',
            },
        },
    },
    Modal: {
        hideVariants: true,
        render: ({ props, preset }) => (
            <ExampleModalRender preset={preset} props={props as ModalProps} setState={setState} />
        ),
    },
    Popover: {
        render: ({ props }) => {
            return (
                <>
                    <Popover {...(props as PopoverProps)}>
                        <Button label={`Click me (${props.placement})`} variant="secondary" />
                    </Popover>
                </>
            );
        },
        presets: setPresets<PopoverProps>([
            {
                label: 'With CallToAction',
                state: { callToAction: { label: 'Click me', onClick: () => action('Call to action clicked!') } },
            },
        ]),
    },
    Link: {
        render: ({ props, Component }) => {
            return (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        background: props.variant === 'subtle-inverse' ? 'black' : '',
                        minHeight: 'var(--spacing-sizing-24)',
                    }}
                >
                    <Component {...props} />
                </div>
            );
        },
    },
    ProgressionStepper: {
        presets: setPresets<ProgressionStepperProps>([
            {
                label: 'Horizontal',
                state: {
                    variant: 'horizontal',
                    currentStep: 2,
                    steps: [{ name: 'Name of step 1' }, { name: 'Name of step 2' }, { name: 'Name of step 3' }],
                },
            },
            {
                label: 'Vertical',
                state: {
                    variant: 'vertical',
                    currentStep: 2,
                    steps: [
                        {
                            name: 'Name of step 1',
                            subtext: `Subtext of step 1`,
                        },
                        {
                            name: 'Name of step 2',
                            subtext: `Subtext of step 2`,
                        },
                        {
                            name: 'Name of step 3',
                            subtext: `Subtext of step 3`,
                        },
                    ],
                },
            },
            {
                label: 'Widget',
                state: {
                    variant: 'widget',
                    currentStep: 2,
                    steps: [
                        { name: 'Name of step 1' },
                        { name: 'Name of step 2' },
                        { name: 'Name of step 3' },
                        { name: 'Name of step 4' },
                        { name: 'Name of step 5' },
                        { name: 'Name of step 6' },
                        { name: 'Name of step 7' },
                    ],
                },
            },
        ]),
    },
    Radio: {
        render: ({ props, Component }) => <Component {...props} name={createUid('radio')} />,
    },
    RadioGroup: {
        render: ({ props, Component }) => <Component {...props} name={createUid('radio')} />,
    },
    RadioOption: {
        render: ({ props, Component }) => <Component {...props} name={createUid('radio')} />,
    },
    SegmentedControl: {
        containerStyle: { width: '100%' },
        presets: setPresets<SegmentedControlProps>([
            {
                label: 'With icons',
                state: {
                    options: [
                        { value: '1', label: 'Option 1', icon: <SvgDiamond />, iconActive: <SvgDiamondFill /> },
                        { value: '2', label: 'Disabled 2', disabled: true, icon: <SvgCircle /> },
                        { value: '3', label: 'Option 3', icon: <SvgSquare />, iconActive: <SvgSquareFill /> },
                    ],
                },
            },
        ]),
    },
    TextInput: {
        containerStyle: { width: '280px' },
        presets: setPresets<TextInputProps>([
            {
                label: 'Currency',
                state: {
                    type: 'number',
                    leading: '$',
                    trailing: undefined,
                    placeholder: 'currency',
                },
            },
            {
                label: 'Percent',
                state: {
                    type: 'number',
                    leading: undefined,
                    trailing: '%',
                    placeholder: 'percent',
                },
            },
            {
                label: 'Dimension',
                state: {
                    type: 'number',
                    leading: undefined,
                    placeholder: 'dimensions',
                    trailing: 'ft',
                },
            },
        ]),
    },
    TabGroup: {
        containerStyle: { width: '100%' },
        presets: setPresets<TabGroupProps>([
            {
                label: 'With icons',
                state: {
                    options: [
                        { value: '1', label: 'Option 1', icon: <SvgDiamond />, iconActive: <SvgDiamondFill /> },
                        { value: '2', label: 'Disabled 2', disabled: true, icon: <SvgCircle /> },
                        { value: '3', label: 'Option 3', icon: <SvgSquare />, iconActive: <SvgSquareFill /> },
                    ],
                },
            },
            {
                label: 'With badges',
                state: {
                    options: [
                        {
                            value: '1',
                            label: 'Option 1',
                            icon: <SvgDiamond />,
                            iconActive: <SvgDiamondFill />,
                            badge: 1,
                        },
                        { value: '2', label: 'Disabled 2', disabled: true, icon: <SvgCircle />, badge: 2 },
                        { value: '3', label: 'Option 3', icon: <SvgSquare />, iconActive: <SvgSquare />, badge: 3 },
                    ],
                },
            },
        ]),
    },
    Tooltip: {
        render: ({ props: state, Component }) => {
            return (
                <>
                    <Component label="Tooltip text" {...state} placement={[state.placement].flat()[0] || 'top'}>
                        <Button
                            label={`Hover over me ${'data-variant-value' in state ? `(${state['data-variant-value']})` : ''}`}
                            variant="secondary"
                        />
                    </Component>
                </>
            );
        },
    },
});

export const createChildrenElement = (
    state: Record<string, any>,
    name: string,
    setState: DemoSetState,
    action: DemoAction,
) => {
    const componentName = state[name];

    if (componentName === 'Checkbox' || componentName === 'Radio' || componentName === 'Switch') {
        let As: typeof Checkbox | typeof Radio | typeof Switch = Checkbox;
        if (componentName === 'Radio') As = Radio;
        else if (componentName === 'Switch') As = Switch;

        return (
            <As
                aria-label={`${componentName} demo`}
                checked={state[`${name}-toggle`]}
                name={`${name}-toggle`}
                onChange={(checked: boolean) => {
                    setState({ [`${name}-toggle`]: checked });
                }}
                onClick={() => action(`${name} ${componentName} clicked`)}
                value={`${name}-${componentName}`}
            />
        );
    }

    if (componentName === 'ListItemButton')
        return (
            <ListItem.Button
                icon={<SvgContentCopy />}
                label="LI Button"
                onClick={() => action('ListItem button clicked')}
            />
        );

    if (componentName === 'Img') return <Img alt="placeholder" src="/placeholder.svg" />;

    if (componentName === 'Avatar') return <Avatar name="List Item" showTooltip={false} />;

    if (componentName === 'Tag') {
        return <Tag>Tag</Tag>;
    }

    if (componentName === 'Txt') return <Txt>Text</Txt>;

    if (componentName === 'Icon') return <SvgDiamond />;

    return null;
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
