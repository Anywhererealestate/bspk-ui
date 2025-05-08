import { useEffect, useRef } from 'react';

import brandStyle from './styles/anywhere';
import baseStyle from './styles/base';

/**
 * Utility to provide the Anywhere styles to the application.
 *
 * @name StylesProviderAnywhere
 */
function StylesProviderAnywhere() {
    const styleEmentRef = useRef<HTMLStyleElement | null>(null);

    useEffect(() => {
        styleEmentRef.current = document.createElement('style');
        styleEmentRef.current.setAttribute('data-bspk', 'anywhere');
        styleEmentRef.current.innerHTML = brandStyle + baseStyle;
        document.head.appendChild(styleEmentRef.current);
        document.body.style.display = '';

        return () => {
            if (styleEmentRef.current) document.head.removeChild(styleEmentRef.current);
        };
    }, []);

    return <></>;
}

StylesProviderAnywhere.bspkName = 'StylesProviderAnywhere';

export { StylesProviderAnywhere };
