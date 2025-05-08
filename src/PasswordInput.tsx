import { css } from '@emotion/react';

export type PasswordInputProps = {
    /**
     * The content of the password input.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name PasswordInput
 */
function PasswordInput({ children }: PasswordInputProps) {
    return (
        <div css={style} data-password-input>
            {children}
        </div>
    );
}

PasswordInput.bspkName = 'PasswordInput';

export { PasswordInput };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
