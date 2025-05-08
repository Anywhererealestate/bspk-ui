import { css } from '@emotion/react';

export type MultiSelectionProps = {
    /**
     * The content of the multi selection.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name MultiSelection
 */
function MultiSelection({ children }: MultiSelectionProps) {
    return (
        <div css={style} data-multi-selection>
            {children}
        </div>
    );
}

MultiSelection.bspkName = 'MultiSelection';

export { MultiSelection };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
