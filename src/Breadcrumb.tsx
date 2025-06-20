import './breadcrumb.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgMoreHoriz } from '@bspk/icons/MoreHoriz';

import { Button } from './Button';
import { Link } from './Link';
import { Menu } from './Menu';
import { Portal } from './Portal';
import { Txt } from './Txt';
import { useCombobox } from './hooks/useCombobox';
import { useId } from './hooks/useId';

import { CommonProps } from './';

export type BreadcrumbItem = {
    /**
     * The label of the breadcrumb item.
     *
     * @example
     *     'level 1';
     *
     * @required
     */
    label: string;
    /**
     * The href of the breadcrumb item.
     *
     * @example
     *     'https://bspk.anywhere.re';
     *
     * @required
     */
    href: string;
};

export type BreadcrumbProps = CommonProps<'id'> & {
    /**
     * The array of breadcrumb items.
     *
     * If **less than 2** items are provided, the component will not render.
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
function Breadcrumb({ id: propId, items }: BreadcrumbProps) {
    const id = useId(propId);
    const safeItems = Array.isArray(items) ? items : [];
    const itemCount = safeItems.length;

    const { toggleProps, menuProps, toggleRef } = useCombobox({
        placement: 'bottom',
        refWidth: false,
    });

    const middleItems = safeItems.slice(1, itemCount - 1).map((item) => ({
        label: item.label,
        href: item.href,
    }));

    const breadcrumbIcon = <SvgChevronRight aria-hidden={true} />;

    if (itemCount < 2) {
        return null; // No items to render
    }
    return (
        <nav aria-label="Breadcrumb" data-bspk="breadcrumb" id={id}>
            <ol>
                <li key="Breadcrumb-0">
                    <Link href={safeItems[0].href} label={safeItems[0].label} />
                    {breadcrumbIcon}
                </li>
                {itemCount > 5 ? (
                    <>
                        <li key={`Breadcrumb-${itemCount - 2}-items`}>
                            <Button
                                icon={<SvgMoreHoriz />}
                                innerRef={toggleRef}
                                label={`access to ${itemCount - 2} breadcrumb items`}
                                showLabel={false}
                                size="small"
                                toolTip={`${itemCount - 2} pages`}
                                variant="tertiary"
                                {...toggleProps}
                            />

                            <Portal>
                                <Menu
                                    isMulti={false}
                                    itemCount={middleItems.length}
                                    items={middleItems}
                                    {...menuProps}
                                />
                            </Portal>
                            {breadcrumbIcon}
                        </li>
                    </>
                ) : (
                    <>
                        {safeItems.slice(1, itemCount - 1).map((item, idx) => (
                            <li key={`Breadcrumb-${idx}`}>
                                <Link href={item.href} label={item.label} />
                                {breadcrumbIcon}
                            </li>
                        ))}
                    </>
                )}
                <li aria-current="true" key={`Breadcrumb-${itemCount - 1}`}>
                    <Txt variant="body-base">{safeItems[itemCount - 1].label}</Txt>
                </li>
            </ol>
        </nav>
    );
}

Breadcrumb.bspkName = 'Breadcrumb';

export { Breadcrumb };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
