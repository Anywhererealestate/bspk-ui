import { SvgMenu } from '@bspk/icons/Menu';

import './menu-button.scss';
import { ButtonProps } from './Button';

import { ElementProps } from '.';

export type MenuButtonProps = Pick<ButtonProps, 'as' | 'onClick'>;

/**
 * Utility component used within top navigation.
 *
 * @name MenuButton
 */
function MenuButton(props: ElementProps<MenuButtonProps, 'button'>) {
    return (
        <button data-bspk="menu-button" {...props}>
            <SvgMenu />
        </button>
    );
}

MenuButton.bspkName = 'MenuButton';

export { MenuButton };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
