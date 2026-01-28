import './top-navigation.scss';

export type TopNavigationProps = {
    /** The content of the top navigation. */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name TopNavigation
 * @phase Backlog
 */
export function TopNavigation({ children }: TopNavigationProps) {
    return <div data-bspk="top-navigation">{children}</div>;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
