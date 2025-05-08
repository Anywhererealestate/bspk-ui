import { useEffect, useRef } from 'react';

import baseStyle from './styles/base';
import brandStyle from './styles/coldwell-banker';

/**
 * Utility to provide the Coldwell Banker styles to the application.
 *
 * @name StylesProviderColdwellBanker
 */
function StylesProviderColdwellBanker() {
    const styleEmentRef = useRef<HTMLStyleElement | null>(null);

    useEffect(() => {
        styleEmentRef.current = document.createElement('style');
        styleEmentRef.current.setAttribute('data-bspk', 'coldwell-banker');
        styleEmentRef.current.innerHTML = brandStyle + baseStyle;
        document.head.appendChild(styleEmentRef.current);
        document.body.style.display = '';

        return () => {
            if (styleEmentRef.current) document.head.removeChild(styleEmentRef.current);
        };
    }, []);

    return <></>;
}

StylesProviderColdwellBanker.bspkName = 'StylesProviderColdwellBanker';

export { StylesProviderColdwellBanker };
