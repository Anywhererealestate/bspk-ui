import './avatar-group.scss';
import { Avatar, AvatarProps, SizeVariant } from '-/components/Avatar';

export type AvatarItem = Pick<AvatarProps, 'color' | 'image' | 'initials' | 'name' | 'showIcon'>;

export type AvatarGroupProps = {
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
    size?: Extract<SizeVariant, 'large' | 'medium' | 'small' | 'x-small'>;
    /**
     * The maximum number of avatars to display before showing the overflowCount.
     *
     * This is used to limit the number of avatars displayed in the group.
     *
     * Recommended to set this to a value between 3 and 5 for optimal display.
     */
    max?: number;
    /**
     * The variant of the avatar group.
     *
     * @default spread
     */
    variant?: 'spread' | 'stacked';
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
export function AvatarGroup({ items, size = 'small', max = 5, variant }: AvatarGroupProps) {
    if (!Array.isArray(items) || !items?.length) return null;

    const overFlowCount = items.length - max;
    const small = size === 'x-small' || size === 'small';

    return (
        <div data-bspk="avatar-group" data-max={max} data-size={size} data-variant={variant}>
            <div data-gap={variant === 'spread' ? (small ? '01' : '02') : undefined} data-wrap>
                {items.slice(0, max).map((item, index) => (
                    <Avatar
                        data-stacked={variant === 'stacked' ? (small ? '01' : '02') : undefined}
                        key={index}
                        {...item}
                        size={size}
                    />
                ))}

                {overFlowCount > 0 && (
                    <div aria-hidden data-bspk="avatar" data-color="white" data-size={size}>
                        <span data-overflow-count>+{overFlowCount}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
