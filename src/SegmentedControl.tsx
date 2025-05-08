import { css } from '@emotion/react';
import { Fragment } from 'react';

import { Tooltip } from './Tooltip';
import { useNavOptions } from './hooks/useNavOptions';

import { ElementProps } from './';

export type SegmentedToggleOption = {
    /**
     * The label of the option. This is the text that will be displayed on the option.
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
    /** The value of the option. If not provided, the label will be used as the value. */
    value?: string;
    /** The the icon to display before the label. */
    icon?: React.ReactNode;
    iconActive?: React.ReactNode;
};

export type SegmentedControlProps = {
    /**
     * The options to display. Each option has a label and an optional leading icon.
     *
     * @type SegmentedToggleOption[]
     * @required
     */
    options: SegmentedToggleOption[];
    /** The id of the selected option. */
    value?: SegmentedToggleOption['value'];
    /**
     * The function to call when the option is clicked.
     *
     * @required
     */
    onChange: (value: SegmentedToggleOption['value']) => void;
    /**
     * The size of the options.
     *
     * @default medium
     */
    size?: 'medium' | 'small';
    /**
     * The width of the options. If set to 'fill', the options will fill the width of the container. If set to 'hug',
     * the options will be as wide as their content.
     *
     * @default hug
     */
    width?: 'fill' | 'hug';
    /**
     * Determines if the labels of the options should be displayed. If icons are not provided for every option this is
     * ignored and labels are shown.
     *
     * @default true
     */
    showLabels?: boolean;
};

/**
 * Navigation tool that organizes content across different screens and views.
 *
 * @name SegmentedControl
 */
function SegmentedControl({
    onChange,
    value,
    size = 'medium',
    options,
    width = 'hug',
    showLabels: showLabelsProp = true,
    ...containerProps
}: ElementProps<SegmentedControlProps, 'div'>) {
    const items = useNavOptions(options);

    const hideLabels = showLabelsProp === false && items.every((item) => item.icon && item.label);

    return (
        <div {...containerProps} css={style} data-option-group data-size={size} data-width={width}>
            {items.map((item, index) => {
                const isActive = item.value === value;
                return (
                    <Fragment key={item.value}>
                        <Tooltip disabled={!hideLabels} label={item.label} placement="top">
                            <button
                                aria-label={item.label}
                                data-first={index === 0 || undefined}
                                data-last={index === items.length - 1 || undefined}
                                data-selected={isActive || undefined}
                                disabled={item.disabled || undefined}
                                onClick={() => onChange(item.value)}
                            >
                                <span data-outer>
                                    <span data-inner>
                                        {(isActive && item.iconActive) || item.icon}
                                        {!hideLabels && item.label}
                                    </span>
                                </span>
                            </button>
                        </Tooltip>
                    </Fragment>
                );
            })}
        </div>
    );
}

SegmentedControl.bspkName = 'SegmentedControl';

export { SegmentedControl };

export const style = css`
    display: flex;
    flex-direction: row;
    max-width: 100%;
    --outer-height: var(--spacing-sizing-10);
    --inner-height: var(--spacing-sizing-08);
    --svg-width: 20px;

    &[data-width='fill'] {
        align-items: stretch;
        width: 100%;
        --btn-flex-grow: 1;
        margin: 0 var(--spacing-sizing-04);
    }

    &[data-width='hug'] {
        width: fit-content;
        --btn-flex-grow: 0;
    }

    &[data-size='small'] {
        --outer-height: var(--spacing-sizing-08);
        --inner-height: var(--spacing-sizing-06);
        --svg-width: 16px;
    }

    svg {
        width: var(--svg-width) !important;
    }

    button {
        border: 0;
        cursor: pointer;
        color: var(--foreground-neutral-on-surface);
        flex-grow: var(--btn-flex-grow);
        font: var(--labels-small);
        margin: 0;
        height: var(--spacing-sizing-12);
        background: transparent;
        position: relative;

        [data-focus-ring] {
            display: none;
        }

        [data-outer] {
            height: var(--outer-height);
            background: var(--surface-neutral-t3-low);
            margin: var(--spacing-sizing-01) 0;
            padding: var(--spacing-sizing-01) 0;
            display: block;
        }

        [data-inner] {
            display: flex;
            flex-direction: row;
            align-items: center;
            height: var(--inner-height);
            border-bottom: 1px solid transparent;
            justify-content: center;
            gap: var(--spacing-sizing-01);
            border-radius: var(--radius-small);
            padding: var(--spacing-sizing-02) var(--spacing-sizing-03);
        }

        &:first-of-type {
            [data-outer] {
                border-top-left-radius: var(--radius-medium);
                border-bottom-left-radius: var(--radius-medium);
                padding-left: var(--spacing-sizing-01);
            }
        }

        &:last-of-type {
            [data-outer] {
                border-top-right-radius: var(--radius-medium);
                border-bottom-right-radius: var(--radius-medium);
                padding-right: var(--spacing-sizing-01);
            }
        }

        &:not(:disabled) {
            &:hover {
                [data-inner] {
                    background: var(--interactions-neutral-hover-opacity);
                }
            }

            &:active {
                [data-inner] {
                    background: var(--interactions-neutral-press-opacity);
                }
            }

            &[data-selected] {
                [data-inner] {
                    background: var(--surface-neutral-t1-base);
                }
            }

            &:focus-visible {
                z-index: 2;
                outline: solid 2px var(--stroke-neutral-focus);
            }
        }

        &:disabled {
            pointer-events: none;
            color: var(--foreground-neutral-disabled-on-surface);
            cursor: not-allowed;
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
