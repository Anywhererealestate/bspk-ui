import { Skeleton, SkeletonProps } from './Skeleton';

export function SkeletonRectangular(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="rectangular" />;
}
