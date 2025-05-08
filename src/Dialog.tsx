import { css } from '@emotion/react';
import { FocusTrap } from 'focus-trap-react';
import { ReactNode, Ref, useCallback, useEffect, useRef, useState } from 'react';

import { Portal } from './Portal';
import { useId } from './hooks/useId';
import { useOutsideClick } from './hooks/useOutsideClick';

import { CommonProps, ElementProps } from './';

export type DialogProps = CommonProps<'id'> & {
    /** The content of the dialog. */
    children?: ReactNode;
    /** A ref to the dialog element. */
    innerRef?: Ref<HTMLDivElement>;
    /**
     * If the dialog should appear.
     *
     * @default false
     */
    open?: boolean;
    /**
     * Function to call when the dialog is closed.
     *
     * @type () => void
     * @required
     */
    onClose: () => void;
    /**
     * The placement of the dialog on the screen.
     *
     * @default center
     */
    placement?: 'bottom' | 'center' | 'left' | 'right' | 'top';
    /**
     * Whether the dialog should have a scrim behind it.
     *
     * @default false
     */
    hideScrim?: boolean;
};

/**
 * Dialogs display important information that users need to acknowledge. They appear over the interface and block
 * further interactions until an action is selected.
 *
 * @name Dialog
 */
function Dialog({
    //
    children,
    innerRef,
    onClose,
    open,
    placement = 'center',
    hideScrim,
    id: idProp,
    ...containerProps
}: ElementProps<DialogProps, 'div'>) {
    const id = useId(idProp);
    const boxRef = useRef<HTMLDivElement | null>(null);
    const [visibility, setVisibilityState] = useState<'hidden' | 'hiding' | 'show' | 'showing'>(
        open ? 'show' : 'hidden',
    );

    const prevVisibility = useRef(visibility);

    const setVisibility = useCallback((next: typeof visibility) => {
        setVisibilityState((prev) => {
            prevVisibility.current = prev;
            return next;
        });
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => e.key === 'Escape' && onClose(), [onClose]);

    useEffect(() => {
        if (open) {
            if (prevVisibility.current.startsWith('show')) return;
            setVisibility('showing');
            return;
        }

        if (prevVisibility.current.startsWith('hid')) return;
        setVisibility('hiding');
    }, [open, setVisibility]);

    useEffect(() => {
        if (prevVisibility.current === visibility) return;

        if (visibility === 'showing') {
            document.body.style.overflow = 'hidden';
            setTimeout(() => setVisibility('show'), 10);
        }

        if (visibility === 'hiding') {
            document.body.style.overflow = '';
            setTimeout(() => setVisibility('hidden'), 10);
        }
    }, [setVisibility, visibility]);

    useEffect(() => {
        if (visibility.startsWith('hid')) return;

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown, visibility]);

    useOutsideClick([boxRef.current], onClose, !open);

    return (
        visibility !== 'hidden' && (
            <Portal>
                <div
                    {...containerProps}
                    css={style}
                    data-dialog-root=""
                    data-placement={placement}
                    data-visibility={visibility}
                    id={id}
                    ref={innerRef}
                    role="presentation"
                >
                    {!hideScrim && <div aria-hidden="true" data-dialog-backdrop />}
                    <FocusTrap
                        focusTrapOptions={{
                            fallbackFocus: () => boxRef.current!,
                            clickOutsideDeactivates: true,
                        }}
                    >
                        <div
                            data-dialog-box
                            ref={(node) => {
                                boxRef.current = node;
                            }}
                            tabIndex={-1}
                        >
                            {children}
                        </div>
                    </FocusTrap>
                </div>
            </Portal>
        )
    );
}

Dialog.bspkName = 'Dialog';

export { Dialog };

export const style = css`
    position: fixed;
    inset: 0;
    z-index: var(--z-index-dialog);

    [data-dialog-box] {
        text-align: start;
        position: relative;
        border-radius: var(--radius-large);
        box-shadow: var(--drop-shadow-float);
        background: var(--surface-neutral-t1-base);
        color: var(--foreground-neutral-on-surface);
        max-height: calc(100vh - var(--spacing-sizing-24));
        overflow: scroll;
        z-index: 2;

        > :first-of-type {
            margin-top: 0;
        }

        > :last-child {
            margin-bottom: 0;
        }

        // we make the width responsive to the viewport
        @media (min-width: 640px) {
            width: 90%;
        }

        @media (min-width: 768px) {
            width: 80%;
        }

        @media (min-width: 1024px) {
            width: 60%;
        }

        @media (min-width: 1280px) {
            width: 50%;
        }
    }

    [data-dialog-backdrop] {
        z-index: 1;
        position: fixed;
        inset: 0;
        background-color: var(--background-scrim);
        opacity: 0;
        transition: opacity 0.3s;
    }

    &[data-visibility='show'] {
        [data-dialog-backdrop] {
            opacity: 1;
        }
    }

    &[data-placement='center'] {
        display: flex;
        justify-content: center;
        align-items: center;

        [data-dialog-box] {
            transition: opacity 1s;
            opacity: 0;
        }

        &[data-visibility='show'] {
            [data-dialog-box] {
                opacity: 1;
            }
        }
    }

    &[data-placement='bottom'] {
        [data-dialog-box] {
            position: absolute;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            width: 600px;
            left: 50%;
            transform: translateX(-50%);
            bottom: -100vh;
            transition: bottom 0.3s;
        }

        &[data-visibility='show'] {
            [data-dialog-box] {
                bottom: 0;
            }
        }
    }

    &[data-placement='top'] {
        [data-dialog-box] {
            position: absolute;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            width: 600px;
            left: 50%;
            transform: translateX(-50%);
            top: -100vh;
            transition: top 0.3s;
        }

        &[data-visibility='show'] {
            [data-dialog-box] {
                top: 0;
            }
        }
    }

    &[data-placement='left'] {
        [data-dialog-box] {
            position: absolute;
            max-height: unset;
            width: 280px;
            height: 100vh;
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
            left: -100vw;
            transition: left 0.3s;
        }

        &[data-visibility='show'] {
            [data-dialog-box] {
                left: 0;
            }
        }
    }

    &[data-placement='right'] {
        [data-dialog-box] {
            position: absolute;
            max-height: unset;
            width: 280px;
            height: 100vh;
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
            right: -100vw;
            transition: right 0.3s;
        }

        &[data-visibility='show'] {
            [data-dialog-box] {
                right: 0;
            }
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
