import { SvgMenu } from '@bspk/icons/Menu';
import { css } from '@emotion/react';
import { ElementType } from 'react';

import { ButtonProps } from './Button';

import { ElementProps } from '.';

export type MenuButtonProps<As extends ElementType> = Pick<ButtonProps<As>, 'as' | 'onClick'>;

/**
 * Utility component used within top navigation.
 *
 * @name MenuButton
 */
function MenuButton<As extends ElementType = 'button'>({ as, ...props }: ElementProps<MenuButtonProps<As>, As>) {
    const As: ElementType = as || 'div';

    return (
        <button {...props} css={style}>
            <SvgMenu />
        </button>
    );
}

MenuButton.bspkName = 'MenuButton';

export { MenuButton };

export const style = css`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    height: 48px;
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: var(--spacing-sizing-01);
    color: var(--foreground-neutral-on-surface-variant-01);
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
