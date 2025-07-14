import { Skeleton, SkeletonProps } from './Skeleton';

function SkeletonThumbnail(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="thumbnail" />;
}

export { SkeletonThumbnail as Thumbnail };
