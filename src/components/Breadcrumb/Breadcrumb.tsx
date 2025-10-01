import './breadcrumb.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgMoreHoriz } from '@bspk/icons/MoreHoriz';
import { useState } from 'react';
import { Button } from '-/components/Button';
import { Link } from '-/components/Link';
import { ListItem } from '-/components/ListItem';
import { Menu } from '-/components/Menu';
import { Txt } from '-/components/Txt';
import { useFloating } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { CommonProps } from '-/types/common';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { scrollListItemsStyle } from '-/utils/scrollListItemsStyle';
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

export type BreadcrumbProps = CommonProps<'id' | 'scrollLimit'> & {
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
    const menuId = `menu-${id}`;

    const items = useIds(`breadcrumb-${id}`, itemsProp);

    const [show, setShow] = useState(true);

    const { floatingStyles, elements } = useFloating({});

    useOutsideClick({
        elements: [elements.floating],
        callback: () => {
            if (show) setShow(false);
        },
        disabled: !show,
    });

    const middleItems = items.length > 5 ? items.slice(1, items.length - 1) : null;

    if (items.length < 2) return null;

    return (
        <nav aria-label="Breadcrumb" data-bspk="breadcrumb" id={id}>
            <ol>
                <li>
                    <Link href={items[0].href} label={items[0].label} />
                    <SvgChevronRight aria-hidden />
                </li>
                {middleItems ? (
                    <li>
                        <Button
                            aria-expanded="false"
                            aria-haspopup="menu"
                            icon={<SvgMoreHoriz />}
                            iconOnly
                            innerRef={elements.setReference}
                            label={`Access to ${middleItems.length} pages`}
                            onClick={() => {
                                setShow((prev) => {
                                    const next = !prev;
                                    if (next)
                                        setTimeout(
                                            () => document.getElementById(menuId)?.querySelector('a')?.focus(),
                                            100,
                                        );
                                    return next;
                                });
                            }}
                            size="small"
                            type="button"
                            variant="tertiary"
                            {...(show && {
                                //
                                'aria-controls': menuId,
                                'aria-expanded': 'true',
                                'aria-haspopup': 'menu',
                            })}
                            onKeyDown={handleKeyDown({
                                ArrowDown: () => elements.reference?.click(),
                            })}
                        />
                        {show && (
                            <Menu
                                id={menuId}
                                innerRef={elements.setFloating}
                                label="Expanded breadcrumb"
                                onBlur={(event) => {
                                    if (!event.currentTarget.contains(event.relatedTarget as Node))
                                        setTimeout(() => setShow(false), 100);
                                }}
                                onKeyDownCapture={handleKeyDown({
                                    ArrowDown: (event) => {
                                        setShow(true);
                                        event.preventDefault();
                                        const element = (event.target as HTMLElement)
                                            ?.nextElementSibling as HTMLElement;
                                        element?.focus();
                                    },
                                    ArrowUp: (event) => {
                                        event.preventDefault();
                                        const element = (event.target as HTMLElement)
                                            ?.previousElementSibling as HTMLElement;
                                        element?.focus();
                                    },
                                    Escape: () => {
                                        setShow(false);
                                        elements.reference?.focus();
                                    },
                                    Space: (event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        setShow(false);
                                        (event.target as HTMLElement)?.click();
                                    },
                                })}
                                owner="Breadcrumb"
                                role="menu"
                                style={{
                                    ...floatingStyles,
                                    ...scrollListItemsStyle(scrollLimit, items.length),
                                }}
                            >
                                {middleItems.map((item, idx) => (
                                    <ListItem {...item} key={`Breadcrumb-${idx}`} role="menuitem" />
                                ))}
                            </Menu>
                        )}
                        <SvgChevronRight aria-hidden />
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
