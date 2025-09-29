import './list-item.scss';
import {
    AnchorHTMLAttributes,
    ElementType,
    ReactNode,
    MouseEvent,
    AriaAttributes,
    HTMLAttributes,
    AriaRole,
} from 'react';
import { ListItemButton } from './ListItemButton';
import { Truncated } from '-/components/Truncated';
import { useId } from '-/hooks/useId';
import { CommonProps, ElementProps, SetRef } from '-/types/common';

export type ListItemProps<As extends ElementType = ElementType> = CommonProps<
    'active' | 'disabled' | 'owner' | 'readOnly'
> &
    Pick<AriaAttributes, 'aria-label'> & {
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
         * Leading elements should only be one of the following [Icon](/icons), Img, Avatar.
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
         * Trailing elements should only be one of the following [Icon](/icons), Checkbox, ListItemButton, Radio,
         * Switch, Tag, Txt.
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
        innerRef?: SetRef<HTMLElement>;
        /**
         * The ARIA role of the list item.
         *
         * The role will be set to 'button' automatically if the ListItem has an onClick prop and is not a button,
         * label, or anchor element.
         *
         * If including other focusable elements (e.g. buttons, links) in the leading or trailing slots, the role should
         * be set explicitly to something other than 'button'.
         */
        role?: AriaRole;
        /** Callback function that is called when the ListItem is clicked. */
        onClick?: (event: MouseEvent<HTMLElement>) => void;
        /**
         * The unique ID of the list item.
         *
         * If not provided, a unique ID will be generated. This is useful for accessibility and testing purposes.
         */
        id?: string;
        /**
         * Whether to hide the label from screen readers. Use this when the label is redundant with other context, such
         * as within a ListItemMenu or Label.
         *
         * @default false
         */
        hideAriaLabel?: boolean;
        /**
         * Indicates the current "selected" state of the list item when used in a selectable context, such as within a
         * ListItemMenu.
         */
        'aria-selected'?: boolean;
    };

/**
 * A hybrid interactive component that is used frequently to organize content and offers a wide range of control and
 * navigation in most experiences.
 *
 * With its flexible and simple structure, the list item element is core and can meet the needs of many uses cases.
 *
 * The ListItem has three main elements: leading element, label, and trailing element.
 *
 * Leading elements should be one of the following [Icon](/icons), Img, Avatar.
 *
 * Trailing elements should be one of the following [Icon](/icons), Checkbox, ListItemButton, Radio, Switch, Tag, Txt.
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
function ListItem<As extends ElementType = ElementType>({
    active,
    as,
    disabled,
    innerRef,
    label,
    leading,
    readOnly,
    owner,
    role: roleProp,
    subText,
    trailing,
    id: idProp,
    'aria-label': ariaLabel,
    'aria-selected': ariaSelected,
    hideAriaLabel,
    ...props
}: ElementProps<ListItemProps<As>, As>) {
    const id = useId(idProp);

    if (!label) return null;

    const As = asLogic(as, props);
    const role = roleLogic(roleProp, { as: As, props });
    const actionable = (props.href || props.onClick) && !props.disabled && !props.readOnly;

    return (
        <As
            {...props}
            aria-disabled={disabled || undefined}
            aria-label={ariaLabel || undefined}
            aria-selected={ariaSelected}
            data-action={actionable || undefined}
            data-active={active || undefined}
            data-bspk="list-item"
            data-bspk-owner={owner || undefined}
            data-readonly={readOnly || undefined}
            id={id}
            ref={innerRef}
            role={role}
            tabIndex={props.tabIndex || (actionable ? 0 : undefined)}
        >
            {leading && (
                <span aria-hidden data-leading>
                    {leading}
                </span>
            )}
            <span aria-hidden={hideAriaLabel ? true : undefined} data-item-label>
                <Truncated data-text>{label}</Truncated>
                {subText && <span data-sub-text>{subText}</span>}
            </span>
            {trailing && <span data-trailing>{trailing}</span>}
        </As>
    );
}

ListItem.Button = ListItemButton;

export { ListItem };

function asLogic<As extends ElementType>(as: As | undefined, props: Partial<ListItemProps>): ElementType {
    if (as) return as;
    if (props.href) return 'a';
    return 'div';
}

function roleLogic(
    existingRole: AriaRole | undefined,
    {
        as: As,
        props,
    }: {
        as: ElementType;
        props: Partial<ListItemProps>;
    },
): HTMLAttributes<HTMLElement>['role'] | undefined {
    if (existingRole) return existingRole;

    if (props.href) return As !== 'a' ? 'link' : undefined;

    if (props.onClick && As !== 'button' && As !== 'label') return 'button';

    return undefined;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
