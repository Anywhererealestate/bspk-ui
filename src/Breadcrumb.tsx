import './breadcrumb.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
// import { useMemo } from 'react';

import { Button } from './Button';
import { Link } from './Link';
import { Menu, MenuProps } from './Menu';
import { Portal } from './Portal';
import { useCombobox } from './hooks/useCombobox';
import { useId } from './hooks/useId';

import { CommonProps } from './';

// export type BreadcrumbItem = {
export type BreadcrumbItem = CommonProps<'disabled'> & {
    /** The label of the breadcrumb item. */
    label: string;
    /** The href of the breadcrumb item. */
    href: string;
};

export type BreadcrumbProps = CommonProps<'aria-label' | 'id' | 'name'> &
    Pick<MenuProps, 'itemCount' | 'renderListItem' | 'selectAll'> & {
        // /**
        //  * The number of items to display in the menu
        //  *
        //  * @default 2
        //  * @minimum 2
        //  * @maximum 10
        //  */
        // itemCount?: number;
        /**
         * The array of breadcrumb items.
         *
         * @example
         *     [
         *         { label: 'level 1', href: 'https://bspk.anywhere.re/breadcrumb' },
         *         { label: 'level 2', href: 'https://bspk.anywhere.re/breadcrumb' },
         *         { label: 'level 3', href: 'https://bspk.anywhere.re/breadcrumb' },
         *         { label: 'level 4', href: 'https://bspk.anywhere.re/breadcrumb' },
         *         { label: 'level 5', href: 'https://bspk.anywhere.re/breadcrumb' },
         *         { label: 'level 6', href: 'https://bspk.anywhere.re/breadcrumb' },
         *         { label: 'level 7', href: 'https://bspk.anywhere.re/breadcrumb' },
         *         { label: 'level 8', href: 'https://bspk.anywhere.re/breadcrumb' },
         *         { label: 'level 9', href: 'https://bspk.anywhere.re/breadcrumb' },
         *         { label: 'level 10', href: 'https://bspk.anywhere.re/breadcrumb' },
         *     ];
         *
         * @type Array<BreadcrumbItem>
         * @required
         */
        items: BreadcrumbItem[];

        /**
         * The size of the link.
         *
         * (@)default base
         */
        // size?: 'base' | 'large' | 'small';
        /**
         * Change the color of the link to a subtle color. This is useful for links that are not primary actions, for
         * example footer menus.
         *
         * (@)default default
         */
        // variant?: 'default' | 'subtle-inverse' | 'subtle';
    };

/**
 * They are similar in size and shape to playing cards and are intended to encourage users to click or tap to view more
 * details.
 *
 * @example
 *     import { Breadcrumb } from '@bspk/ui/breadcrumb';
 *
 *     function Example() {
 *         return (
 *             <Breadcrumb
 *                 items={[
 *                     { label: '1 EXAMPLE', href: 'https://bspk.anywhere.re/breadcrumb' },
 *                     { label: '2', href: 'https://bspk.anywhere.re/breadcrumb' },
 *                 ]}
 *             />
 *         );
 *     }
 *
 * @name Breadcrumb
 */
function Breadcrumb({
    'aria-label': ariaLabel,
    // disabled,
    id: propId,
    name,
    // readOnly,
    items,
    // renderListItem,
}: BreadcrumbProps) {
    const id = useId(propId);
    // const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);
    const safeItems = Array.isArray(items) ? items : [];
    const itemCount = safeItems.length;
    const minItemCount = 2;
    const maxItemCount = 10;
    const fallbackItemCount = itemCount > maxItemCount ? maxItemCount : 0;
    const safeItemCount = itemCount >= minItemCount && itemCount <= maxItemCount ? itemCount : fallbackItemCount;

    const { toggleProps, menuProps, toggleRef } = useCombobox({
        placement: 'bottom',
        // disabled,
        // readOnly,
        refWidth: false,
    });

    const menuItems = safeItems.slice(1, safeItemCount - 1).map((item) => ({
        label: item.label,
        href: item.href,
    }));

    // const renderMenuListItem = ({ item }) => {
    //     console.log('renderMenuListItem href:', item.href, '\nlabel:', item.label, '\n\n');
    //     return (
    //         <a
    //             href={item.href}
    //             role="menuitem"
    //             // Optionally add target="_blank" if you want to open in a new tab
    //         >
    //             {item.label}
    //         </a>
    //     );
    // };

    // console.log(
    //     'Breadcrumb items: ',
    //     items,

    //     '\ntypeof items: ',
    //     typeof items,

    //     ' \nArray.isArray(items): ',
    //     Array.isArray(items),

    //     '\nBreadcrumb safeItems: ',
    //     safeItems,

    //     '\ntypeof safeItems: ',
    //     typeof safeItems,

    //     ' \nArray.isArray(safeItems): ',
    //     Array.isArray(safeItems),

    //     '\nBreadcrumb menuItems: ',
    //     menuItems,

    //     '\ntypeof menuItems: ',
    //     typeof menuItems,

    //     ' \nArray.isArray(menuItems): ',
    //     Array.isArray(menuItems),

    //     '\nBreadcrumb safeItemCount: ',
    //     safeItemCount,
    //     '\ntypeof safeItemCount: ',
    //     typeof safeItemCount,

    //     '\n\nmenuProps: ',
    //     menuProps,
    // );
    return (
        <nav data-bspk="breadcrumb" data-item-count={safeItemCount || undefined}>
            <ol>
                {safeItemCount > 5 && (
                    <>
                        <li key="BCindex change to match index">
                            <Link href={safeItems[0].href} label={safeItems[0].label} />
                            <SvgChevronRight />
                        </li>
                        <li key="BCindex">
                            <Button
                                aria-label={ariaLabel}
                                // disabled={disabled || readOnly}
                                id={id}
                                innerRef={toggleRef}
                                label="..."
                                name={name}
                                toolTip={`${safeItemCount - 2} pages`}
                                variant="tertiary"
                                {...toggleProps}
                            />

                            <Portal>
                                <Menu isMulti={false} itemCount={menuItems.length} items={menuItems} {...menuProps} />
                            </Portal>
                            <SvgChevronRight />
                        </li>
                        <li key="BCindex fix">
                            <Link href={safeItems[safeItemCount - 1].href} label={safeItems[safeItemCount - 1].label} />
                        </li>
                    </>
                )}
                {safeItemCount <= 5 &&
                    safeItems.map((item) => (
                        <li key="BCindex">
                            <Link
                                href={item.href}
                                label={item.label}
                                // size={size}
                                // variant={variant}
                            />
                            {safeItems.length - 1 && <SvgChevronRight />}
                        </li>
                    ))}
            </ol>
        </nav>
    );
}

Breadcrumb.bspkName = 'Breadcrumb';

export { Breadcrumb };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
