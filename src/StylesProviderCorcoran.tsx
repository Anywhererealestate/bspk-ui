import { useEffect, useRef } from 'react';

import baseStyle from './styles/base';
import brandStyle from './styles/corcoran';

/**
 * Utility to provide the Corcoran styles to the application.
 *
 * @name StylesProviderCorcoran
 */
function StylesProviderCorcoran() {
    const styleEmentRef = useRef<HTMLStyleElement | null>(null);

    useEffect(() => {
        styleEmentRef.current = document.createElement('style');
        styleEmentRef.current.setAttribute('data-bspk', 'corcoran');
        styleEmentRef.current.innerHTML = brandStyle + baseStyle;
        document.head.appendChild(styleEmentRef.current);
        document.body.style.display = '';

        return () => {
            if (styleEmentRef.current) document.head.removeChild(styleEmentRef.current);
        };
    }, []);

    return <></>;
}

StylesProviderCorcoran.bspkName = 'StylesProviderCorcoran';

export { StylesProviderCorcoran };
