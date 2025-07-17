import { useState } from 'react';
import { AccordionProps, Accordion } from '-/components/Accordion';
import './accordion-group.scss';

type AccordionGroupItem = Pick<AccordionProps, 'children' | 'leading' | 'subTitle' | 'title' | 'trailing'> & {
    /**
     * The unique identifier for the accordion item.
     *
     * @required
     */
    id: number | string;
};

export type AccordionGroupProps = Pick<AccordionProps, 'disabled' | 'divider'> & {
    /**
     * Array of accordion sections
     *
     * @required
     */
    items: AccordionGroupItem[];
    /**
     * If true only one accordion section can be opened at a time
     *
     * @default true
     */
    singleOpen?: boolean;
};

/**
 * Component description.
 *
 * @example
 *     import { AccordionGroup } from '@bspk/ui/AccordionGroup';
 *
 *     function Example() {
 *         return <AccordionGroup>Example AccordionGroup</AccordionGroup>;
 *     }
 *
 * @name AccordionGroup
 * @phase WorkInProgress
 */
function AccordionGroup({ items, disabled, divider, singleOpen = true }: AccordionGroupProps) {
    const [activeItemId, setActiveItemId] = useState<number | string | null>(null);

    return (
        <span data-bspk="accordion-group">
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
                    <Accordion disabled={disabled} divider={divider} key={item.id} {...controlProps} {...item}>
                        {item.children}
                    </Accordion>
                );
            })}
        </span>
    );
}

AccordionGroup.bspkName = 'AccordionGroup';

export { AccordionGroup };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
