import { css } from '@emotion/react';
import { cloneElement, ReactElement, useId, useMemo, useRef, useState } from 'react';

import { Portal } from './Portal';
import { Placement, useFloating } from './hooks/useFloating';

export type TooltipProps = {
    /**
     * The placement of the tooltip.
     *
     * @default top
     */
    placement?: Placement;
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
    tail?: boolean;
};

/**
 * Brief message that provide additional guidance and helps users perform an action if needed.
 *
 * @name Tooltip
 */
function Tooltip({ placement = 'top', label, children, disabled = false, tail = true }: TooltipProps) {
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
        offsetOptions: 8,
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
                        css={style}
                        data-placement={middlewareData?.offset?.placement}
                        data-tooltip=""
                        id={id}
                        ref={(node) => {
                            elements.setFloating(node);
                            elements.setTrigger(document.querySelector<HTMLElement>(`[aria-describedby="${id}"]`));
                        }}
                        role="tooltip"
                        style={floatingStyles}
                    >
                        <span data-text>{label}</span>
                        {tail !== false && (
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

export const style = css`
    position: fixed;
    pointer-events: none;
    z-index: var(--z-index-tooltip-popover);

    [data-text] {
        display: block;
        z-index: 2;
        position: relative;
        background-color: var(--surface-neutral-inverse);
        border-radius: var(--radius-small);
        color: var(--foreground-neutral-on-inverse-surface);
        box-shadow: var(--drop-shadow-float);
        font: var(--labels-small);
        padding: var(--spacing-sizing-01) var(--spacing-sizing-02);
        border: none;
        transition: opacity 0.2s ease-in-out;
        width: max-content;
    }

    --arrow-size: var(--spacing-sizing-01);
    --arrow-offset: calc(var(--arrow-size) * -2);

    [data-arrow] {
        display: block;
        z-index: 1;
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: var(--arrow-size) var(--arrow-size) var(--arrow-size) var(--arrow-size);
        border-color: transparent transparent transparent transparent;
    }

    &[data-placement^='bottom'] {
        [data-arrow] {
            top: var(--arrow-offset);
            border-bottom-color: var(--surface-neutral-inverse);
        }
    }

    &[data-placement^='top'] {
        [data-arrow] {
            border-top-color: var(--surface-neutral-inverse);
        }
    }

    &[data-placement^='right'] {
        [data-arrow] {
            margin-left: var(--arrow-offset);
            border-right-color: var(--surface-neutral-inverse);
        }
    }

    &[data-placement^='left'] {
        [data-arrow] {
            right: var(--arrow-offset);
            border-left-color: var(--surface-neutral-inverse);
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
