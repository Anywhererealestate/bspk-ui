import { useRef, useEffect } from 'react';
import { BRANDS_CSS } from './brandsCss';
import { Brand } from '-/types/common';
import '-/styles/base.scss';

export type StylesProviderDemoProps = {
    /**
     * The current brand variant.
     *
     * @default anywhere
     */
    brand?: Brand;
};

/**
 * Used only on the demo site to switch between different brands styles.
 *
 * @example
 *     import { StylesProviderDemo } from '@bspk/ui/StylesProviderDemo';
 *
 *     function Example() {
 *         return <StylesProviderDemo brand="anywhere" />;
 *     }
 *
 * @name StylesProviderDemo
 * @phase Utility
 */
function StylesProviderDemo({ brand = 'anywhere' }: StylesProviderDemoProps): JSX.Element | null {
    const styleElement = useRef<HTMLStyleElement | null>(null);

    useEffect(() => {
        if (!styleElement.current) {
            styleElement.current = document.createElement('style');
            document.head.appendChild(styleElement.current);
        }

        styleElement.current.textContent = (brand && BRANDS_CSS[brand]) || BRANDS_CSS.anywhere;

        return () => {
            if (!styleElement.current) return;
            document.head.removeChild(styleElement.current);
            styleElement.current = null;
        };
    }, [brand]);

    return null;
}

StylesProviderDemo.bspkName = 'StylesProviderDemo';

export { StylesProviderDemo };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
