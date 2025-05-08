import { css } from '@emotion/react';

export type BottomSheetProps = {
    /**
     * The content of the bottom sheet.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name BottomSheet
 */
function BottomSheet({ children }: BottomSheetProps) {
    return (
        <div css={style} data-bottom-sheet>
            {children}
        </div>
    );
}

BottomSheet.bspkName = 'BottomSheet';

export { BottomSheet };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
