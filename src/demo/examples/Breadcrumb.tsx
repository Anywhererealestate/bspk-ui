import { BreadcrumbProps } from '../../Breadcrumb';
import { ComponentExample } from '../utils';

export const BreadcrumbExample: ComponentExample<BreadcrumbProps> = {
    presets: [
        {
            label: '1 Item (nothing visible)',
            state: {
                items: [
                    {
                        label: 'item 1',
                        href: '#link-1',
                    },
                ],
            },
        },
        {
            label: '2 Items (minimum)',
            state: {
                items: [
                    {
                        label: 'item 1',
                        href: '#link-1',
                    },
                    {
                        label: 'item 2',
                        href: '#link-2',
                    },
                ],
            },
        },
        {
            label: '3 Items',
            state: {
                items: [
                    {
                        label: 'item 1',
                        href: '#link-1',
                    },
                    {
                        label: 'item 2',
                        href: '#link-2',
                    },
                    {
                        label: 'item 3',
                        href: '#link-3',
                    },
                ],
            },
        },
        {
            label: '5 Items',
            state: {
                items: [
                    {
                        label: 'item 1',
                        href: '#link-1',
                    },
                    {
                        label: 'item 2',
                        href: '#link-2',
                    },
                    {
                        label: 'item 3',
                        href: '#link-3',
                    },
                    {
                        label: 'item 4',
                        href: '#link-4',
                    },
                    {
                        label: 'item 5',
                        href: '#link-5',
                    },
                ],
            },
        },
        {
            label: '7 Items',
            state: {
                items: [
                    {
                        label: 'item 1',
                        href: '#link-1',
                    },
                    {
                        label: 'item 2',
                        href: '#link-2',
                    },
                    {
                        label: 'item 3',
                        href: '#link-3',
                    },
                    {
                        label: 'item 4',
                        href: '#link-4',
                    },
                    {
                        label: 'item 5',
                        href: '#link-5',
                    },
                    {
                        label: 'item 6',
                        href: '#link-6',
                    },
                    {
                        label: 'item 7',
                        href: '#link-7',
                    },
                ],
            },
        },
    ],
};
