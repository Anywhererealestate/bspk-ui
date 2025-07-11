import { FC } from 'react';

type PageControlDotProps = {
    size?: 'large' | 'medium' | 'small';
    active?: boolean;
};

export const PageControlDot: FC<PageControlDotProps> = ({ size = 'large', active = false }) => (
    <span data-active={active} data-bspk="page-control-dot" data-size={size} />
);
