import { SearchBarProps } from '.';
import { ComponentExample } from '-/utils/demo';
import { randomString } from '-/utils/random';

export const SearchBarExample: ComponentExample<SearchBarProps> = {
    render: ({ props, Component }) => {
        return <Component {...props} id={`search-bar-${randomString(8)}`} />;
    },
};
