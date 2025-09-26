import './breadcrumb.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgMoreHoriz } from '@bspk/icons/MoreHoriz';
import { useMemo } from 'react';
import { Button } from '-/components/Button';
import { Link } from '-/components/Link';
import { ListItemGroupProps } from '-/components/ListItemGroup';
import { ListItemMenu } from '-/components/ListItemMenu';
import { Txt } from '-/components/Txt';
import { useId } from '-/hooks/useId';
import { CommonProps } from '-/types/common';

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
    Pick<ListItemGroupProps, 'scrollLimit'> & {
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
    const items = useMemo(
        () =>
            (Array.isArray(itemsProp) ? itemsProp : []).map((item, index) => ({
                ...item,
                id: `breadcrumb-${id}-item-${index + 1}`,
            })),
        [id, itemsProp],
    );

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
                        <ListItemMenu
                            items={({ setShow }) =>
                                items.slice(1, items.length - 1).map((item) => ({
                                    ...item,
                                    onClick: () => setShow(false),
                                }))
                            }
                            label="Expanded breadcrumb"
                            owner="Breadcrumb"
                            placement="bottom"
                            role="tree"
                            scrollLimit={scrollLimit}
                            width="200px"
                        >
                            {(triggerProps, { setRef, itemCount }) => (
                                <Button
                                    {...triggerProps}
                                    icon={<SvgMoreHoriz />}
                                    iconOnly
                                    innerRef={setRef}
                                    label={`Access to ${itemCount} pages`}
                                    onClick={triggerProps.onClick}
                                    size="small"
                                    variant="tertiary"
                                />
                            )}
                        </ListItemMenu>
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
