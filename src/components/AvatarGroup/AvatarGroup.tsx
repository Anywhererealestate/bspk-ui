import './avatar-group.scss';
import { useLayoutEffect, useState } from 'react';
import { AvatarGroupOverflow } from './Overflow';
import { Avatar, AvatarProps, SizeVariant } from '-/components/Avatar';
import { CommonProps } from '-/types/common';

export type AvatarItem = Pick<AvatarProps, 'color' | 'image' | 'initials' | 'name' | 'showIcon'>;

export type AvatarGroupProps = CommonProps<'style'> & {
    /**
     * The avatars to display in the group.
     *
     * @example
     *     [
     *         { name: 'Fezzik', image: '/profile.jpg' },
     *         { name: 'Inigo Montoya', initials: 'IM', color: 'blue' },
     *         { name: 'Miracle Max', initials: 'MM', color: 'green' },
     *         { name: 'Princess Buttercup', showIcon: true },
     *     ];
     *
     * @type Array<AvatarItem>
     * @required
     */
    items: AvatarItem[];
    /**
     * Size of the avatar group.
     *
     * @default small
     */
    size?: SizeVariant;
    /**
     * The maximum number of avatars to display before showing the overflow menu.
     *
     * This is used to limit the number of avatars displayed in the group.
     *
     * Recommended to set this to a value between 3 and 5 for optimal display.
     *
     * If not set, as many avatars as possible will be displayed with an overflow menu.
     *
     * @default auto
     */
    max?: number | 'auto';
    /**
     * The variant of the avatar group.
     *
     * @default auto
     */
    variant?: 'auto' | 'spread' | 'stacked';
};

/**
 * AvatarGroup component displays a group of avatars.
 *
 * @example
 *     import { AvatarGroup } from '@bspk/ui/AvatarGroup';
 *
 *     function Example() {
 *         return (
 *             <AvatarGroup
 *                 items={[
 *                     { name: 'Andre Giant', image: '/path/to/image.jpg' },
 *                     { name: 'John Smith', initials: 'JS' },
 *                     { name: 'Princess Buttercup' },
 *                 ]}
 *             />
 *         );
 *     }
 *
 * @name AvatarGroup
 * @phase UXReview
 */
export function AvatarGroup({ items, size = 'small', max = 'auto', variant = 'auto', style }: AvatarGroupProps) {
    const [overflow, setOverflow] = useState(typeof max === 'number' ? max : 0);

    const [ref, setRef] = useState<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (!ref) return;

        const elements = ref.querySelectorAll<HTMLElement>('[data-bspk="avatar"]');
        const sizePerAvatar = elements?.[0]?.clientWidth;
        const parentWidth = ref.parentElement!.offsetWidth;
        const offSetWidth = (ref.firstElementChild as HTMLElement)?.offsetWidth;

        if (max !== 'auto' || !sizePerAvatar || elements.length < 2 || !parentWidth || offSetWidth <= parentWidth)
            return;

        ref.style.justifyContent = 'flex-start';

        let nextOverflow = 0;

        requestAnimationFrame(() => {
            elements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                // Reset opacity for all avatars first
                el.style.opacity = '';
                // Check if the right edge of the avatar is outside the parent's right edge
                if (rect.right > ref.parentElement!.getBoundingClientRect().right) {
                    el.style.opacity = '0.25';
                    if (!nextOverflow) nextOverflow = elements.length - index + 1;
                }
            });

            setOverflow(nextOverflow);
        });
    }, [ref, max, items.length, size, variant]);

    return !Array.isArray(items) || !items?.length ? null : (
        <div data-bspk="avatar-group" data-max={max} data-size={size} data-variant={variant} ref={setRef} style={style}>
            <div data-wrap>
                {items.slice(0, items.length - overflow).map((item, index) => (
                    <Avatar key={index} {...item} size={size} />
                ))}
                {overflow > 0 && (
                    <AvatarGroupOverflow items={items.slice(items.length - overflow)} overflow={overflow} size={size} />
                )}
            </div>
        </div>
    );
}
