import { useState } from 'react';
import { AccordionSectionProps, AccordionSection } from './AccordionSection';
import './accordion.scss';

type AccordionItem = Pick<AccordionSectionProps, 'children' | 'leading' | 'subTitle' | 'title' | 'trailing'> & {
    /**
     * The unique identifier for the accordion item.
     *
     * @required
     */
    id: number | string;
};

export type AccordionProps = Pick<AccordionSectionProps, 'disabled' | 'divider'> & {
    /**
     * Array of accordion sections
     *
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
 * @phase WorkInProgress
 */
function Accordion({ items, disabled, divider, singleOpen = true }: AccordionProps) {
    const [activeItemId, setActiveItemId] = useState<number | string | null>(null);

    return (
        <span data-bspk="accordion">
            {items.map((item) => {
                const controlProps = singleOpen
                    ? {
                          onChange: () => {
                              setActiveItemId(activeItemId === item.id ? null : item.id);
                          },
                          value: activeItemId === item.id,
                      }
                    : {};
                return (
                    <AccordionSection disabled={disabled} divider={divider} key={item.id} {...controlProps} {...item}>
                        {item.children}
                    </AccordionSection>
                );
            })}
        </span>
    );
}

Accordion.bspkName = 'Accordion';

export { Accordion };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
