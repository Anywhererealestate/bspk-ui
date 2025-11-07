import { PaginationProps } from '.';
import { usePaginationState } from '-/hooks/usePaginationState';
import { ComponentExample } from '-/utils/demo';

export const PaginationExample: ComponentExample<PaginationProps> = {
    scope: {
        usePaginationState,
    },
};
