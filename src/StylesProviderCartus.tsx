import { useEffect, useRef } from 'react';

import baseStyle from './styles/base';
import brandStyle from './styles/cartus';

/**
 * Utility to provide the Cartus styles to the application.
 *
 * @name StylesProviderCartus
 */
function StylesProviderCartus() {
    const styleEmentRef = useRef<HTMLStyleElement | null>(null);

    useEffect(() => {
        styleEmentRef.current = document.createElement('style');
        styleEmentRef.current.setAttribute('data-bspk', 'cartus');
        styleEmentRef.current.innerHTML = brandStyle + baseStyle;
        document.head.appendChild(styleEmentRef.current);
        document.body.style.display = '';

        return () => {
            if (styleEmentRef.current) document.head.removeChild(styleEmentRef.current);
        };
    }, []);

    return <></>;
}

StylesProviderCartus.bspkName = 'StylesProviderCartus';

export { StylesProviderCartus };
