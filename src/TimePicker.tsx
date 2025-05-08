import { css } from '@emotion/react';

export type TimePickerProps = {
    /** The content of the timepicker. */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name TimePicker
 */
function TimePicker({ children }: TimePickerProps) {
    return (
        <div css={style} data-time-picker>
            {children}
        </div>
    );
}

TimePicker.bspkName = 'TimePicker';

export { TimePicker };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
