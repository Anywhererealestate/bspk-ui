import { ComponentExample } from '../utils';

import { SelectExample } from './Select';

export const MenuExample: ComponentExample = {
    presets: [
        {
            label: 'Links',
            state: {
                isMulti: false,
                itemsAs: 'a',
                items: [
                    {
                        label: 'Link 1',
                        href: '#link-1',
                    },
                    {
                        label: 'Link 2',
                        href: '#link-2',
                    },
                    {
                        label: 'Link 3',
                        href: '#link-3',
                    },
                ],
            },
        },
        ...(SelectExample.presets || []),
    ],
};
