import { Skeleton, SkeletonProps } from './Skeleton';

function SkeletonCircular(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="circular" />;
}

export { SkeletonCircular as Circular };
