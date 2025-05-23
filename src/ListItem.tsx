import './list-item.scss';
import { ElementType, ReactNode } from 'react';

import { ButtonProps, Button } from './Button';
import { ChildElement, getChildrenElements } from './utils/children';
import { useErrorLogger } from './utils/errors';

import { CommonProps, ElementProps } from './';

export const LEADING_COMPONENTS = Object.freeze(['Icon', 'Img', 'Avatar']);

export const TRAILING_COMPONENTS = Object.freeze([
    'ListItemButton',
    'Checkbox',
    'Icon',
    'Radio',
    'Switch',
    'Tag',
    'Txt',
]);

export type ListItemProps<As extends ElementType = 'div'> = CommonProps<'active' | 'disabled' | 'readOnly'> & {
    /**
     * The element type to render as.
     *
     * @default div
     * @type ElementType
     */
    as?: As;

    /**
     * The leading element to display in the ListItem.
     *
     * Leading elements may only be one of the following [Icon](/icons), Img, Avatar.
     */
    leading?: ReactNode;
    /**
     * The label to display in the ListItem.
     *
     * @required
     */
    label: string;
    /** The subtext to display in the ListItem. */
    subText?: string;
    /**
     * The trailing element to display in the ListItem.
     *
     * Trailing elements may only be one of the following [Icon](/icons), Checkbox, ListItemButton, Radio, Switch, Tag,
     * Txt.
     *
     * @type ReactNode
     */
    trailing?: ReactNode;
};

/**
 * A hybrid interactive component that is used frequently to organize content and offers a wide range of control and
 * navigation in most experiences.
 *
 * With its flexible and simple structure, the list item element is core and can meet the needs of many uses cases.
 *
 * The ListItem has three main elements: leading element, label, and trailing element.
 *
 * Leading elements may be one of the following [Icon](/icons), Img, Avatar.
 *
 * Trailing elements may be one of the following [Icon](/icons), Checkbox, ListItemButton, Radio, Switch, Tag, Txt.
 *
 * The ListItemButton is a more limited Button with context specific options.
 *
 * @subComponents ListItemButton
 *
 * @name ListItem
 */
function ListItem<As extends ElementType = 'div'>({
    as,
    disabled,
    invalid,
    leading: leadingProp,
    trailing: trailingProp,
    label,
    subText,
    active,
    readOnly,
    errorMessage,
    ...props
}: ElementProps<ListItemProps<As>, As>) {
    let As: ElementType = as || 'div';

    const { logError } = useErrorLogger();

    const { leading, trailing } = useChildren(leadingProp, trailingProp);

    if (!label) return;

    const requiredAs: ElementType[] = [];

    if ('href' in props) requiredAs.push('a');

    if (trailing?.name) {
        // if trailing is a ListItemButton and As is a button, change As to div
        if (trailing?.name === 'ListItemButton') requiredAs.push('div');
        if (['Checkbox', 'Radio', 'Switch'].includes(trailing.name)) requiredAs.push('label');
    }

    if (requiredAs.length === 1) {
        As = requiredAs[0] as ElementType;
    }

    const requiredAsError = logError(
        requiredAs.length > 1,
        `ListItem: Multiple required elements detected. Using ${As} as the element type.`,
    );

    if (requiredAsError) As = requiredAs[0] as ElementType;

    if (!As && 'onClick' in props) As = 'button';

    const actionable = ('onClick' in props || 'href' in props) && !disabled && !readOnly;

    return (
        <As
            {...props}
            aria-disabled={disabled || undefined}
            aria-errormessage={errorMessage || undefined}
            aria-invalid={invalid || undefined}
            data-action={actionable || undefined}
            data-active={active || undefined}
            data-bspk="list-item"
            data-component={leading?.name || undefined}
            data-readonly={readOnly || undefined}
            role={as !== 'button' && 'onClick' in props ? 'button' : undefined}
        >
            <span data-inner>
                {leading && (
                    <span data-component={leading.name} data-leading>
                        {leading.child}
                    </span>
                )}
                <span data-item-label>
                    <span data-text>{label}</span>
                    {subText && <span data-sub-text>{subText}</span>}
                </span>
                {trailing && (
                    <span data-component={trailing.name} data-trailing>
                        {trailing.child}
                    </span>
                )}
            </span>
        </As>
    );
}
ListItem.bspkName = 'ListItem';

/** A button that can be used as a trailing element in a ListItem. */
// eslint-disable-next-line react/no-multi-comp
function ListItemButton({ label, icon, ...buttonProps }: Pick<ButtonProps, 'icon' | 'label' | 'onClick'>) {
    return <Button icon={icon} label={label} showLabel={false} {...buttonProps} size="large" variant="tertiary" />;
}
ListItemButton.bspkName = 'ListItemButton';
ListItem.Button = ListItemButton;

export { ListItem };

function useChildren(
    leadingProp: ReactNode,
    trailingProp: ReactNode,
): {
    leading?: { child: ReactNode; name: string } | null;
    trailing?: { child: ReactNode; name: string } | null;
} {
    const { logError } = useErrorLogger();

    let leading: ChildElement | null = getChildrenElements(leadingProp)[0] || null;

    const trailingElements = getChildrenElements(trailingProp);

    let trailing: ChildElement | null = trailingElements[0] || null;

    if (leading) {
        const valid = LEADING_COMPONENTS.includes(leading.name);
        if (!valid) leading = null;
        logError(
            !valid,
            `ListItem - Leading child is invalid. Must be one of:${LEADING_COMPONENTS} Elements: ${leading?.name || 'None'}`,
        );
    }

    if (trailing) {
        const valid = TRAILING_COMPONENTS.includes(trailing.name);
        if (!valid) trailing = null;
        logError(
            !valid,
            `ListItem - Trailing child is invalid. Must be one of:${TRAILING_COMPONENTS} Elements: ${trailing?.name || 'None'}`,
        );
    }

    return {
        leading,
        trailing,
    };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
