import './breadcrumb.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgMoreHoriz } from '@bspk/icons/MoreHoriz';

import { Button } from './Button';
import { Link } from './Link';
import { ListItem } from './ListItem';
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
     *     'Page 1';
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
 */
function Breadcrumb({ id: propId, items: itemsProp }: BreadcrumbProps) {
    const id = useId(propId);
    const items = Array.isArray(itemsProp) ? itemsProp : [];

    const { toggleProps, menuProps, elements } = useCombobox({
        placement: 'bottom',
        refWidth: false,
    });

    const middleItems = items.slice(1, items.length - 1);

    const breadcrumbIcon = <SvgChevronRight aria-hidden={true} />;

    if (items.length < 2) return null; // No items to render

    return (
        <nav aria-label="Breadcrumb" data-bspk="breadcrumb" id={id}>
            <ol>
                <li>
                    <Link href={items[0].href} label={items[0].label} />
                    {breadcrumbIcon}
                </li>
                {items.length > 5 ? (
                    <>
                        <li>
                            <Button
                                icon={<SvgMoreHoriz />}
                                innerRef={elements.setReference}
                                label={`access to ${middleItems.length} breadcrumb items`}
                                showLabel={false}
                                size="small"
                                toolTip={`${middleItems.length} pages`}
                                variant="tertiary"
                                {...toggleProps}
                            />

                            <Portal>
                                <Menu {...menuProps} innerRef={elements.setFloating}>
                                    {middleItems.map((item) => ListItem(item))}
                                </Menu>
                            </Portal>
                            {breadcrumbIcon}
                        </li>
                    </>
                ) : (
                    <>
                        {middleItems.map((item, idx) => (
                            <li key={`Breadcrumb-${idx}`}>
                                <Link href={item.href} label={item.label} />
                                {breadcrumbIcon}
                            </li>
                        ))}
                    </>
                )}
                <li aria-current="true">
                    <Txt variant="body-base">{items[items.length - 1].label}</Txt>
                </li>
            </ol>
        </nav>
    );
}

Breadcrumb.bspkName = 'Breadcrumb';

export { Breadcrumb };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
