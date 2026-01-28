import { useRef, useEffect } from 'react';
import { BRANDS_CSS } from './brandsCss';
import { EXAMPLE_CSS } from './exampleCss';
import { Brand } from '-/types/common';
import '-/styles/base.scss';

const THEME_CSS = { ...BRANDS_CSS, ...EXAMPLE_CSS };

export type StylesProviderDemoProps = {
    /**
     * The current brand variant.
     *
     * @default anywhere
     */
    brand?: Brand | 'example';
};

/**
 * Used only on the demo site to switch between different brands styles.
 *
 * @example
 *     import { StylesProviderDemo } from '@bspk/ui/StylesProviderDemo';
 *
 *     <StylesProviderDemo brand="anywhere" />;
 *
 * @name StylesProviderDemo
 * @phase Utility
 */
export function StylesProviderDemo({ brand = 'anywhere' }: StylesProviderDemoProps): JSX.Element | null {
    const styleElement = useRef<HTMLStyleElement | null>(null);

    useEffect(() => {
        if (!styleElement.current) {
            styleElement.current = document.createElement('style');
            document.head.appendChild(styleElement.current);
        }

        styleElement.current.textContent = (brand && THEME_CSS[brand]) || THEME_CSS.anywhere;

        return () => {
            if (!styleElement.current) return;
            document.head.removeChild(styleElement.current);
            styleElement.current = null;
        };
    }, [brand]);

    return null;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
