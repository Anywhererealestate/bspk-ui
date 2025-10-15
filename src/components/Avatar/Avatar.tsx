import './avatar.scss';
import { SvgPerson } from '@bspk/icons/Person';
import { useMemo } from 'react';

import { Tooltip, TooltipTriggerProps } from '-/components/Tooltip';
import { CommonProps } from '-/types/common';
import { ColorVariant } from '-/utils/colorVariants';

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

export type AvatarProps = CommonProps<'disabled'> & {
    /**
     * The name of the person or entity represented by the avatar. This is used for accessibility purposes.
     *
     * @example
     *     Andre Giant
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
    color?: Exclude<ColorVariant, 'white'>;
    /**
     * Customizable initials to display in the avatar limited to 2 characters.
     *
     * By default, initials are the first letters of the first two words in the name. For a single-word name, only one
     * initial is shown. Names with three or more words, only the first two initials are used.
     *
     * @example
     *     AG;
     */
    initials?: string;
    /**
     * Whether to show the icon in the avatar instead of the initials.
     *
     * If an image is provided, the image will be shown instead of the icon.
     *
     * @default true
     */
    showIcon?: boolean;
    /**
     * The url to the image to display in the avatar.
     *
     * When provided the image will be displayed instead of the icon or initials.
     *
     * @example
     *     /profile.jpg
     */
    image?: string;
    /**
     * Whether to hide the represented user's name as a tooltip.
     *
     * @default false
     */
    hideTooltip?: boolean;
    /**
     * The function to call when the avatar is clicked.
     *
     * @type () => void
     */
    onClick?: () => void;
};

/**
 * An avatar is a visual representation of a user or entity. It can be used to display an initials, icon, or image.
 *
 * @example
 *     import { Avatar } from '@bspk/ui/Avatar';
 *     import { SvgPerson } from '@bspk/icons/Person';
 *
 *     function Example() {
 *         return (
 *             <Avatar
 *                 color="blue"
 *                 icon={<SvgPerson />}
 *                 image="/profile.jpg"
 *                 initials="AR"
 *                 name="Andre Giant"
 *                 showTooltip
 *                 size="large"
 *             />
 *         );
 *     }
 *
 * @exampleDescription The image if provided is displayed first, followed by the icon if provided, and finally the initials. If no initials are provided, the first two letters of the name will be used as initials.
 *
 * @name Avatar
 * @phase UXReview
 *
 * @subcomponent AvatarGroup
 */
export function Avatar({
    initials: initialsProp,
    color = 'grey',
    size = 'small',
    showIcon,
    image,
    name: ariaLabel,
    hideTooltip = false,
    onClick,
    disabled,
    ...props
}: AvatarProps) {
    const children = useMemo(() => {
        if (image) return <img alt={ariaLabel} aria-hidden={true} src={image} />;

        if (showIcon)
            return (
                <span aria-hidden={true} data-icon>
                    <SvgPerson />
                </span>
            );

        let initials = initialsProp;

        if (ariaLabel && !initials)
            initials = ariaLabel
                .split(' ')
                .map((word) => word.charAt(0))
                .slice(0, 2)
                .join('')
                .toUpperCase();

        if (initials)
            return (
                <span aria-hidden={true} data-initials>
                    {initials.slice(0, 2)}
                </span>
            );

        return null;
    }, [ariaLabel, showIcon, image, initialsProp]);

    if (!children) return null;

    const avatar = (triggerProps: TooltipTriggerProps) => (
        <div
            {...props}
            {...triggerProps}
            aria-disabled={disabled || undefined}
            aria-label={onClick ? ariaLabel : undefined}
            aria-labelledby={onClick ? triggerProps['aria-labelledby'] : undefined}
            aria-roledescription="person"
            data-bspk="avatar"
            data-color={color}
            data-size={size}
            onClickCapture={disabled ? undefined : onClick}
            role={onClick ? 'button' : ''}
            tabIndex={onClick && !disabled ? 0 : undefined}
        >
            {children}
        </div>
    );

    return !hideTooltip ? <Tooltip label={ariaLabel}>{avatar}</Tooltip> : avatar({});
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
