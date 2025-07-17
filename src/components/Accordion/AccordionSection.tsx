import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
import { SvgKeyboardArrowUp } from '@bspk/icons/KeyboardArrowUp';
import { ReactNode } from 'react';
import './accordion.scss';
import { Divider } from '-/components/Divider';
import { Txt } from '-/components/Txt';

export type AccordionSectionProps = {
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
    subTitle?: string;
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
    isOpen: boolean;
    /**
     * Fires when the accordion state changes.
     *
     * @required
     */
    toggleOpen: () => void;
    /**
     * If true, a divider will be shown below the accordion header.
     *
     * @default true
     */
    divider?: boolean;
    /**
     * Indicates whether the accordion is disabled.
     *
     * @default false
     */
    disabled?: boolean;
};

/**
 * A vertical stack of collapsible panels or that allows customers to expand or collapse each panel individually to
 * reveal or hide their content.
 *
 * @example
 *     import { Accordion } from '@bspk/ui/Accordion';
 *
 *     function Example() {
 *         return (
 *             <Accordion title="Accordion Title" subTitle="Accordion Subtitle">
 *                 Accordion Content
 *             </Accordion>
 *         );
 *     }
 *
 * @name Accordion
 * @phase WorkInProgress
 */
export function AccordionSection({
    children,
    title,
    subTitle,
    leading,
    isOpen,
    toggleOpen,
    divider = true,
    trailing,
    disabled,
}: AccordionSectionProps) {
    return (
        <section data-accordion-section data-disabled={disabled || undefined}>
            <button data-accordion-header disabled={disabled} onClick={!disabled ? toggleOpen : undefined}>
                <div data-accordion-header-body>
                    {leading ?? null}

                    <div data-accordion-title-wrapper>
                        <Txt variant="labels-base">{title}</Txt>

                        {!!subTitle && <Txt variant="body-x-small">{subTitle}</Txt>}
                    </div>

                    {trailing ?? null}
                </div>

                {isOpen ? <SvgKeyboardArrowUp /> : <SvgKeyboardArrowDown />}
            </button>

            {divider && (
                <div data-divider-wrapper>
                    <Divider />
                </div>
            )}

            {isOpen && <div data-accordion-content>{children}</div>}
        </section>
    );
}
