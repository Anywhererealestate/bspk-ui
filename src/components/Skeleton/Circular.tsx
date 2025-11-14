import { Skeleton, SkeletonProps } from './Skeleton';

/**
 * SkeletonCircular component displays a circular skeleton loader.
 *
 * @name SkeletonCircular
 * @parent Skeleton
 */
export function SkeletonCircular(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="circular" />;
}
