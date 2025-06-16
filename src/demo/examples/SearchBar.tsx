import { MenuItem } from '../../Menu';
import { SearchBarProps } from '../../SearchBar';
import { ComponentExample } from '../utils';

export const SearchBarExample: ComponentExample = {
    containerStyle: { width: '400px' },
    render: ({ props: state, Component, preset }) => {
        const props = { ...state } as SearchBarProps;

        if (preset?.label === 'Show Filtered Items') {
            const searchValue = (props.value as string | undefined)?.trim()?.toLowerCase() || '';
            if (Array.isArray(props.items) && searchValue.length)
                props.items = props.items?.filter((item: MenuItem) => item.label.toLowerCase().includes(searchValue));
            props.showMenu = !!searchValue;
        }

        return <Component {...props} items={props.items || []} />;
    },
    presets: [
        {
            // we change the items and showMenu based on the input value
            label: 'Show Filtered Items',
            state: {
                showMenu: false,
            },
        },
    ],
};
