import { useEffect, useRef } from 'react';

import baseStyle from './styles/base';
import brandStyle from './styles/better-homes-gardens';

/**
 * Utility to provide the Better Homes & Gardens styles to the application.
 *
 * @name StylesProviderBetterHomesGardens
 */
function StylesProviderBetterHomesGardens() {
    const styleEmentRef = useRef<HTMLStyleElement | null>(null);

    useEffect(() => {
        styleEmentRef.current = document.createElement('style');
        styleEmentRef.current.setAttribute('data-bspk', 'better-homes-gardens');
        styleEmentRef.current.innerHTML = brandStyle + baseStyle;
        document.head.appendChild(styleEmentRef.current);
        document.body.style.display = '';

        return () => {
            if (styleEmentRef.current) document.head.removeChild(styleEmentRef.current);
        };
    }, []);

    return <></>;
}

StylesProviderBetterHomesGardens.bspkName = 'StylesProviderBetterHomesGardens';

export { StylesProviderBetterHomesGardens };
