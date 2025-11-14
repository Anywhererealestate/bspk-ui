import { Skeleton, SkeletonProps } from './Skeleton';

/**
 * SkeletonPhoto component displays a photo skeleton loader.
 *
 * @name SkeletonPhoto
 * @parent Skeleton
 */
export function SkeletonPhoto(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="photo" />;
}
