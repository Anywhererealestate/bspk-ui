import './fab.scss';
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
 * @example
 *     import { SvgBolt } from '@bspk/icons/Bolt';
 *     import { Fab } from '@bspk/ui/Fab';
 *
 *     export function Example() {
 *         return <Fab icon={<SvgBolt />} label="Example label" placement="bottom-right" variant="neutral" />;
 *     }
 *
 * @name Fab
 * @phase DesignReview

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
            data-bspk="fab"
            data-container={container}
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
