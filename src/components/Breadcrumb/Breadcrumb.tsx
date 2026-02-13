import './breadcrumb.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { BreadcrumbDropdown, BreadcrumbItem } from './BreadcrumbDropdown';
import { Link } from '-/components/Link';
import { Txt } from '-/components/Txt';
import { useId } from '-/hooks/useId';
import { CommonProps } from '-/types/common';
import { ScrollListItemsStyleProps } from '-/utils/scrollListItemsStyle';

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
 *     <div style={{ padding: '0px 20px', width: '100%' }}>
 *         <Breadcrumb
 *             id="example-breadcrumb"
 *             scrollLimit={5}
 *             items={[
 *                 { label: 'Brioche', href: '#brioche' },
 *                 { label: 'Whole Wheat', href: '#whole-wheat' },
 *                 { label: 'Sourdough', href: '#sourdough' },
 *                 { label: 'Rye', href: '#rye' },
 *                 { label: 'Multigrain', href: '#multigrain' },
 *                 { label: 'Baguette', href: '#baguette' },
 *                 { label: 'Focaccia', href: '#focaccia' },
 *                 { label: 'Ciabatta', href: '#ciabatta' },
 *                 { label: 'Pita', href: '#pita' },
 *                 { label: 'Naan', href: '#naan' },
 *                 { label: 'Flatbread', href: '#flatbread' },
 *             ]}
 *         />
 *     </div>;
 *
 * @name Breadcrumb
 * @phase Stable
 */
export function Breadcrumb({ id: propId, items = [], scrollLimit }: BreadcrumbProps) {
    const id = useId(propId);

    if (items.length < 2) return null;

    return (
        <nav aria-label="Breadcrumb" data-bspk="breadcrumb" id={id}>
            <ol>
                <li>
                    <Link href={items[0].href} label={items[0].label} size="small" variant="subtle" />
                    <SvgChevronRight aria-hidden />
                </li>
                {items.length > 5 ? (
                    <BreadcrumbDropdown id={id} items={items.slice(1, items.length - 1)} scrollLimit={scrollLimit} />
                ) : (
                    items.slice(1, items.length - 1).map((item, idx) => (
                        <li key={`Breadcrumb-${idx}`}>
                            <Link size="small" variant="subtle" {...item} />
                            <SvgChevronRight aria-hidden />
                        </li>
                    ))
                )}
                <li aria-current="true">
                    <Txt variant="labels-small">{items[items.length - 1].label}</Txt>
                </li>
            </ol>
        </nav>
    );
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
