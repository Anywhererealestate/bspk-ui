import { Skeleton, SkeletonProps } from './Skeleton';

export function SkeletonProfile(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="profile" />;
}
