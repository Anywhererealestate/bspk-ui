import { SearchBarProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const SearchBarExample: ComponentExample = {
    render: ({ props: state, Component }) => {
        const props = { ...state } as SearchBarProps;

        const searchValue = (props.value as string | undefined)?.trim()?.toLowerCase() || '';

        if (Array.isArray(props.items) && searchValue.length)
            props.items = props.items?.filter((item) => item.label.toLowerCase().includes(searchValue));

        return (
            <Component
                {...props}
                itemCount={props.items?.length || undefined}
                itemDisplayCount={props.items && props.items.length <= 7 ? props.items.length : 7}
                items={props.items || []}
            />
        );
    },
};
