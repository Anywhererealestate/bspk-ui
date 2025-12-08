import { PageHeaderProps } from '.';
import { ExamplePlaceholder } from '-/components/ExamplePlaceholder';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<PageHeaderProps>[] = [
    {
        label: 'Title Only',
        propState: {
            title: 'Page Title',
        },
        designPattern: true,
    },
    {
        label: 'With Actions',
        propState: {
            title: 'Page Title',
            actions: <ExamplePlaceholder height={32} label="Page actions slot" width={372} />,
        },
        designPattern: true,
    },
    {
        label: 'With Breadcrumb',
        propState: {
            title: 'Page Title',
            breadcrumb: {
                items: [
                    { label: 'Home', href: '#/home' },
                    { label: 'Section', href: '#/section' },
                    { label: 'Page Title', href: '#/page' },
                ],
            },
            actions: <ExamplePlaceholder height={32} label="Page actions slot" width={372} />,
        },
        designPattern: true,
    },
    {
        label: 'Profile',
        propState: {
            title: 'Charlie Brown',
            avatar: { image: '/avatar-01.png', name: 'CB' },
            actions: <ExamplePlaceholder height={32} label="Page actions slot" width={372} />,
        },
        designPattern: true,
    },
];

export const PageHeaderExample: ComponentExample<PageHeaderProps> = {
    defaultState: {
        title: 'Page Title',
        actions: <ExamplePlaceholder height={32} label="Page actions slot" width={372} />,
    },
    disableProps: [],
    presets,
    render: ({ props, Component }) => <Component {...props} />,
    variants: false,
    fullPage: true,
    hideDemo: true,
};
