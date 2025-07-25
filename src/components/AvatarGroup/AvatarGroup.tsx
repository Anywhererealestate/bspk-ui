import { Avatar, AvatarProps, SizeVariant } from '-/components/Avatar';

import './avatar-group.scss';

export type AvatarItem = Pick<AvatarProps, 'color' | 'image' | 'initials' | 'name' | 'showIcon'>;

export type AvatarGroupProps = {
    /**
     * The avatars to display in the group.
     *
     * @example
     *     [
     *         { name: 'Jane Doe', image: '/profile.jpg' },
     *         { name: 'John Smith', initials: 'JS' },
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
     * @minimum 3
     * @maximum 5
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
 *     export function Example() {
 *         return (
 *             <AvatarGroup
 *                 items={[
 *                     { name: 'Jane Doe', image: '/path/to/image.jpg' },
 *                     { name: 'John Smith', initials: 'JS' },
 *                 ]}
 *             />
 *         );
 *     }
 *
 * @name AvatarGroup
 * @phase Backlog
 */
function AvatarGroup({ items, size = 'small', max = 5, variant }: AvatarGroupProps) {
    if (!Array.isArray(items) || !items?.length) return null;

    const overFlowCount = items.length - max;

    return (
        <div data-bspk="avatar-group" data-max={max} data-size={size} data-variant={variant}>
            <div data-wrap>
                {items.map((item, index) => (
                    <Avatar key={index} {...item} size={size} />
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

AvatarGroup.bspkName = 'AvatarGroup';

export { AvatarGroup };
