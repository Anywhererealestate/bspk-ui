import { UIProviderProps } from '.';
import { Button } from '-/components/Button';
import { useUIContext } from '-/hooks/useUIContext';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<UIProviderProps>[] = [];

export const UIProviderExample: ComponentExample<UIProviderProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets,
    sections: [
        {
            title: 'Theme Switching',
            content: ({ Syntax }) => (
                <div style={{}}>
                    <Syntax
                        code={`// Example usage of theme switching
import { useContext } from 'react';
import { useUIContext } from '-/hooks/useUIContext';

export function ThemeSwitcher() {
    const {theme, setTheme} = useUIContext();

    return (
        <div>
            <p>Current theme: {theme}</p>
            <button onClick={() => setTheme('light')}>Light Theme</button>
            <button onClick={() => setTheme('dark')}>Dark Theme</button>
        </div>
    );
}`}
                        language="typescript"
                    />
                </div>
            ),
        },
        {
            title: 'Responsive Helpers',
            content: ({ Syntax }) => (
                <div style={{}}>
                    <Syntax
                        code={`// Example usage of isMobile, isTablet, and isDesktop
import { useContext } from 'react';
import { useUIContext } from '-/hooks/useUIContext';

export function ResponsiveComponent() {
    const {isMobile, isTablet, isDesktop} = useUIContext();

    return (
        <div>
            {isMobile && <p>This is a mobile device.</p>}
            {isTablet && <p>This is a tablet device.</p>}
            {isDesktop && <p>This is a desktop device.</p>}
        </div>
    );
}`}
                        language="typescript"
                    />
                </div>
            ),
        },
        {
            title: 'ARIA Live Messages',
            content: ({ Syntax }) => (
                <div style={{}}>
                    <p>
                        Example usage of sending ARIA live messages. This allows for dynamic updates to assistive
                        technologies, such as screen readers.
                    </p>
                    <AriaLiveExample />
                    <Syntax
                        code={`// Example usage of sending ARIA live messages
import { useContext } from 'react';
import { useUIContext } from '-/hooks/useUIContext';

export function AriaLiveExample() {
    const {sendAriaLiveMessage} = useUIContext();

    const handleClick = () => {
        sendAriaLiveMessage('Action completed successfully', 'polite');
    };

    return (
        <div>
            <button onClick={handleClick}>Perform Action</button>
        </div>
    );
}`}
                        language="typescript"
                    />
                </div>
            ),
        },
    ],
    variants: {},
};

export function AriaLiveExample() {
    const { sendAriaLiveMessage } = useUIContext();

    return (
        <p>
            <Button
                data-bspk="link"
                label="Send a polite ARIA Live Message "
                onClick={() => {
                    sendAriaLiveMessage?.(
                        `Action completed successfully at ${new Date().toLocaleTimeString()}`,
                        'polite',
                    );
                }}
                style={{
                    padding: 0,
                    margin: 0,
                    border: 'none',
                    background: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                }}
                variant="tertiary"
            />

            <Button
                data-bspk="link"
                label="Send an assertive ARIA Live Message "
                onClick={() => {
                    sendAriaLiveMessage?.(
                        `Critical update occurred at ${new Date().toLocaleTimeString()}`,
                        'assertive',
                    );
                }}
                style={{
                    padding: 0,
                    margin: 0,
                    border: 'none',
                    background: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                }}
                variant="tertiary"
            />
        </p>
    );
}
