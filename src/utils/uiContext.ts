import { AriaAttributes, createContext } from 'react';

export const COLOR_THEMES = ['light', 'dark'] as const;

export type ColorTheme = (typeof COLOR_THEMES)[number];

export type AriaLiveMessage = { message: string; live?: Exclude<AriaAttributes['aria-live'], 'off' | undefined> };

export type UIContextProps = {
    theme: ColorTheme;
    setTheme: (theme: ColorTheme) => void;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    sendAriaLiveMessage: (message: string, live?: AriaLiveMessage['live']) => void;
};

export const UIContext = createContext<UIContextProps | undefined>(undefined);
