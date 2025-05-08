import { css } from '@emotion/react';
import { ElementType, isValidElement, ReactNode } from 'react';

import { Tooltip } from './Tooltip';
import { isValidIcon } from './utils/children';
import { useErrorLogger } from './utils/errors';

import { ButtonSize, CommonProps, ElementProps } from './';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type ButtonProps<As extends ElementType = 'button'> = CommonProps<'disabled' | 'onClick'> & {
    /** The label of the button. */
    label?: string;
    /** The icon of the button. */
    icon?: ReactNode;
    /**
     * Shows the button label. When label isn't showing it is used in a tooltip and as the aria-label prop.
     *
     * @default true
     */
    showLabel?: boolean;
    /**
     * The element type to render as.
     *
     * @default button
     * @type ElementType
     */
    as?: As;
    /**
     * The function of the button is destructive.
     *
     * @default false
     */
    destructive?: boolean;
    /**
     * The size of the button.
     *
     * @default medium
     */
    size?: ButtonSize;
    /**
     * The color variant of the button.
     *
     * @default primary
     */
    variant?: ButtonVariant;
    /**
     * The width of the button.
     *
     * @default hug
     */
    width?: 'fill' | 'hug';
    /**
     * If `string` is passed, it will be used as the label.
     *
     * If `ReactNode` is passed, it will override the default button content. (Not recommended)
     */
    children?: ReactNode;
    /** The tool tip text that appears when hovered. */
    toolTip?: string;
};

/**
 * A clickable component that allows users to perform an action, make a choice or trigger a change in state.
 *
 * @name Button
 */
function Button<As extends ElementType = 'button'>(props: ElementProps<ButtonProps<As>, As>): JSX.Element {
    const {
        size = 'medium',
        variant = 'primary',
        destructive = false,
        width = 'hug',
        as: As = 'button',
        disabled = false,
        label: labelProp,
        icon,
        showLabel: showLabelProp = true,
        toolTip: toolTipProp,
        children,
        ...containerProps
    } = props;
    const label = typeof children === 'string' ? children : labelProp || '';

    // ignore showLabel=false if there is no icon
    const hideLabel = showLabelProp === false && icon;

    const toolTip = toolTipProp || hideLabel ? label : undefined;

    const { logError } = useErrorLogger();
    logError(!!icon && !isValidIcon(icon), 'Button - The icon prop must be a valid icon element.');
    logError(!label, 'Button - The button must have a label.');

    const button = (
        <As
            {...containerProps}
            aria-label={label}
            css={style}
            data-button=""
            data-destructive={destructive || undefined}
            data-size={size}
            data-variant={variant}
            data-width={width}
            disabled={disabled || undefined}
        >
            {children && typeof children !== 'string' ? (
                children
            ) : (
                <>
                    <span data-touch-target />
                    {!!icon && isValidElement(icon) && <span data-button-icon>{icon}</span>}
                    {!hideLabel && <span data-button-label>{label}</span>}
                </>
            )}
        </As>
    );

    if (toolTip) {
        return (
            <Tooltip label={toolTip} placement="top">
                {button}
            </Tooltip>
        );
    }

    return button;
}

Button.bspkName = 'Button';

export { Button };

