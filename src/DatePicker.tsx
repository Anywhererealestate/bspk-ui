import { css } from '@emotion/react';

export type DatePickerProps = {
    /**
     * The content of the datepicker.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name DatePicker
 */
function DatePicker({ children }: DatePickerProps) {
    return (
        <div css={style} data-date-picker>
            {children}
        </div>
    );
}

DatePicker.bspkName = 'DatePicker';

export { DatePicker };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
