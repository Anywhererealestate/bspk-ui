import { AnchorHTMLAttributes, ElementType, ReactNode } from 'react';
import { ListItemButton } from './ListItemButton';
import { Truncated } from '-/components/Truncated';
import { CommonProps, ElementAttributes, SetRef } from '-/types/common';

import './list-item.scss';

export type ListItemProps<As extends ElementType = 'div'> = ElementAttributes<
    As,
    CommonProps<'active' | 'disabled' | 'id' | 'owner' | 'readOnly' | 'tabIndex'> & {
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
         * Trailing elements may only be one of the following [Icon](/icons), Checkbox, ListItemButton, Radio, Switch,
         * Tag, Txt.
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
        innerRef?: SetRef<As>;
        /** The ARIA role of the list item. */
        role?: string;
        /** Whether the aria-label should be included on the list item. */
        includeAriaLabel?: boolean;
        /** The function to call when the list item is clicked. */
        onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    }
>;

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
function ListItem<As extends ElementType = 'div'>({
    includeAriaLabel = true,
    active,
    as,
    disabled,
    innerRef,
    label,
    leading,
    readOnly,
    owner,
    role,
    subText,
    trailing,
    attr,
    href,
    onClick,
    id,
    tabIndex,
}: ListItemProps<As>) {
    if (!label) return null;

    let As = as || 'div';

    if (!as) {
        if (href) As = 'a';
        else if (onClick) As = 'button';
    }

    const actionable = (As === 'a' || As === 'button') && !disabled && !readOnly;

    return (
        <As
            {...attr}
            aria-disabled={disabled || undefined}
            aria-label={
                As === 'label' || As === 'span' || As === 'div' || includeAriaLabel === false ? undefined : label
            }
            as={As}
            data-action={actionable || undefined}
            data-active={active || undefined}
            data-bspk="list-item"
            data-bspk-owner={owner || undefined}
            data-readonly={readOnly || undefined}
            id={id}
            ref={innerRef}
            role={role || (As === 'button' ? 'option' : undefined)}
            tabIndex={tabIndex || (actionable ? 0 : undefined)}
        >
            {leading && (
                <span aria-hidden data-leading>
                    {leading}
                </span>
            )}
            <span data-item-label>
                <Truncated data-text>{label}</Truncated>
                {subText && <span data-sub-text>{subText}</span>}
            </span>
            {trailing && <span data-trailing>{trailing}</span>}
        </As>
    );
}

ListItem.Button = ListItemButton;

export { ListItem };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
