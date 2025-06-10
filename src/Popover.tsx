import './popover.scss';
import { SvgClose } from '@bspk/icons/Close';
import { ReactElement, cloneElement, useId, useMemo, useRef, useState } from 'react';

import { Button } from './Button';
import { Portal } from './Portal';
import { Txt } from './Txt';
import { Placement, useFloating } from './hooks/useFloating';
import { useOutsideClick } from './hooks/useOutsideClick';

import { CallToActionButton, CommonProps } from './';

export type PopoverProps = CommonProps<'disabled'> & {
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
     * A single element that will trigger the popover when clicked.
     *
     * @type ReactElement
     * @required
     */
    children: ReactElement;
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
 */
function Popover({ placement = 'top', header, content, callToAction, children, disabled = false }: PopoverProps) {
    const id = useId();
    const [show, setShow] = useState(false);
    const arrowRef = useRef<HTMLElement | null>(null);

    const { elements, floatingStyles, middlewareData } = useFloating({
        placement: placement,
        strategy: 'absolute',
        offsetOptions: 22,
        arrowRef,
        hide: !show,
    });

    useOutsideClick([elements.floating], () => setShow(false));

    const child = useMemo(
        () =>
            !disabled &&
            children &&
            cloneElement(children, {
                onClick: () => setShow((prev) => !prev),
                'aria-describedby': id,
            }),
        [children, disabled, id],
    );

    return disabled ? (
        children
    ) : (
        <>
            {child}
            <Portal>
                <div
                    data-bspk="popover"
                    data-placement={middlewareData?.offset?.placement}
                    id={id}
                    ref={(node) => {
                        elements.setFloating(node);
                        elements.setTrigger(document.querySelector<HTMLElement>(`[aria-describedby="${id}"]`));
                    }}
                    style={floatingStyles}
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
                        {callToAction?.label && callToAction?.onClick && (
                            <Button
                                data-call-to-action
                                label={callToAction.label}
                                onClick={callToAction.onClick}
                                size="small"
                                variant="secondary"
                            />
                        )}
                    </div>
                    <div
                        data-arrow
                        ref={(node) => {
                            arrowRef.current = node;
                        }}
                        style={{
                            left: `${middlewareData?.arrow?.x}px`,
                            top: `${middlewareData?.arrow?.y}px`,
                        }}
                    />
                </div>
            </Portal>
        </>
    );
}

Popover.bspkName = 'Popover';

export { Popover };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
