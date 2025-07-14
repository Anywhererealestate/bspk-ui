import { Skeleton, SkeletonProps } from './Skeleton';

function SkeletonPhoto(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="photo" />;
}

export { SkeletonPhoto as Photo };
