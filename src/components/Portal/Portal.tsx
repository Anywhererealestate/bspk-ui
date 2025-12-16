import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
    /**
     * The content to render in the portal.
     *
     * @required
     */
    children: ReactNode;
    /** The container to render the portal content in. */
    container?: HTMLElement;
};

/**
 * Utility component to render children in the portals container provided by the BaseProvider.
 *
 * Initial SRR is supported.
 *
 * @name Portal
 * @phase Utility
 */
export function Portal({ children, container }: PortalProps) {
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(container || null);

    useEffect(() => {
        if (!portalContainer && typeof window !== 'undefined') setPortalContainer(document.body);
    }, [portalContainer]);

    if (!portalContainer) return null;

    // data-bspk="portal" can't be used here
    return <>{createPortal(children, portalContainer)}</>;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
