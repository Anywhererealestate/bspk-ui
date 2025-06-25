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
function TopNavigation({ children }: TopNavigationProps) {
    return <div data-bspk="top-navigation">{children}</div>;
}

TopNavigation.bspkName = 'TopNavigation';

export { TopNavigation };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
