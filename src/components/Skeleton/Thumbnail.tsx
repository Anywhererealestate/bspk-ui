import { Skeleton, SkeletonProps } from './Skeleton';

/**
 * SkeletonThumbnail component displays a thumbnail skeleton loader.
 *
 * @name SkeletonThumbnail
 * @parent Skeleton
 */
export function SkeletonThumbnail(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="thumbnail" />;
}
