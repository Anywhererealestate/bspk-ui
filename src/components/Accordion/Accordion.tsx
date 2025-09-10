import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
import { SvgKeyboardArrowUp } from '@bspk/icons/KeyboardArrowUp';
import { ReactNode, useEffect, useState } from 'react';
import './accordion.scss';

export type AccordionItem = {
    /**
     * The content of the accordion.
     *
     * @required
     */
    children: ReactNode;
    /**
     * The title of the accordion.
     *
     * @required
     */
    title: string;
    /** The title of the accordion. */
    subtitle?: string;
    /**
     * The leading element to display in the Accordion title.
     *
     * Leading elements may only be one of the following [Icon](/icons), Img, Avatar.
     *
     * @exampleType select
     * @options Icon, Img, Avatar
     */
    leading?: ReactNode;
    /**
     * The trailing element to display in the accordion header.
     *
     * @exampleType select
     * @options Tag
     */
    trailing?: ReactNode;
    /**
     * If the accordion is open.
     *
     * @default false
     * @required
     */
    isOpen?: boolean;
    /**
     * Indicates whether the accordion is disabled.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * The unique identifier for the accordion item.
     *
     * @required
     */
    id: string;
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
 * @phase UXReview
 */
export function Accordion({ items, singleOpen = true }: AccordionProps) {
    const [openSections, setOpenSections] = useState<string[]>(() => {
        return items.filter((item) => item.isOpen).map((item) => item.id);
    });

    useEffect(() => {
        // Update open sections based on the items prop
        setOpenSections(items.filter((item) => item.isOpen).map((item) => item.id));
    }, [items]);

    const toggleOpen = (itemId: string) => () =>
        setOpenSections((prev) => {
            const isSectionOpen = prev.includes(itemId);

            // If singleOpen is true, reset activeItems to only include the clicked item or empty if it was already active
            if (singleOpen) return isSectionOpen ? [] : [itemId];

            // If singleOpen is false, toggle the clicked item and keep others active
            return isSectionOpen ? prev.filter((activeItemId) => activeItemId !== itemId) : [...prev, itemId];
        });

    return (
        <div data-bspk="accordion">
            {items.map(({ children, title, subtitle: subtitle, leading, trailing, disabled, id }, index) => {
                const isOpen = openSections.includes(id);
                return (
                    <section data-disabled={disabled || undefined} id={id} key={id || index}>
                        <button
                            aria-controls={`${id}-content`}
                            aria-expanded={isOpen}
                            data-header
                            disabled={disabled || undefined}
                            onClick={!disabled ? toggleOpen(id) : undefined}
                        >
                            {leading && <span data-leading>{leading}</span>}
                            <span data-title-subtitle>
                                <span data-title>{title}</span>
                                {subtitle && <span data-subtitle>{subtitle}</span>}
                            </span>
                            {trailing && <span data-trailing>{trailing}</span>}
                            <span data-arrow>{isOpen ? <SvgKeyboardArrowUp /> : <SvgKeyboardArrowDown />}</span>
                        </button>
                        {isOpen && (
                            <div data-content data-hidden={!isOpen || undefined} id={`${id}-content`}>
                                {children}
                            </div>
                        )}
                        <span data-divider />
                    </section>
                );
            })}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
