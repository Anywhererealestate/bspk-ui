import { SvgMenu } from '@bspk/icons/Menu';
import { ButtonProps } from '-/components/Button';
import { ElementAttributes } from '-/types/common';

import './menu-button.scss';

export type MenuButtonProps = ElementAttributes<'button', Pick<ButtonProps, 'onClick'>>;

/**
 * Utility component used within top navigation.
 *
 * @example
 *     import { MenuButton } from '@bspk/ui/MenuButton';
 *
 *     export function Example() {
 *         return <MenuButton />;
 *     }
 *
 * @name MenuButton
 * @phase Utility
 */
export function MenuButton({ onClick, attr }: MenuButtonProps) {
    return (
        <button data-bspk="menu-button" onClick={onClick} {...attr}>
            <SvgMenu />
        </button>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
