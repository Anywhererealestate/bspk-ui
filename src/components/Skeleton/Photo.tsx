import { Skeleton, SkeletonProps } from './Skeleton';

export function SkeletonPhoto(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="photo" />;
}
