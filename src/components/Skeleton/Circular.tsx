import { Skeleton, SkeletonProps } from './Skeleton';

export function SkeletonCircular(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="circular" />;
}
