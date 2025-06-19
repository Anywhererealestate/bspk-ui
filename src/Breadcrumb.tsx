import './breadcrumb.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgMoreHoriz } from '@bspk/icons/MoreHoriz';
// import { useMemo } from 'react';

import { Button } from './Button';
import { Link } from './Link';
import { Menu } from './Menu';
import { Portal } from './Portal';
import { Txt } from './Txt';
import { useCombobox } from './hooks/useCombobox';
import { useId } from './hooks/useId';

import { CommonProps } from './';

// export type BreadcrumbItem = {
export type BreadcrumbItem = {
    /**
     * The label of the breadcrumb item.
     *
     * @default ''
     * @required
     */
    label: string;
    /**
     * The href of the breadcrumb item.
     *
     * @default 'missing href'
     * @required
     */
    href: string;
};

export type BreadcrumbProps = CommonProps<'aria-label' | 'id' | 'name'> & {
    /**
     * The array of breadcrumb items.
     *
     * If **less than 2** items are provided, no items will render.
     *
     * If **more than 10** items are provided, only the last 10 items will be displayed.
     *
     * @example
     *     [
     *         { label: 'level 1', href: 'https://bspk.anywhere.re' },
     *         { label: 'level 2', href: 'https://bspk.anywhere.re' },
     *         { label: 'level 3', href: 'https://bspk.anywhere.re' },
     *         { label: 'level 4', href: 'https://bspk.anywhere.re' },
     *         { label: 'level 5', href: 'https://bspk.anywhere.re' },
     *         { label: 'level 6', href: 'https://bspk.anywhere.re' },
     *         { label: 'level 7', href: 'https://bspk.anywhere.re' },
     *         { label: 'level 8', href: 'https://bspk.anywhere.re' },
     *         { label: 'level 9', href: 'https://bspk.anywhere.re' },
     *         { label: 'level 10', href: 'https://bspk.anywhere.re' },
     *     ];
     *
     * @type Array<BreadcrumbItem>
     * @required
     * @minimum 2
     * @maximum 10
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
 */
function Breadcrumb({ 'aria-label': ariaLabel, id: propId, name, items = [] }: BreadcrumbProps) {
    const id = useId(propId);
    const safeItems = Array.isArray(items) ? items : [];
    const itemCount = safeItems.length;
    const maxItemCount = 10;
    const safeItemCount = itemCount > maxItemCount ? maxItemCount : itemCount;
    const displayItems = itemCount > safeItemCount ? safeItems.slice(itemCount - safeItemCount, itemCount) : safeItems;

    const { toggleProps, menuProps, toggleRef } = useCombobox({
        placement: 'bottom',
        refWidth: false,
    });

    const menuItems = displayItems.slice(1, safeItemCount - 1).map((item) => ({
        label: item.label,
        href: item.href,
    }));

    const breadcrumbIcon = <SvgChevronRight aria-hidden={true} />;

    return (
        <nav data-bspk="breadcrumb" data-item-count={safeItemCount || undefined}>
            <ol>
                {safeItemCount > 5 && (
                    <>
                        <li key={`1-${displayItems[0].label.replace(/\s+/g, '')}`}>
                            <Link href={displayItems[0].href} label={displayItems[0].label} />
                            {breadcrumbIcon}
                        </li>
                        <li key={`${safeItemCount - 2}-items`}>
                            <Button
                                aria-label={ariaLabel}
                                icon={<SvgMoreHoriz />}
                                id={id}
                                innerRef={toggleRef}
                                label="..."
                                name={name}
                                showLabel={false}
                                size="small"
                                toolTip={`${safeItemCount - 2} pages`}
                                variant="tertiary"
                                {...toggleProps}
                            />

                            <Portal>
                                <Menu isMulti={false} itemCount={menuItems.length} items={menuItems} {...menuProps} />
                            </Portal>
                            {breadcrumbIcon}
                        </li>
                    </>
                )}

                {safeItemCount >= 2 &&
                    safeItemCount <= 5 &&
                    displayItems.slice(0, safeItemCount - 1).map((item, idx) => (
                        <li key={`breadcrumb-${idx}-${item.label}`}>
                            <Link href={item.href} label={item.label} />
                            {breadcrumbIcon}
                        </li>
                    ))}
                {safeItemCount >= 2 && safeItemCount <= 10 && (
                    <li key={`breadcrumb-${safeItemCount - 1}-${displayItems[safeItemCount - 1].label}`}>
                        <Txt variant="body-base">{displayItems[safeItemCount - 1].label}</Txt>
                    </li>
                )}
            </ol>
        </nav>
    );
}

Breadcrumb.bspkName = 'Breadcrumb';

export { Breadcrumb };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
