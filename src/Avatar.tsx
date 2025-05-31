import './avatar.scss';
import { ReactNode, useMemo } from 'react';

import { Tooltip } from './Tooltip';
import { isValidIcon } from './utils/children';
import { ColorVariant } from './utils/colorVariants';

const DEFAULT = {
    size: 'small',
    color: 'grey',
    showTooltip: true,
} as const;

export type SizeVariant =
    | 'large'
    | 'medium'
    | 'small'
    | 'x-large'
    | 'x-small'
    | 'xx-large'
    | 'xxx-large'
    | 'xxxx-large'
    | 'xxxxx-large';

export type AvatarProps = {
    /**
     * The name of the person or entity represented by the avatar. This is used for accessibility purposes.
     *
     * @example
     *     Jane Doe
     *
     * @required
     */
    name: string;
    /**
     * The size of the avatar.
     *
     * @default small
     */
    size?: SizeVariant;
    /**
     * The color of the avatar.
     *
     * @default grey
     */
    color?: ColorVariant;
    /**
     * The initials to display in the avatar limited to 2 characters.
     *
     * If not provided, the first two letters of the name will be used as initials.
     *
     * @example
     *     JD;
     */
    initials?: string;
    /**
     * The icon to display in the avatar. This needs to be an icon from the @bspk/icons library.
     *
     * @example
     *     <SvgPerson />;
     *
     * @type BspkIcon
     */
    icon?: ReactNode;
    /**
     * The url to the image to display in the avatar.
     *
     * @example
     *     /profile.jpg
     */
    image?: string;
    /**
     * Whether to show the represeneetd user's name as a tooltip.
     *
     * @default true
     */
    showTooltip?: boolean;
};

/**
 * An avatar is a visual representation of a user or entity. It can be used to display an initials, icon, image.
 *
 * The image if provided is displayed first, followed by the icon if provided, and finally the initials.
 *
 * If no initials are provided, the first two letters of the name will be used as initials.
 *
 * @name Avatar
 */
function Avatar({
    initials: initialsProp,
    color = DEFAULT.color,
    size = DEFAULT.size,
    icon,
    image,
    name: ariaLabel,
    showTooltip = DEFAULT.showTooltip,
}: AvatarProps) {
    const children = useMemo(() => {
        if (image) return <img alt={ariaLabel} src={image} />;

        if (isValidIcon(icon)) return <span data-icon>{icon}</span>;

        let initials = initialsProp;

        if (ariaLabel && !initials)
            initials = ariaLabel
                .split(' ')
                .map((word) => word.charAt(0))
                .slice(0, 2)
                .join('')
                .toUpperCase();

        if (initials) return <span data-initials>{initials.slice(0, 2)}</span>;

        return null;
    }, [ariaLabel, icon, image, initialsProp]);

    if (!children) return null;

    const avatar = (
        <div aria-label={ariaLabel} data-bspk="avatar" data-color={color} data-size={size}>
            {children}
        </div>
    );

    return showTooltip ? <Tooltip label={ariaLabel}>{avatar}</Tooltip> : avatar;
}

Avatar.bspkName = 'Avatar';

export { Avatar };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
