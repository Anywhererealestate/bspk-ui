import './avatar.scss';
import { ReactNode, useMemo } from 'react';

import { ColorVariant } from './utils/colorVariants';

import { CommonProps } from '.';

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

export type AvatarProps = CommonProps<'aria-label'> & {
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
    /** The initials to display in the avatar limited to 2 characters. */
    initials?: string;
    /** The icon to display in the avatar. */
    icon?: ReactNode;
    /** The url to the image to display in the avatar. */
    image?: string;
    /** The number of notifications not displayed in a list. */
    overflowCount?: number;
};

/**
 * An avatar is a visual representation of a user or entity. It can be used to display an initials, icon, image, or an
 * overflowCount.
 *
 * @name Avatar
 */
function Avatar({
    initials,
    color = 'grey',
    size = 'small',
    icon,
    image,
    'aria-label': ariaLabel,
    overflowCount,
}: AvatarProps) {
    const children = useMemo(() => {
        if (initials) return <span data-initials>{initials}</span>;
        if (icon) return <span data-icon>{icon}</span>;
        if (image) return <img alt={ariaLabel} src={image} />;
        if (overflowCount) return <span data-overflow-count>+{overflowCount}</span>;
        return null;
    }, [ariaLabel, icon, image, initials, overflowCount]);

    return (
        <>
            {children && (
                <div aria-label={ariaLabel} data-bspk="avatar" data-color={color} data-size={size}>
                    {children}
                </div>
            )}
        </>
    );
}

Avatar.bspkName = 'Avatar';

export { Avatar };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
