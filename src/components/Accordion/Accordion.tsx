import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
import { SvgKeyboardArrowUp } from '@bspk/icons/KeyboardArrowUp';
import { ReactNode, useMemo, useState } from 'react';
import './accordion.scss';
import { Divider } from '-/components/Divider';
import { Txt } from '-/components/Txt';

export type AccordionProps = {
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
     * If the accordion is open, only used when the accordion is controlled.
     *
     * @default false
     */
    value?: boolean;
    /**
     * Fires when the accordion state changes, only used when the accordion is controlled.
     *
     * @default none
     */
    onChange?: (newOpenState: boolean) => void;
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
 * Component description.
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
function Accordion({
    children,
    title,
    subTitle,
    leading,
    value,
    onChange,
    divider = true,
    trailing,
    disabled,
}: AccordionProps) {
    const [isOpenInternal, setIsOpenInternal] = useState(value || false);

    const toggleOpen = () => {
        if (onChange) {
            const newOpenState = !value;
            onChange(newOpenState);
        } else {
            const newOpenState = !isOpenInternal;
            setIsOpenInternal(newOpenState);
        }
    };

    const isOpen = useMemo(() => {
        return value !== undefined ? value : isOpenInternal;
    }, [value, isOpenInternal]);

    return (
        <div data-bspk="accordion" data-disabled={disabled || undefined}>
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
        </div>
    );
}

Accordion.bspkName = 'Accordion';

export { Accordion };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
