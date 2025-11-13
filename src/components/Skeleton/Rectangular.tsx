import { Skeleton, SkeletonProps } from './Skeleton';

/**
 * SkeletonRectangular component displays a rectangular skeleton loader.
 *
 * @name SkeletonRectangular
 * @parent Skeleton
 */
export function SkeletonRectangular(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="rectangular" />;
}
