import React from 'react';
import meta from 'src/meta/data.json';

export const componentsMeta = meta.componentsMeta as ComponentMeta[];
export const utilitiesMeta = meta.utilitiesMeta as UtilityMeta[];
export const typesMeta = meta.typesMeta as TypeMeta[];
export const MODE = meta.MODE as 'development' | 'production' | 'test';
export const UI_HASH = meta.UI_HASH as string;
export const VERSION = meta.VERSION as string;
export const BUILD = meta.BUILD as string;

/**
 * This file is used to build the meta types for the project. It's used in the build-meta.ts file and also copied in to
 * the meta output file.
 */

export const COMPONENT_PHASE_ORDER: ComponentPhase[] = [
    'Utility', // Utility components are not tracked in the progress
    'Backlog', // components that are not actively being worked on
    'Dev', // components that are actively being developed
    'UXReview', // components that are in UX Review
    'Stable', // production ready
];

export const COMPONENT_PHASES: Record<
    ComponentPhase,
    {
        title: string;
        id: ComponentPhase;
        description: string;
    }
> = {
    Backlog: {
        title: 'Backlog',
        id: 'Backlog',
        description:
            'The component has been initiated but is currently on hold. It awaits further development and is not actively being worked on at this time.',
    },
    Dev: {
        title: 'Development',
        id: 'Dev',
        description:
            'The component is actively under development. This phase includes the creation of visual elements and integration tests to ensure comprehensive functionality.',
    },
    UXReview: {
        title: 'UX Review',
        id: 'UXReview',
        description:
            'The component is being carefully evaluated by our Bespoke UX team. They are ensuring that it aligns with our high standards of aesthetics and user experience and is accessible to all users.',
    },
    Stable: {
        title: 'Stable',
        id: 'Stable',
        description:
            'The component has successfully passed all reviews and is ready for use. It is now officially released and ready for use in a production environment.',
    },
    Utility: {
        title: 'Utility',
        id: 'Utility',
        description: "The component progress isn't tracked as it's a utility component.",
    },
};

export type BaseMeta = {
    name: string;
    description?: string;
    file: string;
    example?: string;
};

export type TypeMeta = BaseMeta & {
    id: string;
    references?: string[];
    properties?: TypeProperty[];
    components?: string[];
};

export type TypeProperty = {
    name: string;
    description?: string;
    type?: string[] | string;
    exampleType?: string;
    default?: unknown;
    required?: boolean;
    options?: number[] | string[];
    variants?: string[];
    references?: string[];
    minimum?: number;
    maximum?: number;
    example?: string;
};

export type ComponentMeta = BaseMeta & {
    slug: string;
    dependencies: string[];
    css: string;
    hasTouchTarget: boolean;
    usage?: {
        code: string;
        description?: string;
    };
    phase: ComponentPhase;
    generated?: boolean;
};

export type UtilityMeta = BaseMeta & {
    param?: string;
    returns?: string;
};

export type ComponentPhase = 'Backlog' | 'Dev' | 'Stable' | 'Utility' | 'UXReview';

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */

export type MetaComponentName =
    | 'Accordion'
    | 'Avatar'
    | 'AvatarGroup'
    | 'Badge'
    | 'BadgeDot'
    | 'BannerAlert'
    | 'BottomNavigation'
    | 'Breadcrumb'
    | 'Button'
    | 'ButtonDock'
    | 'Calendar'
    | 'Card'
    | 'Carousel'
    | 'Checkbox'
    | 'CheckboxGroup'
    | 'CheckboxOption'
    | 'Chip'
    | 'ChipGroup'
    | 'DatePicker'
    | 'DatePickerField'
    | 'Dialog'
    | 'Divider'
    | 'Drawer'
    | 'EmptyState'
    | 'ExamplePlaceholder'
    | 'Fab'
    | 'Field'
    | 'FileUpload'
    | 'FileUploadItem'
    | 'FormField'
    | 'Img'
    | 'InlineAlert'
    | 'Input'
    | 'InputField'
    | 'InputNumber'
    | 'InputNumberField'
    | 'InputPhone'
    | 'InputPhoneField'
    | 'Layout'
    | 'Link'
    | 'ListItem'
    | 'Menu'
    | 'MenuButton'
    | 'Modal'
    | 'OTPInput'
    | 'PageControl'
    | 'Pagination'
    | 'Password'
    | 'PasswordField'
    | 'Popover'
    | 'Portal'
    | 'ProgressBar'
    | 'ProgressCircle'
    | 'ProgressionStepper'
    | 'ProgressionStepperBar'
    | 'Radio'
    | 'RadioGroup'
    | 'RadioOption'
    | 'Rating'
    | 'Scrim'
    | 'SearchBar'
    | 'SegmentedControl'
    | 'Select'
    | 'SelectField'
    | 'Skeleton'
    | 'SkeletonText'
    | 'Slider'
    | 'Snackbar'
    | 'StylesProviderAnywhere'
    | 'StylesProviderBetterHomesGardens'
    | 'StylesProviderCartus'
    | 'StylesProviderCentury21'
    | 'StylesProviderColdwellBanker'
    | 'StylesProviderCorcoran'
    | 'StylesProviderDemo'
    | 'StylesProviderDenaliBoss'
    | 'StylesProviderEra'
    | 'StylesProviderSothebys'
    | 'Switch'
    | 'SwitchOption'
    | 'TabGroup'
    | 'Table'
    | 'TabList'
    | 'Tag'
    | 'Textarea'
    | 'TextareaField'
    | 'TimePicker'
    | 'TimePickerField'
    | 'ToggleOption'
    | 'Tooltip'
    | 'TopNavigation'
    | 'Truncated'
    | 'Txt'
    | 'UIProvider';

