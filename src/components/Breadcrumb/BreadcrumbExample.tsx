import { BreadcrumbProps } from '-/components/Breadcrumb';
import { ComponentExample } from '-/utils/demo';

export const BreadcrumbExample: ComponentExample<BreadcrumbProps> = {
    presets: [
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
    ],
};
