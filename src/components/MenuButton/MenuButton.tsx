import { SvgMenu } from '@bspk/icons/Menu';

import { ButtonProps } from '-/components/Button';
import { ElementProps } from '-/types/common';

import './menu-button.scss';

export type MenuButtonProps = Pick<ButtonProps, 'as' | 'onClick'>;

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
export function MenuButton(props: ElementProps<MenuButtonProps, 'button'>) {
    return (
        <button data-bspk="menu-button" {...props}>
            <SvgMenu />
        </button>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
