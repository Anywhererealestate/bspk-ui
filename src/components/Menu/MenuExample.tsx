import { SvgAccountCircle } from '@bspk/icons/AccountCircle';
import { SvgDarkMode } from '@bspk/icons/DarkMode';
import { SvgDarkModeFill } from '@bspk/icons/DarkModeFill';
import { SvgHelp } from '@bspk/icons/Help';
import { SvgLicense } from '@bspk/icons/License';
import { SvgLogout } from '@bspk/icons/Logout';
import { SvgMenuBook } from '@bspk/icons/MenuBook';
import { SvgSettings } from '@bspk/icons/Settings';

import { MenuProps } from '.';
import { Avatar } from '-/components/Avatar';
import { Divider } from '-/components/Divider';
import { ListItem } from '-/components/ListItem';
import { Switch } from '-/components/Switch';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<MenuProps>[] = [
    {
        label: 'Scroll = False',
        propState: {
            floating: false,
            portal: false,
            itemDisplayCount: 5,
            itemCount: 11,
            scroll: false,
        },
    },
    {
        label: 'Item Display Count',
        propState: {
            floating: false,
            portal: false,
            itemDisplayCount: 5,
            itemCount: 11,
            scroll: true,
        },
    },
];

export const MenuExample: ComponentExampleFn<MenuProps & { style?: unknown; 'data-dark-mode'?: boolean }> = ({
    action,
}) => ({
    render: ({ props, Component, setState }) => {
        return (
            <Component {...props} style={{ padding: 'var(--spacing-sizing-02) var(--spacing-sizing-02)' }}>
                <ListItem
                    label="Michael Scott"
                    leading={<Avatar image="/profile2.jpg" name="Michael Scott" />}
                    subText="michael.scott@email.com"
                />
                <Divider inset={2} padding />
                <ListItem href="#/my-profile" label="My profile" leading={<SvgAccountCircle />} />
                <ListItem href="#/settings" label="Settings" leading={<SvgSettings />} />
                <ListItem
                    as="label"
                    label="Dark mode"
                    leading={props['data-dark-mode'] ? <SvgDarkModeFill /> : <SvgDarkMode />}
                    trailing={
                        <Switch
                            aria-label="Toggle dark mode"
                            checked={!!props['data-dark-mode']}
                            name="dark-mode"
                            onChange={() => {
                                setState((prev) => ({ 'data-dark-mode': !prev['data-dark-mode'] }));
                                action('Dark mode toggled');
                            }}
                        />
                    }
                />
                <Divider inset={2} padding={false} thickness="light" />
                <ListItem href="#/guide-tutorial" label="Guide and tutorial" leading={<SvgMenuBook />} />
                <ListItem href="#/help-center" label="Help center" leading={<SvgHelp />} />
                <Divider inset={2} padding />
                <ListItem href="#/go-premium" label="Go premium" leading={<SvgLicense />} />
                <ListItem
                    label="Log out"
                    leading={<SvgLogout />}
                    onClick={() => {
                        action('Log out clicked');
                    }}
                    role="button"
                />
            </Component>
        );
    },
    presets,
    variants: false,
});
