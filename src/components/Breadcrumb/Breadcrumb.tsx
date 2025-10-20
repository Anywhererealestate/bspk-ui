import './breadcrumb.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgMoreHoriz } from '@bspk/icons/MoreHoriz';
import { Button } from '-/components/Button';
import { Link } from '-/components/Link';
import { ListItem } from '-/components/ListItem';
import { Menu } from '-/components/Menu';
import { Txt } from '-/components/Txt';
import { useArrowNavigation } from '-/hooks/useArrowNavigation';
import { useFloating } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { CommonProps } from '-/types/common';
import { getElementById } from '-/utils/dom';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { scrollListItemsStyle, ScrollListItemsStyleProps } from '-/utils/scrollListItemsStyle';
import { useIds } from '-/utils/useIds';

export type BreadcrumbItem = {
    /**
     * The label of the breadcrumb item.
     *
     * @example
     *     Page 1
     *
     * @required
     */
    label: string;
    /**
     * The href of the breadcrumb item.
     *
     * @example
     *     https://bspk.anywhere.re
     *
     * @required
     */
    href: string;
};

export type BreadcrumbProps = CommonProps<'id'> &
    ScrollListItemsStyleProps & {
        /**
         * The array of breadcrumb items.
         *
         * If **less than 2** items are provided, the component will not render.
         *
         * @example
         *     [
         *         { label: 'Level 1', href: '#level-1' },
         *         { label: 'Level 2', href: '#level-2' },
         *         { label: 'Level 3', href: '#level-3' },
         *         { label: 'Level 4', href: '#level-4' },
         *         { label: 'Level 5', href: '#level-5' },
         *         { label: 'Level 6', href: '#level-6' },
         *         { label: 'Level 7', href: '#level-7' },
         *         { label: 'Level 8', href: '#level-8' },
         *         { label: 'Level 9', href: '#level-9' },
         *         { label: 'Level 10', href: '#level-10' },
         *     ];
         *
         * @type Array<BreadcrumbItem>
         * @required
         */

        items: BreadcrumbItem[];
    };

/**
 * Used to indicate the current page's location within a navigational hierarchy.
 *
 * @example
 *     import { Breadcrumb } from '@bspk/ui/breadcrumb';
 *
 *     function Example() {
 *         return (
 *             <Breadcrumb
 *                 items={[
 *                     { label: 'level 1', href: 'https://bspk.anywhere.re' },
 *                     { label: 'level 2', href: 'https://bspk.anywhere.re' },
 *                     { label: 'level 3', href: 'https://bspk.anywhere.re' },
 *                     { label: 'level 4', href: 'https://bspk.anywhere.re' },
 *                     { label: 'level 5', href: 'https://bspk.anywhere.re' },
 *                     { label: 'level 6', href: 'https://bspk.anywhere.re' },
 *                     { label: 'level 7', href: 'https://bspk.anywhere.re' },
 *                     { label: 'level 8', href: 'https://bspk.anywhere.re' },
 *                     { label: 'level 9', href: 'https://bspk.anywhere.re' },
 *                     { label: 'level 10', href: 'https://bspk.anywhere.re' },
 *                 ]}
 *             />
 *         );
 *     }
 *
 * @name Breadcrumb
 * @phase UXReview
 */
export function Breadcrumb({ id: propId, items: itemsProp = [], scrollLimit }: BreadcrumbProps) {
    const id = useId(propId);

    const items = useIds(`breadcrumb-${id}`, itemsProp);

    const { activeElementId, setActiveElementId, arrowKeyCallbacks } = useArrowNavigation({
        ids: items.map((i) => i.id),
    });

    const closeMenu = () => setActiveElementId(null);
    const open = Boolean(activeElementId);

    const { elements, floatingStyles } = useFloating({
        hide: !open,
        offsetOptions: 4,
        refWidth: false,
    });

    useOutsideClick({
        elements: [elements.floating, elements.reference],
        callback: () => closeMenu(),
        disabled: !open,
    });

    const spaceEnter = () => {
        if (!open) {
            elements.reference?.click();
            return;
        }
        if (activeElementId) getElementById(activeElementId)?.click();
    };

    const dropdownItems = items.slice(1, items.length - 1);

    /*
   <ListItemMenu
                            hideWhenClosed
                            itemOnClick={({ setShow }) => setShow(false)}
                            items={items.slice(1, items.length - 1)}
                            label="Expanded breadcrumb"
                            owner="Breadcrumb"
                            placement="bottom"
                            role="menu"
                            scrollLimit={scrollLimit}
                            width="200px"
                        >
                            {(triggerProps, { setRef, itemCount }) => (
                                
                            )}
                        </ListItemMenu>*/

    if (items.length < 2) return null;

    return (
        <nav aria-label="Breadcrumb" data-bspk="breadcrumb" id={id}>
            <ol>
                <li>
                    <Link href={items[0].href} label={items[0].label} />
                    <SvgChevronRight aria-hidden />
                </li>
                {items.length > 5 ? (
                    <li>
                        <Button
                            icon={<SvgMoreHoriz />}
                            iconOnly
                            innerRef={elements.setReference}
                            label={`Access to ${dropdownItems.length} pages`}
                            onClick={() => {
                                if (open) {
                                    closeMenu();
                                } else {
                                    setActiveElementId(items[1].id);
                                }
                            }}
                            onKeyDown={handleKeyDown(
                                {
                                    ...arrowKeyCallbacks,
                                    ArrowDown: (event) => {
                                        if (!open) spaceEnter();
                                        arrowKeyCallbacks.ArrowDown?.(event);
                                    },
                                    Space: spaceEnter,
                                    Enter: spaceEnter,
                                    Escape: closeMenu,
                                    'Ctrl+Option+Space': spaceEnter,
                                },
                                { preventDefault: true, stopPropagation: true },
                            )}
                            size="small"
                            variant="tertiary"
                        />
                        <SvgChevronRight aria-hidden />
                        {open && (
                            <Menu
                                style={{
                                    ...(open ? scrollListItemsStyle(scrollLimit, items.length) : {}),
                                    ...floatingStyles,
                                    width: '200px',
                                }}
                            >
                                {dropdownItems.map((item, idx) => (
                                    <ListItem key={`Breadcrumb-MenuItem-${idx}`} {...item} />
                                ))}
                            </Menu>
                        )}
                    </li>
                ) : (
                    items.slice(1, items.length - 1).map((item, idx) => (
                        <li key={`Breadcrumb-${idx}`}>
                            <Link {...item} />
                            <SvgChevronRight aria-hidden />
                        </li>
                    ))
                )}
                <li aria-current="true">
                    <Txt variant="body-base">{items[items.length - 1].label}</Txt>
                </li>
            </ol>
        </nav>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
