import { SearchBarProps } from '.';
import { ComboboxItemProps } from '-/components/Combobox';
import { ComponentExample } from '-/utils/demo';

export const SearchBarExample: ComponentExample = {
    render: ({ props: state, Component }) => {
        const props = { ...state } as SearchBarProps;

        const searchValue = (props.value as string | undefined)?.trim()?.toLowerCase() || '';

        if (Array.isArray(props.items) && searchValue.length)
            props.items = props.items?.filter((item: ComboboxItemProps) =>
                item.label.toLowerCase().includes(searchValue),
            );

        return <Component {...props} items={props.items || []} />;
    },
};
