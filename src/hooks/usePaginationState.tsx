import { useState } from 'react';

/*
    * A hook to manage the state of pagination.

    * @param numPages - The total number of pages.
    * @param initialPage - The initial page to start on (default is 1).
    * @returns An object containing the current page and a function to set the current page.
    */
export const usePaginationState = (numPages: number, initialPage?: number) => {
    const [currentPage, setCurrentPage] = useState(initialPage || 1);

    const setPage = (page: number) => {
        if (page < 1 || page > numPages) {
            return;
        }
        setCurrentPage(page);
    };

    return {
        currentPage,
        setCurrentPage: setPage,
    };
};
