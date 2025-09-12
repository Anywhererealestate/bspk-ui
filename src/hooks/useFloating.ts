/**
 * Custom hook to manage the positioning of a floating element relative to a reference element.
 *
 * This hook uses the Floating UI library to compute the position of the floating element based on the reference
 * element's position and the specified placement, strategy, and offset options.
 *
 * @template ReferenceType - The type of the reference element, extending HTMLElement.
 * @param {Object} params - The parameters for the hook.
 * @param {Placement} params.placement - The preferred placement of the floating element.
 * @param {React.MutableRefObject<HTMLElement | null>} [params.arrowRef] - A ref object for the arrow element.
 * @param {Strategy} [params.strategy] - The positioning strategy ('absolute' or 'fixed').
 * @param {OffsetOptions} [params.offsetOptions=0] - The offset options for the floating element. Default is `0`
 * @param {boolean} [params.refWidth] - Whether to match the width of the floating element to the reference element.
 * @param {boolean} [params.hide=false] - Whether to hide the floating element. Default is `false`
 */
import {
    ComputePositionReturn,
    Placement,
    Strategy,
    MiddlewareData,
    OffsetOptions,
    MiddlewareState,
    computePosition,
    arrow,
    offset,
    flip,
    autoUpdate,
    size,
} from '@floating-ui/dom';
import { useCallback, useEffect, useState } from 'react';

import { useTimeout } from './useTimeout';

export type { Placement, Strategy };

const TRANSITION_DELAY = 250;

export type UseFloatingProps = {
    /**
     * The preferred placement of the floating element.
     *
     * This determines where the floating element will be positioned relative to the reference element.
     *
     * @default bottom-start
     */
    placement?: Placement;
    /** A ref object for the arrow element. */
    arrowRef?: React.MutableRefObject<HTMLElement | null>;
    /**
     * The positioning strategy ('absolute' or 'fixed').
     *
     * When set to 'fixed', the floating element will be positioned relative to the viewport.
     *
     * When set to 'absolute', the floating element will be positioned relative to the nearest positioned ancestor.
     *
     * @default fixed
     */
    strategy?: Strategy;
    /**
     * The offset options for the floating element.
     *
     * @default 0
     */
    offsetOptions?: OffsetOptions;
    /**
     * When set to true, the width of the floating element will match the width of the reference element.
     *
     * @default false
     */
    refWidth?: boolean;
    /** Whether to hide the floating element. */
    hide?: boolean;
};

export type UseFloatingElements<ReferenceElementType extends HTMLElement = HTMLElement> = {
    reference: ReferenceElementType | null;
    floating: HTMLElement | null;
    setReference: (element: ReferenceElementType | null) => void;
    setFloating: (element: HTMLElement | null) => void;
};

/**
 *
 *
 * @param param0
 * @returns
 */
export function useFloating<ReferenceElementType extends HTMLElement = HTMLElement>({
    placement = 'bottom-start',
    arrowRef,
    strategy = 'fixed',
    offsetOptions = 0,
    refWidth = false,
    hide = false,
}: UseFloatingProps): {
    elements: UseFloatingElements<ReferenceElementType>;
    floatingStyles: React.CSSProperties;
    middlewareData: MiddlewareData;
} {
    const [floatingStyles, setFloatingStylesState] = useState<React.CSSProperties>({
        opacity: 0,
        pointerEvents: 'none',
        display: 'none',
    });

    const setFloatingStyles = (next: (prev: React.CSSProperties) => React.CSSProperties) => {
        setFloatingStylesState((prev) => ({
            transition: `opacity ${TRANSITION_DELAY}ms`,
            ...next(prev),
        }));
    };

    const [middlewareData, setMiddlewareData] = useState<MiddlewareData>({});

    const [referenceElement, setReferenceElement] = useState<ReferenceElementType | null>(null);

    const [floatingElement, setFloatingElement] = useState<HTMLElement | null>(null);

    const computeDebounce = useTimeout();
    const transitionDelay = useTimeout();

    const compute = useCallback(() => {
        computeDebounce.clear();
        transitionDelay.clear();

        // check if the reference or floating element is null
        if (referenceElement === null || floatingElement === null) return;

        if (hide) {
            if (floatingElement?.style.top)
                setFloatingStyles((prev) => ({
                    ...prev,
                    display: undefined,
                    opacity: 0,
                    pointerEvents: 'none',
                }));

            transitionDelay.set(() => {
                setFloatingStyles((prev) => ({
                    ...prev,
                    display: 'none',
                }));
            }, TRANSITION_DELAY);
            return;
        }

        // debounce the computePosition call

        computeDebounce.set(() => {
            // check again if the reference or floating element is null
            if (hide || referenceElement === null || floatingElement === null) return;

            computePosition(referenceElement, floatingElement, {
                placement: placement,
                strategy,
                middleware: [
                    arrowRef?.current && arrow({ element: arrowRef.current, padding: 8 }),
                    offset(offsetOptions),
                    flip(),
                    size({
                        apply({ rects, elements }: MiddlewareState) {
                            Object.assign(elements.floating.style, {
                                width: refWidth ? `${rects.reference.width}px` : undefined,
                            });
                        },
                    }),
                ],
            }).then((value: ComputePositionReturn) => {
                setFloatingStyles(() => ({
                    top: value.y,
                    left: value.x,
                    position: value.strategy,
                    opacity: 0,
                    pointerEvents: 'none',
                    display: undefined,
                }));

                transitionDelay.set(() => {
                    setFloatingStyles((prev) => ({
                        ...prev,
                        opacity: 1,
                        pointerEvents: 'auto',
                        display: undefined,
                    }));
                }, 10);

                setMiddlewareData(value.middlewareData);
            });
        }, 10);
    }, [
        computeDebounce,
        transitionDelay,
        referenceElement,
        floatingElement,
        hide,
        placement,
        strategy,
        arrowRef,
        offsetOptions,
        refWidth,
    ]);

    useEffect(() => {
        compute();
        return () => {
            computeDebounce.clear();
            transitionDelay.clear();
        };
    }, [compute, computeDebounce, hide, transitionDelay]);

    useEffect(() => {
        if (hide || referenceElement === null || floatingElement === null) return;

        const cleanup = autoUpdate(referenceElement, floatingElement, compute);

        return () => {
            cleanup();
        };
    }, [compute, hide, floatingElement, referenceElement]);

    return {
        elements: {
            reference: referenceElement,
            floating: floatingElement,
            setReference: setReferenceElement,
            setFloating: setFloatingElement,
        },
        floatingStyles,
        middlewareData,
    };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
