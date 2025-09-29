import { SearchBarProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const SearchBarExample: ComponentExample<SearchBarProps> = {
    render: ({ props, Component }) => {
        return <Component {...props} />;
    },
};
