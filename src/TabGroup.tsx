import { css } from '@emotion/react';
import { ReactNode } from 'react';

import { Badge } from './Badge';
import { useNavOptions } from './hooks/useNavOptions';

import { ElementProps } from './';

export type TabGroupOption = {
    /**
     * The label of the tab. This is the text that will be displayed on the tab.
     *
     * @required
     */
    label: string;
    /**
     * Determines if the element is [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled).
     *
     * @default false
     */
    disabled?: boolean;
    /** The value of the tab. If not provided, the label will be used as the value. */
    value?: string;
    /** The icon to display on the left side of the tab. */
    icon?: ReactNode;
    /** The icon to display on the left side of the tab when the tab is active. */
    iconActive?: ReactNode;
    /** The badge count to display on the tab. */
    badge?: number;
};

export type TabGroupProps = {
    /**
     * The tabs to display. Each tab has a label and an optional leading icon.
     *
     * @type TabGroupOption[]
     * @required
     */
    options: TabGroupOption[];
    /** The id of the selected tab. */
    value?: TabGroupOption['value'];
    /**
     * The function to call when the tab is clicked.
     *
     * @required
     */
    onChange: (tabId: TabGroupOption['value']) => void;
    /**
     * The size of the tabs.
     *
     * @default medium
     */
    size?: 'large' | 'medium' | 'small';
    /**
     * When 'fill' the options will fill the width of the container. When 'hug', the options will be as wide as their
     * content.
     *
     * @default hug
     */
    width?: 'fill' | 'hug';
    /**
     * When width is 'hug' this determines if the trailing underline should be showing. When width is 'fill' this
     * property isn't applicable.
     *
     * @default false
     */
    showTrail?: boolean;
};

/**
 * Navigation tool that organizes content across different screens and views.
 *
 * @name TabGroup
 */
function TabGroup({
    //
    onChange: onTabChange,
    value,
    size = 'medium',
    options,
    width = 'hug',
    showTrail = false,
    ...containerProps
}: ElementProps<TabGroupProps, 'div'>) {
    const items = useNavOptions(options);

    return (
        <div
            {...containerProps}
            css={style}
            data-hide-trail={(width === 'hug' && !showTrail) || undefined}
            data-size={size}
            data-tab-group
            data-width={width}
        >
            {items.map((item) => {
                const isActive = item.value === value;

                return (
                    <button
                        data-active={isActive || undefined}
                        disabled={item.disabled || undefined}
                        key={item.value}
                        onClick={() => onTabChange(item.value)}
                    >
                        <span>
                            {(isActive && item.iconActive) || item.icon}
                            {item.label}
                            {item.badge && <Badge count={item.badge} size="x-small" />}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

TabGroup.bspkName = 'TabGroup';

export { TabGroup };

export const style = css`
    display: flex;
    flex-direction: row;
    width: fit-content;
    --btn-flex-grow: 0;
    border-bottom: 1px solid var(--stroke-neutral-low);
    width: 100%;

    &[data-width='fill'] {
        align-items: stretch;
        width: 100%;
        --btn-flex-grow: 1;
    }

    --font: var(--labels-base);
    --height: var(--spacing-sizing-10);

    &[data-size='small'] {
        --font: var(--labels-small);
        --height: var(--spacing-sizing-08);
    }

    &[data-size='large'] {
        --font: var(--labels-large);
        --height: var(--spacing-sizing-12);
    }

    button {
        border: 0;
        cursor: pointer;
        color: var(--foreground-neutral-on-surface-variant-02);
        background: none;
        flex-grow: var(--btn-flex-grow);
        font: var(--font);

        &:hover {
            background: var(--interactions-neutral-hover-opacity);
        }

        &:active {
            background: var(--interactions-neutral-press-opacity);
        }

        &:disabled {
            pointer-events: none;
            color: var(--foreground-neutral-disabled-on-surface);
        }

        &:focus-visible {
            outline: solid 2px var(--stroke-neutral-focus);
        }

        span {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 0 var(--spacing-sizing-04);
            height: var(--height);
            justify-content: center;
            position: relative;
            gap: var(--spacing-sizing-02);

            svg {
                width: var(--spacing-sizing-05);
            }
        }

        &[data-active] {
            color: var(--foreground-brand-primary);
            span {
                &:after {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 2px;
                    background-color: var(--stroke-brand-primary);
                    bottom: -1px;
                    position: absolute;
                    border-top-right-radius: 2px;
                    border-top-left-radius: 2px;
                }

                svg {
                    color: var(--surface-brand-primary);
                }
            }
        }
    }

    &[data-hide-trail] {
        border-bottom: none;
        button {
            border-bottom: 1px solid var(--stroke-neutral-low);
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
