import { Skeleton, SkeletonProps } from './Skeleton';

export function SkeletonThumbnail(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="thumbnail" />;
}
