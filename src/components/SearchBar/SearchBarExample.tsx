import { SearchBarProps } from '.';
import { ComponentExample } from '-/utils/demo';
import { randomString } from '-/utils/random';

export const SearchBarExample: ComponentExample<SearchBarProps> = {
    defaultState: {
        'aria-label': 'search bar aria-label',
    },
    render: ({ props, Component }) => {
        return <Component {...props} id={`search-bar-${randomString(8)}`} />;
    },
};
