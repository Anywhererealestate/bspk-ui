import './button.scss';
import { AriaAttributes, ElementType, ReactNode, isValidElement } from 'react';
import { Tooltip, TooltipTriggerProps } from '-/components/Tooltip';
import { ButtonSize, CommonProps, ElementProps, SetRef } from '-/types/common';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type ButtonProps<As extends ElementType = 'button'> = CommonProps<'disabled' | 'owner'> & {
    /**
     * The label of the button.
     *
     * @required
     */
    label: string;
    /**
     * The icon of the button.
     *
     * @type BspkIcon
     */
    icon?: ReactNode;
    /**
     * When true the button label is hidden and only the icon is shown. When label isn't showing it is used in a tooltip
     * and as the aria-label prop.
     *
     * Ignored if `icon` is not provided.
     *
     * @default false
     */
    iconOnly?: boolean;
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
     * Determines how the button uses horizontal space.
     *
     * If set to 'fill', options expand to fill the container's width.
     *
     * If set to 'hug', options only take up as much space as their content requires.
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
    /** The function to call when the button is clicked. */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    /** A ref to the Button element. */
    innerRef?: SetRef<HTMLButtonElement>;
};

/**
 * A clickable component that allows users to perform an action, make a choice or trigger a change in state.
 *
 * @example
 *     import { Button } from '@bspk/ui/Button';
 *     import { SvgPerson } from '@bspk/icons/Person';
 *
 *     function Example() {
 *         return (
 *             <Button
 *                 label="Click Me"
 *                 size="medium"
 *                 variant="primary"
 *                 onClick={() => console.log('Button clicked')}
 *                 icon={<SvgPerson />}
 *             />
 *         );
 *     }
 *
 * @name Button
 * @phase UXReview
 */
export function Button<As extends ElementType = 'button'>(
    props: AriaAttributes & ElementProps<ButtonProps<As>, As>,
): JSX.Element {
    const {
        size = 'medium',
        variant = 'primary',
        destructive = false,
        width = 'hug',
        as: As = 'button',
        disabled = false,
        label: labelProp,
        icon,
        iconOnly: iconOnlyProp = false,
        toolTip: toolTipProp,
        children,
        innerRef,
        owner,
        role,
        ...containerProps
    } = props;
    const label = typeof children === 'string' ? children : labelProp || '';

    // ignore iconOnly if there is no icon
    const iconOnly = iconOnlyProp === true && !!icon;

    // if toolTip text is not provided and iconOnly is true, toolTip text should be label
    const toolTip = toolTipProp || (iconOnly ? label : undefined);

    const button = (triggerProps: TooltipTriggerProps) => (
        <As
            type={As === 'button' ? 'button' : undefined}
            {...containerProps}
            {...triggerProps}
            aria-label={label}
            data-bspk="button"
            data-bspk-owner={owner || undefined}
            data-destructive={destructive || undefined}
            data-size={size}
            data-touch-target-parent
            data-variant={variant}
            data-width={width}
            disabled={disabled || undefined}
            onBlur={(e) => {
                triggerProps.onBlur?.();
                containerProps.onBlur?.(e);
            }}
            onFocus={(e) => {
                triggerProps.onFocus?.();
                containerProps.onFocus?.(e);
            }}
            onMouseLeave={(e) => {
                triggerProps.onMouseLeave?.();
                containerProps.onMouseLeave?.(e);
            }}
            onMouseOver={(e) => {
                triggerProps.onMouseOver?.();
                containerProps.onMouseOver?.(e);
            }}
            ref={innerRef}
            role={role || (As !== 'button' ? 'button' : undefined)}
        >
            {children && typeof children !== 'string' ? (
                children
            ) : (
                <>
                    {!!icon && isValidElement(icon) && (
                        <span aria-hidden={true} data-button-icon>
                            {icon}
                        </span>
                    )}
                    {!iconOnly && <span data-button-label>{label}</span>}
                </>
            )}
            <span data-touch-target />
        </As>
    );

    if (toolTip)
        return (
            <Tooltip label={toolTip} placement="top">
                {button}
            </Tooltip>
        );

    return button({});
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
