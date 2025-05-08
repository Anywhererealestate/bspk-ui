import { css } from '@emotion/react';

export type SliderInputProps = {
    /** The content of the slider input. */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name SliderInput
 */
function SliderInput({ children }: SliderInputProps) {
    return (
        <div css={style} data-slider-input>
            {children}
        </div>
    );
}

SliderInput.bspkName = 'SliderInput';

export { SliderInput };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
