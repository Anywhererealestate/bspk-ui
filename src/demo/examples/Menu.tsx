import { MenuProps } from '../../Menu';
import { ComponentExample } from '../utils';

import { SelectExample } from './Select';

export const MenuExample: ComponentExample<MenuProps> = {
    presets: [
        {
            label: 'Links',
            state: {
                isMulti: false,
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
