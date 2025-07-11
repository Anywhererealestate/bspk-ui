import { FC } from 'react';

import { Button } from '-/components/Button';

import { PaginationProps } from './Pagination';

export const PageList: FC<Pick<PaginationProps, 'numPages' | 'onChange' | 'value'>> = ({
    numPages,
    onChange,
    value,
}) => {
    const pageButtons = [];

    for (let i = 1; i <= numPages; i++) {
        pageButtons.push(
            <Button
                aria-label={`Page ${i}`}
                data-bspk-owner="pagination"
                key={i}
                label={String(i)}
                onClick={() => onChange(i)}
                showLabel={true}
                size="small"
                variant={value === i ? 'primary' : 'tertiary'}
            />,
        );
    }
    return pageButtons;
};
