import { ComboboxItemProps } from '../../Combobox';
import { SearchBarProps } from '../../SearchBar';
import { ComponentExample } from '../utils';

export const SearchBarExample: ComponentExample = {
    render: ({ props: state, Component }) => {
        const props = { ...state } as SearchBarProps;

        const searchValue = (props.value as string | undefined)?.trim()?.toLowerCase() || '';

        if (Array.isArray(props.items) && searchValue.length)
            props.items = props.items?.filter((item: ComboboxItemProps) =>
                item.label.toLowerCase().includes(searchValue),
            );
        props.showMenu = !!searchValue;

        return <Component {...props} items={props.items || []} />;
    },
};
