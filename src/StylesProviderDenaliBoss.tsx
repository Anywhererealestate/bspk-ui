import { useEffect, useRef } from 'react';

import baseStyle from './styles/base';
import brandStyle from './styles/denali-boss';

/**
 * Utility to provide the Denali Boss styles to the application.
 *
 * @name StylesProviderDenaliBoss
 */
function StylesProviderDenaliBoss() {
    const styleEmentRef = useRef<HTMLStyleElement | null>(null);

    useEffect(() => {
        styleEmentRef.current = document.createElement('style');
        styleEmentRef.current.setAttribute('data-bspk', 'denali-boss');
        styleEmentRef.current.innerHTML = brandStyle + baseStyle;
        document.head.appendChild(styleEmentRef.current);
        document.body.style.display = '';

        return () => {
            if (styleEmentRef.current) document.head.removeChild(styleEmentRef.current);
        };
    }, []);

    return <></>;
}

StylesProviderDenaliBoss.bspkName = 'StylesProviderDenaliBoss';

export { StylesProviderDenaliBoss };
