import { Skeleton, SkeletonProps } from './Skeleton';

function SkeletonProfile(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="profile" />;
}

export { SkeletonProfile as Profile };
