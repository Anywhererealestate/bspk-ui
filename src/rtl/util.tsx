/* eslint-disable import/export */
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { UIProvider } from '-/components/UIProvider/UIProvider';

const renderWithUiProvider = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: UIProvider, ...options });

export * from '@testing-library/react';
export { renderWithUiProvider as render };
