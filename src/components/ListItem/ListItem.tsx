import { AnchorHTMLAttributes, ElementType, ReactNode } from 'react';
import { ListItemButton } from './ListItemButton';
import { Truncated } from '-/components/Truncated';
import { CommonProps, ElementProps, SetRef } from '-/types/common';
import { ChildElement, getChildrenElements } from '-/utils/children';
import { useErrorLogger } from '-/utils/errors';

import './list-item.scss';

type SubComponentName =
    | 'Avatar'
    | 'Checkbox'
    | 'Icon'
    | 'Img'
    | 'ListItemButton'
    | 'Radio'
    | 'string'
    | 'Switch'
    | 'Tag'
    | 'Txt';

export const LEADING_COMPONENTS: SubComponentName[] = ['Icon', 'Img', 'Avatar'] as const;

export const TRAILING_COMPONENTS: SubComponentName[] = [
    'ListItemButton',
    'Checkbox',
    'Icon',
    'Radio',
    'Switch',
    'Tag',
    'Txt',
    'string',
] as const;

const TRAILING_COMPONENTS_ACTIONABLE: SubComponentName[] = ['ListItemButton', 'Checkbox', 'Radio', 'Switch'] as const;

export type ListItemProps<As extends ElementType = 'div', T = HTMLElement> = CommonProps<
    'active' | 'disabled' | 'readOnly'
> & {
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
     *
     * @exampleType select
     * @options Icon, Img, Avatar
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
     * @exampleType select
     * @options Checkbox, Icon, ListItemButton, Radio, Switch, Tag, Txt
     */
    trailing?: ReactNode;
    /**
     * The [href](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#href) of the list item.
     *
     * If the href is provided, the ListItem will render as an anchor element (`<a>`).
     */
    href?: AnchorHTMLAttributes<unknown>['href'];
    /** A ref to the list item div element. */
    innerRef?: SetRef<T>;
    /**
     * Whether the ListItem is selected.
     *
     * @default false
     */
    selected?: boolean;
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
 * @example
 *     import { SvgSquare } from '@bspk/icons/Square';
 *     import { ListItem } from '@bspk/ui/ListItem';
 *
 *     export function Example() {
 *         return (
 *             <ListItem
 *                 label="Example label"
 *                 leading={<SvgSquare />}
 *                 subText="Example subtest"
 *                 trailing={<ListItem.Button label="Click me" onClick={() => console.log('Hello world')} />}
 *             />
 *         );
 *     }
 *
 * @name ListItem
 * @phase UXReview
 */
function ListItem<As extends ElementType = 'div', T = HTMLElement>(props: ElementProps<ListItemProps<As, T>, As>) {
    const { label, disabled, selected, readOnly, active, innerRef, subText, ...rest } = props;

    const { As, leading, trailing, actionable } = useListItemLogic(props);

    if (!As) return null;

    return (
        <As
            {...rest}
            aria-disabled={disabled || undefined}
            aria-label={As === 'label' || As === 'span' || As === 'div' ? undefined : label}
            aria-selected={selected || undefined}
            data-action={actionable || undefined}
            data-active={active || undefined}
            data-bspk="list-item"
            data-component={leading?.name || undefined}
            data-readonly={readOnly || undefined}
            ref={innerRef}
            role={As === 'button' ? 'option' : undefined}
            tabIndex={actionable ? 0 : undefined}
        >
            {leading && (
                <span aria-hidden={true} data-component={leading.name} data-leading>
                    {leading.child}
                </span>
            )}
            <span data-item-label>
                <Truncated data-text>{label}</Truncated>
                {subText && <span data-sub-text>{subText}</span>}
            </span>
            {trailing && (
                <span data-component={trailing.name} data-trailing>
                    {trailing.child}
                </span>
            )}
        </As>
    );
}
ListItem.bspkName = 'ListItem';

ListItem.Button = ListItemButton;

export { ListItem };

function useListItemLogic<As extends ElementType = 'div', T = HTMLElement>({
    as,
    leading: leadingProp,
    trailing: trailingProp,
    label,
    ...props
}: ElementProps<ListItemProps<As, T>, As>): {
    As: ElementType | null;
    leading?: { child: ReactNode; name: string } | null;
    trailing?: { child: ReactNode; name: string } | null;
    actionable?: boolean;
} {
    const children = useValidChildren(leadingProp, trailingProp);
    const trailingName = (children.trailing?.name || '') as SubComponentName;

    if (!label)
        return {
            As: null,
        };

    const actionable = ('onClick' in props || 'href' in props) && !props.disabled && !props.readOnly;

    if (as)
        return {
            As: as,
            actionable,
            ...children,
        };

    // anchors
    if (props.href || as === 'a') {
        // if the trailing is focusable, we need to remove the leading
        if (TRAILING_COMPONENTS_ACTIONABLE.includes(trailingName)) children.trailing = null;
        return {
            As: 'a',
            actionable: true,
            ...children,
        };
    }

    if (props.onClick || as === 'button')
        return {
            As: 'button',
            actionable: true,
            ...children,
        };

    if (['Checkbox', 'Radio', 'Switch'].includes(trailingName))
        return {
            As: 'label',
            actionable: true,
            ...children,
        };

    if (trailingName.includes('Button'))
        return {
            As: 'div',
            actionable: false,
            ...children,
        };

    return {
        As: 'span',
        actionable,
        ...children,
    };
}

function useValidChildren(
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
        const valid = LEADING_COMPONENTS.includes(leading.name as SubComponentName);
        if (!valid) leading = null;
        logError(
            !valid,
            `ListItem - Leading child is invalid. Must be one of:${LEADING_COMPONENTS} Elements: ${leading?.name || 'None'}`,
        );
    }

    if (trailing) {
        const valid = TRAILING_COMPONENTS.includes(trailing.name as SubComponentName);
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
