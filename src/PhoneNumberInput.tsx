import { css } from '@emotion/react';

export type PhoneNumberInputProps = {
    /**
     * The content of the phone number input.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name PhoneNumberInput
 */
function PhoneNumberInput({ children }: PhoneNumberInputProps) {
    return (
        <div css={style} data-phone-number-input>
            {children}
        </div>
    );
}

PhoneNumberInput.bspkName = 'PhoneNumberInput';

export { PhoneNumberInput };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