export const components: Partial<Record<MetaComponentName, React.LazyExoticComponent<any>>> = {
    Accordion: React.lazy(() => import('@bspk/ui/Accordion').then((module) => ({ default: module.Accordion }))),
    Avatar: React.lazy(() => import('@bspk/ui/Avatar').then((module) => ({ default: module.Avatar }))),
    AvatarGroup: React.lazy(() => import('@bspk/ui/AvatarGroup').then((module) => ({ default: module.AvatarGroup }))),
    Badge: React.lazy(() => import('@bspk/ui/Badge').then((module) => ({ default: module.Badge }))),
    BadgeDot: React.lazy(() => import('@bspk/ui/BadgeDot').then((module) => ({ default: module.BadgeDot }))),
    BannerAlert: React.lazy(() => import('@bspk/ui/BannerAlert').then((module) => ({ default: module.BannerAlert }))),
    BottomNavigation: React.lazy(() =>
        import('@bspk/ui/BottomNavigation').then((module) => ({ default: module.BottomNavigation })),
    ),
    Breadcrumb: React.lazy(() => import('@bspk/ui/Breadcrumb').then((module) => ({ default: module.Breadcrumb }))),
    Button: React.lazy(() => import('@bspk/ui/Button').then((module) => ({ default: module.Button }))),
    ButtonDock: React.lazy(() => import('@bspk/ui/ButtonDock').then((module) => ({ default: module.ButtonDock }))),
    Calendar: React.lazy(() => import('@bspk/ui/Calendar').then((module) => ({ default: module.Calendar }))),
    Card: React.lazy(() => import('@bspk/ui/Card').then((module) => ({ default: module.Card }))),
    Carousel: React.lazy(() => import('@bspk/ui/Carousel').then((module) => ({ default: module.Carousel }))),
    Checkbox: React.lazy(() => import('@bspk/ui/Checkbox').then((module) => ({ default: module.Checkbox }))),
    CheckboxGroup: React.lazy(() =>
        import('@bspk/ui/CheckboxGroup').then((module) => ({ default: module.CheckboxGroup })),
    ),
    CheckboxOption: React.lazy(() =>
        import('@bspk/ui/CheckboxOption').then((module) => ({ default: module.CheckboxOption })),
    ),
    Chip: React.lazy(() => import('@bspk/ui/Chip').then((module) => ({ default: module.Chip }))),
    ChipGroup: React.lazy(() => import('@bspk/ui/ChipGroup').then((module) => ({ default: module.ChipGroup }))),
    DatePicker: React.lazy(() => import('@bspk/ui/DatePicker').then((module) => ({ default: module.DatePicker }))),
    DatePickerField: React.lazy(() =>
        import('@bspk/ui/DatePickerField').then((module) => ({ default: module.DatePickerField })),
    ),
    Dialog: React.lazy(() => import('@bspk/ui/Dialog').then((module) => ({ default: module.Dialog }))),
    Divider: React.lazy(() => import('@bspk/ui/Divider').then((module) => ({ default: module.Divider }))),
    Drawer: React.lazy(() => import('@bspk/ui/Drawer').then((module) => ({ default: module.Drawer }))),
    EmptyState: React.lazy(() => import('@bspk/ui/EmptyState').then((module) => ({ default: module.EmptyState }))),
    ExamplePlaceholder: React.lazy(() =>
        import('@bspk/ui/ExamplePlaceholder').then((module) => ({ default: module.ExamplePlaceholder })),
    ),
    Fab: React.lazy(() => import('@bspk/ui/Fab').then((module) => ({ default: module.Fab }))),
    Field: React.lazy(() => import('@bspk/ui/Field').then((module) => ({ default: module.Field }))),
    FileUpload: React.lazy(() => import('@bspk/ui/FileUpload').then((module) => ({ default: module.FileUpload }))),
    FileUploadItem: React.lazy(() =>
        import('@bspk/ui/FileUploadItem').then((module) => ({ default: module.FileUploadItem })),
    ),
    FormField: React.lazy(() => import('@bspk/ui/FormField').then((module) => ({ default: module.FormField }))),
    Img: React.lazy(() => import('@bspk/ui/Img').then((module) => ({ default: module.Img }))),
    InlineAlert: React.lazy(() => import('@bspk/ui/InlineAlert').then((module) => ({ default: module.InlineAlert }))),
    Input: React.lazy(() => import('@bspk/ui/Input').then((module) => ({ default: module.Input }))),
    InputField: React.lazy(() => import('@bspk/ui/InputField').then((module) => ({ default: module.InputField }))),
    InputNumber: React.lazy(() => import('@bspk/ui/InputNumber').then((module) => ({ default: module.InputNumber }))),
    InputNumberField: React.lazy(() =>
        import('@bspk/ui/InputNumberField').then((module) => ({ default: module.InputNumberField })),
    ),
    InputPhone: React.lazy(() => import('@bspk/ui/InputPhone').then((module) => ({ default: module.InputPhone }))),
    InputPhoneField: React.lazy(() =>
        import('@bspk/ui/InputPhoneField').then((module) => ({ default: module.InputPhoneField })),
    ),
    Layout: React.lazy(() => import('@bspk/ui/Layout').then((module) => ({ default: module.Layout }))),
    Link: React.lazy(() => import('@bspk/ui/Link').then((module) => ({ default: module.Link }))),
    ListItem: React.lazy(() => import('@bspk/ui/ListItem').then((module) => ({ default: module.ListItem }))),
    Menu: React.lazy(() => import('@bspk/ui/Menu').then((module) => ({ default: module.Menu }))),
    MenuButton: React.lazy(() => import('@bspk/ui/MenuButton').then((module) => ({ default: module.MenuButton }))),
    Modal: React.lazy(() => import('@bspk/ui/Modal').then((module) => ({ default: module.Modal }))),
    OTPInput: React.lazy(() => import('@bspk/ui/OTPInput').then((module) => ({ default: module.OTPInput }))),
    PageControl: React.lazy(() => import('@bspk/ui/PageControl').then((module) => ({ default: module.PageControl }))),
    Pagination: React.lazy(() => import('@bspk/ui/Pagination').then((module) => ({ default: module.Pagination }))),
    Password: React.lazy(() => import('@bspk/ui/Password').then((module) => ({ default: module.Password }))),
    PasswordField: React.lazy(() =>
        import('@bspk/ui/PasswordField').then((module) => ({ default: module.PasswordField })),
    ),
    Popover: React.lazy(() => import('@bspk/ui/Popover').then((module) => ({ default: module.Popover }))),
    Portal: React.lazy(() => import('@bspk/ui/Portal').then((module) => ({ default: module.Portal }))),
    ProgressBar: React.lazy(() => import('@bspk/ui/ProgressBar').then((module) => ({ default: module.ProgressBar }))),
    ProgressCircle: React.lazy(() =>
        import('@bspk/ui/ProgressCircle').then((module) => ({ default: module.ProgressCircle })),
    ),
    ProgressionStepper: React.lazy(() =>
        import('@bspk/ui/ProgressionStepper').then((module) => ({ default: module.ProgressionStepper })),
    ),
    ProgressionStepperBar: React.lazy(() =>
        import('@bspk/ui/ProgressionStepperBar').then((module) => ({ default: module.ProgressionStepperBar })),
    ),
    Radio: React.lazy(() => import('@bspk/ui/Radio').then((module) => ({ default: module.Radio }))),
    RadioGroup: React.lazy(() => import('@bspk/ui/RadioGroup').then((module) => ({ default: module.RadioGroup }))),
    RadioOption: React.lazy(() => import('@bspk/ui/RadioOption').then((module) => ({ default: module.RadioOption }))),
    Rating: React.lazy(() => import('@bspk/ui/Rating').then((module) => ({ default: module.Rating }))),
    Scrim: React.lazy(() => import('@bspk/ui/Scrim').then((module) => ({ default: module.Scrim }))),
    SearchBar: React.lazy(() => import('@bspk/ui/SearchBar').then((module) => ({ default: module.SearchBar }))),
    SegmentedControl: React.lazy(() =>
        import('@bspk/ui/SegmentedControl').then((module) => ({ default: module.SegmentedControl })),
    ),
    Select: React.lazy(() => import('@bspk/ui/Select').then((module) => ({ default: module.Select }))),
    SelectField: React.lazy(() => import('@bspk/ui/SelectField').then((module) => ({ default: module.SelectField }))),
    Skeleton: React.lazy(() => import('@bspk/ui/Skeleton').then((module) => ({ default: module.Skeleton }))),
    SkeletonText: React.lazy(() =>
        import('@bspk/ui/SkeletonText').then((module) => ({ default: module.SkeletonText })),
    ),
    Slider: React.lazy(() => import('@bspk/ui/Slider').then((module) => ({ default: module.Slider }))),
    Snackbar: React.lazy(() => import('@bspk/ui/Snackbar').then((module) => ({ default: module.Snackbar }))),
    StylesProviderAnywhere: React.lazy(() =>
        import('@bspk/ui/StylesProviderAnywhere').then((module) => ({ default: module.StylesProviderAnywhere })),
    ),
    StylesProviderBetterHomesGardens: React.lazy(() =>
        import('@bspk/ui/StylesProviderBetterHomesGardens').then((module) => ({
            default: module.StylesProviderBetterHomesGardens,
        })),
    ),
    StylesProviderCartus: React.lazy(() =>
        import('@bspk/ui/StylesProviderCartus').then((module) => ({ default: module.StylesProviderCartus })),
    ),
    StylesProviderCentury21: React.lazy(() =>
        import('@bspk/ui/StylesProviderCentury21').then((module) => ({ default: module.StylesProviderCentury21 })),
    ),
    StylesProviderColdwellBanker: React.lazy(() =>
        import('@bspk/ui/StylesProviderColdwellBanker').then((module) => ({
            default: module.StylesProviderColdwellBanker,
        })),
    ),
    StylesProviderCorcoran: React.lazy(() =>
        import('@bspk/ui/StylesProviderCorcoran').then((module) => ({ default: module.StylesProviderCorcoran })),
    ),
    StylesProviderDemo: React.lazy(() =>
        import('@bspk/ui/StylesProviderDemo').then((module) => ({ default: module.StylesProviderDemo })),
    ),
    StylesProviderDenaliBoss: React.lazy(() =>
        import('@bspk/ui/StylesProviderDenaliBoss').then((module) => ({ default: module.StylesProviderDenaliBoss })),
    ),
    StylesProviderEra: React.lazy(() =>
        import('@bspk/ui/StylesProviderEra').then((module) => ({ default: module.StylesProviderEra })),
    ),
    StylesProviderSothebys: React.lazy(() =>
        import('@bspk/ui/StylesProviderSothebys').then((module) => ({ default: module.StylesProviderSothebys })),
    ),
    Switch: React.lazy(() => import('@bspk/ui/Switch').then((module) => ({ default: module.Switch }))),
    SwitchOption: React.lazy(() =>
        import('@bspk/ui/SwitchOption').then((module) => ({ default: module.SwitchOption })),
    ),
    TabGroup: React.lazy(() => import('@bspk/ui/TabGroup').then((module) => ({ default: module.TabGroup }))),
    Table: React.lazy(() => import('@bspk/ui/Table').then((module) => ({ default: module.Table }))),
    TabList: React.lazy(() => import('@bspk/ui/TabList').then((module) => ({ default: module.TabList }))),
    Tag: React.lazy(() => import('@bspk/ui/Tag').then((module) => ({ default: module.Tag }))),
    Textarea: React.lazy(() => import('@bspk/ui/Textarea').then((module) => ({ default: module.Textarea }))),
    TextareaField: React.lazy(() =>
        import('@bspk/ui/TextareaField').then((module) => ({ default: module.TextareaField })),
    ),
    TimePicker: React.lazy(() => import('@bspk/ui/TimePicker').then((module) => ({ default: module.TimePicker }))),
    TimePickerField: React.lazy(() =>
        import('@bspk/ui/TimePickerField').then((module) => ({ default: module.TimePickerField })),
    ),
    ToggleOption: React.lazy(() =>
        import('@bspk/ui/ToggleOption').then((module) => ({ default: module.ToggleOption })),
    ),
    Tooltip: React.lazy(() => import('@bspk/ui/Tooltip').then((module) => ({ default: module.Tooltip }))),
    TopNavigation: React.lazy(() =>
        import('@bspk/ui/TopNavigation').then((module) => ({ default: module.TopNavigation })),
    ),
    Truncated: React.lazy(() => import('@bspk/ui/Truncated').then((module) => ({ default: module.Truncated }))),
    Txt: React.lazy(() => import('@bspk/ui/Txt').then((module) => ({ default: module.Txt }))),
    UIProvider: React.lazy(() => import('@bspk/ui/UIProvider').then((module) => ({ default: module.UIProvider }))),
};
