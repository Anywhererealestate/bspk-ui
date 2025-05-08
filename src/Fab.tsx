import { css } from '@emotion/react';
import { ElementType } from 'react';

import { ButtonProps } from './Button';
import { Tooltip } from './Tooltip';
import { isValidIcon } from './utils/children';
import { useErrorLogger } from './utils/errors';

import { ElementProps } from './';

export type FabVariant = 'neutral' | 'primary' | 'secondary';

export type FabProps<As extends ElementType = 'button'> = Pick<
    ButtonProps<As>,
    'as' | 'icon' | 'onClick' | 'showLabel' | 'toolTip'
> &
    Required<Pick<ButtonProps<As>, 'label'>> & {
        /**
         * The size of the button.
         *
         * @default small
         */
        size?: 'medium' | 'small';
        /**
         * The style variant of the button.
         *
         * @default primary
         */
        variant?: FabVariant;
        /**
         * The placement of the button on the container.
         *
         * @default bottom-right
         */
        placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
        /**
         * The container to render the button in.
         *
         * @default local
         */
        container?: 'local' | 'page';
    };

/**
 * A button that highlights a primary action that is elevated above the body content of a page; normally fixed to the
 * bottom right of a screen.
 *
 * @name Fab
 */
function Fab<As extends ElementType = 'button'>({
    size = 'small',
    variant = 'primary',
    showLabel: showLabelProp = true,
    as,
    placement = 'bottom-right',
    container = 'local',
    label,
    icon,
    toolTip,
    ...otherProps
}: ElementProps<FabProps<As>, As>) {
    // ignore showLabel=false if there is no icon
    const hideLabel = showLabelProp === false && icon;

    const { logError } = useErrorLogger();
    logError(!!icon && !isValidIcon(icon), 'Button - The icon prop must be a valid icon element.');

    const As: ElementType = as || 'button';

    const button = (
        <As
            {...otherProps}
            aria-label={label}
            css={style}
            data-container={container}
            data-fab
            data-placement={placement}
            data-round={hideLabel || undefined}
            data-size={size}
            data-variant={variant}
        >
            {!!icon && <span data-fab-icon>{icon}</span>}
            {!hideLabel && <span data-fab-label>{label}</span>}
        </As>
    );

    return toolTip || hideLabel ? (
        <Tooltip label={toolTip || label} placement="top">
            {button}
        </Tooltip>
    ) : (
        button
    );
}

Fab.bspkName = 'Fab';

export { Fab };

export const style = css`
    --placement-offset: var(--spacing-sizing-04);

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
    z-index: var(--z-index-fab);
    box-shadow: var(--drop-shadow-float);
    border-radius: var(--radius-small);

    &[data-container='page'] {
        position: fixed;
    }

    &[data-container='local'] {
        position: absolute;
    }

    &[data-placement='top-right'] {
        top: var(--placement-offset);
        right: var(--placement-offset);
    }

    &[data-placement='bottom-right'] {
        bottom: var(--placement-offset);
        right: var(--placement-offset);
    }

    &[data-placement='top-left'] {
        top: var(--placement-offset);
        left: var(--placement-offset);
    }

    &[data-placement='bottom-left'] {
        bottom: var(--placement-offset);
        left: var(--placement-offset);
    }

    > [data-fab-icon] {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    > [data-fab-label] {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    &[data-size='small'] {
        font: var(--labels-base);
        height: var(--spacing-sizing-10);
        padding: 0 var(--spacing-sizing-04);

        > [data-fab-icon] {
            width: var(--spacing-sizing-05);
        }
    }

    &[data-size='medium'] {
        font: var(--labels-large);
        height: var(--spacing-sizing-14);
        padding: 0 var(--spacing-sizing-07);

        > [data-fab-icon] {
            width: var(--spacing-sizing-06);
        }
    }

    &[data-variant='primary'] {
        --variant-background: var(--surface-brand-primary);
        --variant-foreground: var(--foreground-brand-on-primary);
    }

    &[data-variant='secondary'] {
        --variant-background: var(--surface-brand-secondary);
        --variant-foreground: var(--foreground-brand-on-secondary);
    }

    &[data-variant='neutral'] {
        --variant-background: var(--surface-neutral-t1-base);
        --variant-foreground: var(--foreground-neutral-on-surface-variant-01);
    }

    background: var(--variant-background);
    color: var(--variant-foreground);
    --variant-gradient: linear-gradient(var(--variant-background), var(--variant-background));

    [data-pseudo='hover'] > &,
    &:hover {
        background:
            linear-gradient(var(--interactions-brand-hover-opacity), var(--interactions-brand-hover-opacity)),
            var(--variant-gradient);
    }

    [data-pseudo='active'] > &,
    &:active {
        background:
            linear-gradient(var(--interactions-brand-press-opacity), var(--interactions-brand-press-opacity)),
            var(--variant-gradient);
    }

    [data-pseudo='focus'] > &,
    &:focus-visible {
        outline: solid 2px var(--stroke-neutral-focus);
    }

    &[data-round] {
        border-radius: var(--radius-circular);
        aspect-ratio: 1/1;
        padding: 0;
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
