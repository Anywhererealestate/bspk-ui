import { useState } from 'react';
import { AccordionSectionProps, AccordionSection } from './AccordionSection';
import './accordion.scss';

export type AccordionItem = Pick<
    AccordionSectionProps,
    'children' | 'disabled' | 'divider' | 'leading' | 'subTitle' | 'title' | 'trailing'
> & {
    /**
     * The unique identifier for the accordion item.
     *
     * @required
     */
    id: number | string;
};

export type AccordionProps = {
    /**
     * Array of accordion sections
     *
     * @type Array<AccordionItem>
     * @required
     */
    items: AccordionItem[];
    /**
     * If true only one accordion section can be opened at a time
     *
     * @default true
     */
    singleOpen?: boolean;
};

/**
 * A vertical stack of collapsible panels or that allows customers to expand or collapse each panel individually to
 * reveal or hide their content.
 *
 * @example
 *     import { Accordion } from '@bspk/ui/Accordion';
 *
 *     function Example() {
 *         return <Accordion items={[{ id: 1, title: 'Section', children: 'Example content' }]} />;
 *     }
 *
 * @name Accordion
 * @phase DesignReview
 */
function Accordion({ items, singleOpen = true }: AccordionProps) {
    const [activeItems, setActiveItems] = useState<(number | string)[]>([]);

    const toggleOpen = (itemId: number | string) => {
        setActiveItems((prevItems) => {
            const isItemActive = prevItems.includes(itemId);

            // If singleOpen is true, reset activeItems to only include the clicked item or empty if it was already active
            if (singleOpen) return isItemActive ? [] : [itemId];

            // If singleOpen is false, toggle the clicked item and keep others active
            return isItemActive ? prevItems.filter((activeItemId) => activeItemId !== itemId) : [...prevItems, itemId];
        });
    };

    return (
        <div data-bspk="accordion">
            {items.map((item) => {
                return (
                    <AccordionSection
                        isOpen={activeItems.includes(item.id)}
                        key={item.id}
                        toggleOpen={() => toggleOpen(item.id)}
                        {...item}
                    >
                        {item.children}
                    </AccordionSection>
                );
            })}
        </div>
    );
}

Accordion.bspkName = 'Accordion';

export { Accordion };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
