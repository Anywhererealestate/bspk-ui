import { Skeleton, SkeletonProps } from './Skeleton';

/**
 * SkeletonProfile component displays a profile skeleton loader.
 *
 * @name SkeletonProfile
 * @parent Skeleton
 */
export function SkeletonProfile(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="profile" />;
}
