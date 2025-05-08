import { useEffect, useRef } from 'react';

import baseStyle from './styles/base';
import brandStyle from './styles/sothebys';

/**
 * Utility to provide the Sotheby's styles to the application.
 *
 * @name StylesProviderSothebys
 */
function StylesProviderSothebys() {
    const styleEmentRef = useRef<HTMLStyleElement | null>(null);

    useEffect(() => {
        styleEmentRef.current = document.createElement('style');
        styleEmentRef.current.setAttribute('data-bspk', 'sothebys');
        styleEmentRef.current.innerHTML = brandStyle + baseStyle;
        document.head.appendChild(styleEmentRef.current);
        document.body.style.display = '';

        return () => {
            if (styleEmentRef.current) document.head.removeChild(styleEmentRef.current);
        };
    }, []);

    return <></>;
}

StylesProviderSothebys.bspkName = 'StylesProviderSothebys';

export { StylesProviderSothebys };
