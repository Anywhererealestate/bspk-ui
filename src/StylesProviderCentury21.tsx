import { useEffect, useRef } from 'react';

import baseStyle from './styles/base';
import brandStyle from './styles/century-21';

/**
 * Utility to provide the Century 21 styles to the application.
 *
 * @name StylesProviderCentury21
 */
function StylesProviderCentury21() {
    const styleEmentRef = useRef<HTMLStyleElement | null>(null);

    useEffect(() => {
        styleEmentRef.current = document.createElement('style');
        styleEmentRef.current.setAttribute('data-bspk', 'century-21');
        styleEmentRef.current.innerHTML = brandStyle + baseStyle;
        document.head.appendChild(styleEmentRef.current);
        document.body.style.display = '';

        return () => {
            if (styleEmentRef.current) document.head.removeChild(styleEmentRef.current);
        };
    }, []);

    return <></>;
}

StylesProviderCentury21.bspkName = 'StylesProviderCentury21';

export { StylesProviderCentury21 };
