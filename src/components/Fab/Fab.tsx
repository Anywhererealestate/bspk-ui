import './fab.scss';
import { AriaAttributes, ElementType, isValidElement } from 'react';
import { ButtonProps } from '-/components/Button';
import { Tooltip, TooltipTriggerProps } from '-/components/Tooltip';
import { ElementProps } from '-/types/common';

export type FabVariant = 'neutral' | 'primary' | 'secondary';

export type FabProps<As extends ElementType = 'button'> = Pick<
    ButtonProps<As>,
    'as' | 'icon' | 'iconOnly' | 'onClick' | 'toolTip'
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
 * @phase UXReview
 */
export function Fab<As extends ElementType = 'button'>(props: AriaAttributes & ElementProps<FabProps<As>, As>) {
    const {
        size = 'small',
        variant = 'primary',
        iconOnly: iconOnlyProp = false,
        as: As = 'button',
        placement = 'bottom-right',
        container = 'local',
        label,
        icon,
        toolTip,
        ...otherProps
    } = props;

    // ignore iconOnly=true if there is no icon
    const iconOnly = iconOnlyProp === true && !!icon;

    const button = (triggerProps: TooltipTriggerProps) => (
        <As
            {...otherProps}
            aria-describedby={triggerProps['aria-describedby'] || otherProps['aria-describedby']}
            aria-label={label}
            data-bspk="fab"
            data-container={container}
            data-placement={placement}
            data-round={iconOnly || undefined}
            data-size={size}
            data-variant={variant}
            onBlur={(e) => {
                triggerProps.onBlur?.();
                otherProps.onBlur?.(e);
            }}
            onFocus={(e) => {
                triggerProps.onFocus?.();
                otherProps.onFocus?.(e);
            }}
            onMouseLeave={(e) => {
                triggerProps.onMouseLeave?.();
                otherProps.onMouseLeave?.(e);
            }}
            onMouseOver={(e) => {
                triggerProps.onMouseOver?.();
                otherProps.onMouseOver?.(e);
            }}
        >
            {!!icon && isValidElement(icon) && (
                <span aria-hidden={true} data-fab-icon>
                    {icon}
                </span>
            )}
            {!iconOnly && <span data-fab-label>{label}</span>}
        </As>
    );

    if (toolTip || iconOnly)
        return (
            <Tooltip label={toolTip || label} placement="top">
                {button}
            </Tooltip>
        );

    return button({});
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
