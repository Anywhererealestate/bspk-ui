import './popover.scss';
import { SvgClose } from '@bspk/icons/Close';
import { ReactElement, useRef, useState } from 'react';
import { Button } from '-/components/Button';
import { Portal } from '-/components/Portal';
import { Txt } from '-/components/Txt';
import { Placement, useFloating, UseFloatingProps } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { CallToActionButton, CommonProps, ElementProps } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

export type PopoverTriggerProps = {
    onClick?: () => void;
    'aria-describedby'?: string;
};

export type PopoverProps = CommonProps<'disabled'> &
    Pick<UseFloatingProps, 'refWidth'> & {
        /**
         * The placement of the popover.
         *
         * @default top
         */
        placement?: Placement;
        /** The popover header. */
        header: string;
        /**
         * The content of the popover.
         *
         * @type multiline
         */
        content: string;
        /**
         * The call to action button properties.
         *
         * @type CallToActionButton
         */
        callToAction?: CallToActionButton;
        /**
         * The secondary call to action button properties.
         *
         * @type CallToActionButton
         */
        secondaryCallToAction?: CallToActionButton;
        /**
         * A callback to render the trigger element.
         *
         * @required
         */
        children: (triggerProps: PopoverTriggerProps) => ReactElement;
    };

/**
 * Brief message that provide additional guidance and helps users perform an action if needed.
 *
 * @example
 *     import { useState } from 'react';
 *     import { Popover } from '@bspk/ui/Popover';
 *     import { Button } from '@bspk/ui/Button';
 *
 *     export function Example() {
 *         const [showPopover, setShowPopover] = useState<boolean>(false);
 *
 *         const togglePopover = () => setShowPopover(!showPopover);
 *         const onPopoverCallToActionClick = () => alert('Action clicked');
 *
 *         return (
 *             <Popover
 *                 placement="bottom"
 *                 content="This is a popover content"
 *                 header="Popover Header"
 *                 callToAction={{
 *                     label: 'Action',
 *                     onClick: onPopoverCallToActionClick,
 *                 }}
 *             >
 *                 <Button label="Toggle popover" onClick={togglePopover} />
 *             </Popover>
 *         );
 *     }
 *
 * @name Popover
 * @phase UXReview
 */
export function Popover({
    placement = 'top',
    header,
    content,
    callToAction,
    secondaryCallToAction,
    children,
    disabled = false,
    refWidth,
    ...props
}: ElementProps<PopoverProps, 'div'>) {
    const id = useId();
    const [show, setShow] = useState(false);
    const arrowRef = useRef<HTMLElement | null>(null);

    const { elements, floatingStyles, middlewareData } = useFloating({
        placement: placement,
        strategy: 'absolute',
        offsetOptions: 22,
        arrowRef,
        hide: !show,
        refWidth,
    });

    useOutsideClick({
        elements: [elements.floating],
        callback: () => setShow(false),
    });

    const basicArrowX = middlewareData?.arrow?.x ? `${middlewareData.arrow.x}px` : '0px';

    const getArrowX = () => {
        if (middlewareData?.arrow?.x) {
            if (placement === 'top-start' || placement === 'bottom-start') return '16px';
            if (placement === 'top' || placement === 'bottom') return `${middlewareData.arrow.x}px`;
            if (placement === 'top-end' || placement === 'bottom-end')
                return `${(middlewareData.arrow.x * 2 || 32) - 16}px`;
        }
        return '0px';
    };

    return disabled ? (
        children({})
    ) : (
        <>
            {children({
                onClick: () => setShow(!show),
                'aria-describedby': id,
            })}
            {show && (
                <Portal>
                    <div
                        data-bspk="popover"
                        data-placement={middlewareData?.offset?.placement}
                        id={id}
                        ref={(node) => {
                            elements.setFloating(node);
                            elements.setReference(document.querySelector<HTMLElement>(`[aria-describedby="${id}"]`));
                        }}
                        style={{ ...floatingStyles, ...props.style }}
                    >
                        <header>
                            <Txt variant="heading-h6">{header}</Txt>
                            <button aria-label="Close" onClick={() => setShow(false)}>
                                <SvgClose />
                            </button>
                        </header>
                        <div data-content>
                            <Txt as="div" variant="body-small">
                                {content}
                            </Txt>
                            <div data-cta-row>
                                {secondaryCallToAction?.label && secondaryCallToAction?.onClick && (
                                    <Button
                                        label={secondaryCallToAction.label}
                                        onClick={secondaryCallToAction.onClick}
                                        size="small"
                                        variant="secondary"
                                    />
                                )}
                                {callToAction?.label && callToAction?.onClick && (
                                    <Button
                                        label={callToAction.label}
                                        onClick={callToAction.onClick}
                                        size="small"
                                        variant="primary"
                                    />
                                )}
                            </div>
                        </div>
                        <div
                            data-arrow
                            ref={(node) => {
                                arrowRef.current = node;
                            }}
                            style={cssWithVars({
                                '--position-left': refWidth ? getArrowX() : basicArrowX,
                                '--position-top': `${middlewareData?.arrow?.y || 0}px`,
                            })}
                        />
                    </div>
                </Portal>
            )}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
