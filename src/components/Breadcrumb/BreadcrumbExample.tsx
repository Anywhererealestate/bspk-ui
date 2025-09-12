import { BreadcrumbProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const presets = [
    {
        label: '1 Item (nothing visible)',
        propState: {
            items: [
                {
                    label: 'Item 1',
                    href: '#link-1',
                },
            ],
        },
    },
    {
        label: '2 Items (minimum)',
        propState: {
            items: [
                {
                    label: 'Item 1',
                    href: '#link-1',
                },
                {
                    label: 'Item 2',
                    href: '#link-2',
                },
            ],
        },
    },
    {
        label: '5 Items',
        propState: {
            items: [
                {
                    label: 'Item 1',
                    href: '#link-1',
                },
                {
                    label: 'Item 2',
                    href: '#link-2',
                },
                {
                    label: 'Item 3',
                    href: '#link-3',
                },
                {
                    label: 'Item 4',
                    href: '#link-4',
                },
                {
                    label: 'Item 5',
                    href: '#link-5',
                },
            ],
        },
    },
    {
        label: '6 Items',
        propState: {
            items: [
                {
                    label: 'Item 1',
                    href: '#link-1',
                },
                {
                    label: 'Item 2',
                    href: '#link-2',
                },
                {
                    label: 'Item 3',
                    href: '#link-3',
                },
                {
                    label: 'Item 4',
                    href: '#link-4',
                },
                {
                    label: 'Item 5',
                    href: '#link-5',
                },
                {
                    label: 'Item 6',
                    href: '#link-6',
                },
            ],
        },
    },
    {
        label: 'NOT recommended',
        propState: {
            items: [
                {
                    label: 'Item 1',
                    href: '#link-1',
                },
                {
                    label: 'Item 2',
                    href: '#link-2',
                },
                {
                    label: 'Item 3',
                    href: '#link-3',
                },
                {
                    label: 'Item 4',
                    href: '#link-4',
                },
                {
                    label: 'Item 5',
                    href: '#link-5',
                },
                {
                    label: 'Item 6',
                    href: '#link-6',
                },
                {
                    label: 'Item 7',
                    href: '#link-7',
                },
                {
                    label: 'Item 8',
                    href: '#link-8',
                },
                {
                    label: 'Item 9',
                    href: '#link-9',
                },
                {
                    label: 'Item 10',
                    href: '#link-10',
                },
                {
                    label: 'Item 11',
                    href: '#link-11',
                },
                {
                    label: 'Item 12',
                    href: '#link-12',
                },
                {
                    label: 'Item 13',
                    href: '#link-13',
                },
                {
                    label: 'Item 14',
                    href: '#link-14',
                },
                {
                    label: 'Item 15',
                    href: '#link-15',
                },
            ],
        },
    },
];

export const BreadcrumbExample: ComponentExample<BreadcrumbProps> = {
    presets,
};
