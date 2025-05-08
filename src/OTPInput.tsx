import { css } from '@emotion/react';

export type OTPInputProps = {
    /**
     * The content of the otp input.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name OTPInput
 */
function OTPInput({ children }: OTPInputProps) {
    return (
        <div css={style} data-otp-input>
            {children}
        </div>
    );
}

OTPInput.bspkName = 'OTPInput';

export { OTPInput };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
