import { Skeleton, SkeletonProps } from './Skeleton';

function SkeletonRectangular(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="rectangular" />;
}

export { SkeletonRectangular as Rectangular };
