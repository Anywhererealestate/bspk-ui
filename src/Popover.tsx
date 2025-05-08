import { SvgClose } from '@bspk/icons/Close';
import { css } from '@emotion/react';
import { cloneElement, ReactElement, useId, useMemo, useRef, useState } from 'react';

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
                    css={style}
                    data-placement={middlewareData?.offset?.placement}
                    data-popover=""
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

export const style = css`
    position: absolute;
    z-index: var(--z-index-tooltip-popover);
    background: var(--surface-neutral-t1-base);
    box-shadow: var(--drop-shadow-float);
    padding: var(--spacing-sizing-04);
    width: 300px;
    border-radius: var(--radius-large);
    display: flex;
    flex-direction: column;

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-sizing-02);
        gap: var(--spacing-sizing-04);

        button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            margin: 0 0 0 auto;
            color: var(--foreground-neutral-on-surface-variant-01);
            height: var(--spacing-sizing-06);
            width: var(--spacing-sizing-06);

            svg {
                width: var(--spacing-sizing-06);
                height: var(--spacing-sizing-06);
            }
        }
    }

    --arrow-size: var(--spacing-sizing-02);
    --arrow-offset: calc(var(--arrow-size) * -2);
    --arrow-background-color: var(--surface-neutral-t1-base);

    [data-arrow] {
        z-index: 1;
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: var(--arrow-size) var(--arrow-size) var(--arrow-size) var(--arrow-size);
        border-color: transparent transparent transparent transparent;
    }

    &[data-placement^='top'] {
        [data-arrow] {
            bottom: var(--arrow-offset);
            border-top-color: var(--arrow-background-color);
            filter: drop-shadow(0 2px 1px var(--shadow-10));
        }
    }
    &[data-placement^='right'] {
        [data-arrow] {
            margin-left: calc(var(--arrow-offset) * 2);
            border-right-color: var(--arrow-background-color);
            filter: drop-shadow(-2px 0 1px var(--shadow-10));
        }
    }
    &[data-placement^='bottom'] {
        [data-arrow] {
            top: var(--arrow-offset);
            border-bottom-color: var(--arrow-background-color);
            filter: drop-shadow(0 -2px 1px var(--shadow-10));
        }
    }
    &[data-placement='bottom-start'] {
        [data-arrow] {
            margin-left: var(--arrow-offset);
        }
    }
    &[data-placement='bottom-end'] {
        [data-arrow] {
            margin-left: calc(var(--arrow-offset) * -1);
        }
    }
    &[data-placement^='left'] {
        [data-arrow] {
            right: var(--arrow-offset);
            border-left-color: var(--arrow-background-color);
            filter: drop-shadow(2px 0 1px var(--shadow-10));
        }
    }

    [data-content] {
        gap: var(--spacing-sizing-04);
        display: flex;
        flex-direction: column;
    }

    [data-call-to-action] {
        margin: 0 0 0 auto;
        /* background: none;
    border: none;
    cursor: pointer;
    padding: 0 var(--spacing-sizing-03);
    height: var(--spacing-sizing-12);
    font: var(--labels-small);
    color: var(--foreground-brand-primary); */
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
