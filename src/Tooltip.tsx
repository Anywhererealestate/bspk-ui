import './tooltip.scss';
import { ReactElement, cloneElement, useId, useMemo, useRef, useState } from 'react';

import { Portal } from './Portal';
import { Placement, useFloating } from './hooks/useFloating';

const DEFAULT = {
    placement: 'top',
    showTail: true,
    disabled: false,
} as const;

export type TooltipProps = {
    /**
     * The placement of the tooltip.
     *
     * @default top
     */
    placement?: Extract<Placement, 'bottom' | 'left' | 'right' | 'top'>;
    /** The tooltip content. */
    label: string;
    /**
     * A single element that will trigger the tooltip when hovered over.
     *
     * @type ReactElement
     * @required
     */
    children: ReactElement;
    /** Determines if the tooltip is disabled. */
    disabled?: boolean;
    /**
     * Determines if the tooltip should hide the tail.
     *
     * @default true
     */
    showTail?: boolean;
};

/**
 * Brief message that provide additional guidance and helps users perform an action if needed.
 *
 * @name Tooltip
 */
function Tooltip({
    placement = DEFAULT.placement,
    label,
    children,
    disabled = DEFAULT.disabled,
    showTail = DEFAULT.showTail,
}: TooltipProps) {
    const id = useId();
    const [show, setShow] = useState(false);

    const child = useMemo(
        () =>
            !disabled &&
            children &&
            cloneElement(children, {
                onMouseOver: () => setShow(true),
                onMouseLeave: () => setShow(false),
                'aria-describedby': id,
            }),
        [children, disabled, id],
    );

    const arrowRef = useRef<HTMLElement | null>(null);

    const { floatingStyles, middlewareData, elements } = useFloating({
        placement: placement,
        strategy: 'fixed',
        offsetOptions: 4,
        arrowRef,
        hide: !show,
    });

    return disabled ? (
        children
    ) : (
        <>
            {child}
            {label && (
                <Portal>
                    <div
                        data-bspk="tooltip"
                        data-placement={middlewareData?.offset?.placement}
                        id={id}
                        ref={(node) => {
                            elements.setFloating(node);
                            elements.setTrigger(document.querySelector<HTMLElement>(`[aria-describedby="${id}"]`));
                        }}
                        role="tooltip"
                        style={floatingStyles}
                    >
                        <span data-text>{label}</span>
                        {showTail !== false && (
                            <span
                                aria-hidden
                                data-arrow
                                ref={(node) => {
                                    arrowRef.current = node;
                                }}
                                style={{
                                    left: `${middlewareData?.arrow?.x}px`,
                                    top: `${middlewareData?.arrow?.y}px`,
                                }}
                            />
                        )}
                    </div>
                </Portal>
            )}
        </>
    );
}

Tooltip.bspkName = 'Tooltip';

export { Tooltip };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
