import { SvgAccountCircle } from '@bspk/icons/AccountCircle';
import { SvgDarkMode } from '@bspk/icons/DarkMode';
import { SvgDarkModeFill } from '@bspk/icons/DarkModeFill';
import { SvgHelp } from '@bspk/icons/Help';
import { SvgLicense } from '@bspk/icons/License';
import { SvgLogout } from '@bspk/icons/Logout';
import { SvgMenuBook } from '@bspk/icons/MenuBook';
import { SvgSettings } from '@bspk/icons/Settings';

import { Avatar } from '-/components/Avatar';
import { Divider } from '-/components/Divider';
import { ListItem } from '-/components/ListItem';
import { Switch } from '-/components/Switch';
import { ComponentExampleFn } from '-/utils/demo';

import { ElementProps } from '../..';

import { MenuProps } from '.';

export const MenuExample: ComponentExampleFn<ElementProps<MenuProps, 'div'> & { 'data-dark-mode': boolean }> = ({
    action,
}) => ({
    render: ({ props, Component, setState }) => {
        return (
            <Component
                {...props}
                aria-label="Settings Menu"
                floating={false}
                portal={false}
                style={{ padding: 'var(--spacing-sizing-02) var(--spacing-sizing-02)' }}
            >
                <ListItem
                    label="Michael Scott"
                    leading={<Avatar image="/profile2.jpg" name="Michael Scott" />}
                    subText="michael.scott@email.com"
                />
                <Divider inset={2} padding />
                <ListItem href="#/my-profile" label="My profile" leading={<SvgAccountCircle />} />
                <ListItem href="#/settings" label="Settings" leading={<SvgSettings />} />
                <ListItem
                    label="Dark mode"
                    leading={props['data-dark-mode'] ? <SvgDarkModeFill /> : <SvgDarkMode />}
                    role="checkbox"
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
                />
            </Component>
        );
    },
    disableProps: ['floating', 'portal'],
});
