import { FC, useEffect, useState } from 'react';

import { PaginationProps } from './Pagination';
import { TextInput } from '-/components/TextInput';
import { Txt } from '-/components/Txt';

type PageInputProps = Pick<PaginationProps, 'numPages' | 'onChange' | 'value'>;

export const PageInput: FC<PageInputProps> = ({ numPages, onChange, value }) => {
    const [page, setPage] = useState<string>(String(value));

    useEffect(() => {
        const stringValue = String(value);

        if (stringValue !== page) {
            setPage(stringValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleChange = (val: string) => {
        const pageNumber = parseInt(val, 10);
        const isValidPageNumber = !isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= numPages;

        if (isValidPageNumber || val === '') {
            setPage(val);
        }
    };

    const handleSubmit = () => {
        const pageNumber = parseInt(page, 10);

        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= numPages) {
            onChange(pageNumber);
        } else {
            setPage(String(value));
        }
    };

    const pageCountMessage = `of ${numPages}`;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            style={{ display: 'contents' }}
        >
            <div data-bspk="page-input">
                <TextInput
                    aria-label="Page input"
                    name="page-input"
                    onBlur={handleSubmit}
                    onChange={handleChange}
                    showClearButton={false}
                    size="small"
                    value={page}
                />

                <Txt variant="body-small">{pageCountMessage}</Txt>
            </div>
        </form>
    );
};
