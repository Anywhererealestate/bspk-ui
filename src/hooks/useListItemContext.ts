import { useContext } from 'react';
import { ListItemContext } from '-/utils/listItemContext';

/**
 * This is a optional hook to access the ListItemContext.
 *
 * If no context is provided, it returns an empty object.
 */
export const useListItemContext = () => {
    return useContext(ListItemContext) || {};
};
