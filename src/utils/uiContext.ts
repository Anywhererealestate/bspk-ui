import { createContext } from 'react';

export const COLOR_THEMES = ['light', 'dark'] as const;

export type ColorTheme = (typeof COLOR_THEMES)[number];

export type UIContextProps = {
    theme: ColorTheme;
    setTheme: (theme: ColorTheme) => void;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};

export const UIContext = createContext<UIContextProps | undefined>(undefined);
