import './button.scss';
import { ElementType, ReactNode, isValidElement } from 'react';

import { Tooltip } from './Tooltip';
import { isValidIcon } from './utils/children';
import { useErrorLogger } from './utils/errors';

import { ButtonSize, CommonProps, ElementProps } from './';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type ButtonProps<As extends ElementType = 'button'> = CommonProps<'disabled'> & {
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
    /** The function to call when the button is clicked. */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
        // showLabel: showLabelProp = true,
        showLabel = true,
        toolTip: toolTipProp,
        children,
        ...containerProps
    } = props;
    const label = typeof children === 'string' ? children : labelProp || '';

    // ignore showLabel=false if there is no icon
    const hideLabel = showLabel === false && icon;
    const toolTip = toolTipProp || (hideLabel ? label : undefined);
    const { logError } = useErrorLogger();
    logError(!!icon && !isValidIcon(icon), 'Button - The icon prop must be a valid icon element.');
    logError(!label, 'Button - The button must have a label.');

    const button = (
        <As
            {...containerProps}
            aria-label={label}
            data-bspk="button"
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