export const style = css`
    &,
    &:is(a) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sizing-02);
        border: none;
        cursor: pointer;
        box-sizing: border-box;
        background: transparent;
        text-decoration: none;
        width: fit-content;
        position: relative;

        [data-touch-target] {
            min-width: var(--spacing-sizing-12);
            min-height: var(--spacing-sizing-12);
        }

        &[data-width='hug'] {
            width: fit-content;
        }

        &[data-width='fill'] {
            width: 100%;
        }

        &[data-size='x-small'] {
            font-size: var(--typography-size-xs);
            line-height: var(--typography-line-height-lh-1);
            height: var(--spacing-sizing-06);
            min-width: var(--spacing-sizing-06);
            gap: var(--spacing-sizing-02);

            &:has([data-button-label]),
            &[data-override] {
                padding: 0 var(--spacing-sizing-02);
            }

            > [data-button-icon] {
                width: var(--spacing-sizing-04);
                height: var(--spacing-sizing-04);
            }
        }

        &[data-size='small'] {
            font-size: var(--typography-size-sm);
            line-height: var(--typography-line-height-lh-2);
            height: var(--spacing-sizing-08);
            min-width: var(--spacing-sizing-08);

            &:has([data-button-label]),
            &[data-override] {
                padding: 6px var(--spacing-sizing-04);
            }

            > [data-button-icon] {
                width: var(--spacing-sizing-05);
                height: var(--spacing-sizing-05);
            }
        }

        &[data-size='medium'] {
            font-size: var(--typography-size-base);
            line-height: var(--typography-line-height-lh-2);
            height: var(--spacing-sizing-10);
            min-width: var(--spacing-sizing-10);

            &:has([data-button-label]),
            &[data-override] {
                padding: var(--spacing-sizing-02) var(--spacing-sizing-04);
            }

            > [data-button-icon] {
                width: var(--spacing-sizing-05);
                height: var(--spacing-sizing-05);
            }
        }
        &[data-size='large'] {
            font-size: var(--typography-size-bp-md);
            line-height: var(--typography-line-height-lh-4);
            height: var(--spacing-sizing-12);
            min-width: var(--spacing-sizing-12);

            &:has([data-button-label]),
            &[data-override] {
                padding: var(--spacing-sizing-03) var(--spacing-sizing-04);
            }

            > [data-button-icon] {
                width: var(--spacing-sizing-06);
                height: var(--spacing-sizing-06);
            }
        }

        &[disabled] {
            cursor: not-allowed;
        }

        > [data-button-icon] {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        > [data-button-label] {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        &[data-variant='primary'] {
            --primary-background: var(--surface-brand-primary);

            background: linear-gradient(var(--primary-background), var(--primary-background));
            color: var(--foreground-brand-on-primary);
            border-radius: var(--radius-small);

            &[disabled] {
                color: var(--foreground-neutral-disabled-on-surface);
                background: var(--interactions-disabled-opacity);
            }

            &:not([disabled]) {
                [data-pseudo='hover'] > &,
                &:hover {
                    background:
                        linear-gradient(
                            var(--interactions-brand-hover-opacity),
                            var(--interactions-brand-hover-opacity)
                        ),
                        linear-gradient(var(--primary-background), var(--primary-background));
                }

                [data-pseudo='active'] > &,
                &:active {
                    background:
                        linear-gradient(
                            var(--interactions-brand-press-opacity),
                            var(--interactions-brand-press-opacity)
                        ),
                        linear-gradient(var(--primary-background), var(--primary-background));
                }

                [data-pseudo='focus'] > &,
                &:focus-visible {
                    outline: solid 2px var(--stroke-neutral-focus);
                }
            }

            &[data-destructive] {
                --primary-background: var(--status-error);
                color: var(--foreground-brand-on-primary);
            }
        }

        &[data-variant='secondary'] {
            border: solid 1px var(--stroke-neutral-base);
            border-radius: var(--radius-small);
            color: var(--foreground-neutral-on-surface-variant-01);

            &[disabled] {
                color: var(--foreground-neutral-disabled-on-surface);
                border: solid 1px var(--stroke-neutral-disabled-light);
            }

            &:not([disabled]) {
                [data-pseudo='hover'] > &,
                &:hover {
                    background-color: var(--interactions-neutral-hover-opacity);
                }

                [data-pseudo='active'] > &,
                &:active {
                    background-color: var(--interactions-neutral-press-opacity);
                }

                [data-pseudo='focus'] > &,
                &:focus-visible {
                    outline: solid 2px var(--stroke-neutral-focus);
                }
            }

            &[data-destructive] {
                background: transparent;
                color: var(--status-error);
                border: solid 1px var(--status-error);
            }
        }

        &[data-variant='tertiary'] {
            background: transparent;
            color: var(--foreground-neutral-on-surface-variant-01);

            &[disabled] {
                color: var(--foreground-neutral-disabled-on-surface);
            }

            &:not([disabled]) {
                [data-pseudo='hover'] > &,
                &:hover {
                    background: var(--interactions-neutral-hover-opacity);
                }

                [data-pseudo='active'] > &,
                &:active {
                    background: var(--interactions-neutral-press-opacity);
                }

                [data-pseudo='focus'] > &,
                &:focus-visible {
                    outline: solid 2px var(--stroke-neutral-focus);
                }
            }

            &[data-destructive] {
                color: var(--status-error);
            }
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
