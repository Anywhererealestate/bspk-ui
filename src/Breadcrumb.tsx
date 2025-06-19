import './breadcrumb.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
// import { useMemo } from 'react';

import { Button } from './Button';
import { Link } from './Link';
import { Menu, MenuProps } from './Menu';
import { Portal } from './Portal';
import { Txt } from './Txt';
import { useCombobox } from './hooks/useCombobox';
import { useId } from './hooks/useId';

import { CommonProps } from './';

// export type BreadcrumbItem = {
export type BreadcrumbItem = {
    /** The label of the breadcrumb item. */
    label: string;
    /** The href of the breadcrumb item. */
    href: string;
};

export type BreadcrumbProps = CommonProps<'aria-label' | 'id' | 'name'> &
    Pick<MenuProps, 'renderListItem'> & {
        /**
         * The array of breadcrumb items.
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
function Breadcrumb({
    'aria-label': ariaLabel,
    // disabled,
    id: propId,
    name,
    // readOnly,
    items = [],
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
                        <li key={`breadcrumb-1-${safeItems[0].label}`}>
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
                        <li key={`breadcrumb-${safeItemCount}-${safeItems[safeItemCount - 1].label}`}>
                            <Txt variant="body-base">{safeItems[safeItemCount - 1].label}</Txt>
                        </li>
                    </>
                )}

                {safeItemCount >= 2 && safeItemCount <= 5 && (
                    <>
                        {safeItems.slice(0, safeItemCount - 1).map((item, idx) => (
                            <li key={`breadcrumb-${idx}-${item.label}`}>
                                <Link href={item.href} label={item.label} />
                                {safeItems.length - 1 && <SvgChevronRight />}
                            </li>
                        ))}
                        <li key={`breadcrumb-${safeItemCount - 1}-${safeItems[safeItemCount - 1].label}`}>
                            <Txt variant="body-base">{safeItems[safeItemCount - 1].label}</Txt>
                        </li>
                    </>
                )}
            </ol>
        </nav>
    );
}

Breadcrumb.bspkName = 'Breadcrumb';

export { Breadcrumb };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
