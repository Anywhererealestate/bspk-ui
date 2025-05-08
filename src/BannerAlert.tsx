import { SvgCheckCircleFill } from '@bspk/icons/CheckCircleFill';
import { SvgClose } from '@bspk/icons/Close';
import { SvgErrorFill } from '@bspk/icons/ErrorFill';
import { SvgInfoFill } from '@bspk/icons/InfoFill';
import { SvgWarningFill } from '@bspk/icons/WarningFill';
import { css } from '@emotion/react';

import { ElementProps, AlertVariant, CallToActionButton } from './';

export type BannerAlertProps = {
    /**
     * The color variant of the banner alert.
     *
     * @default informational
     */
    variant?: AlertVariant;
    /**
     * The function to call when the banner alert is closed. If not included the close button will not be displayed.
     *
     * @type () => void
     */
    onClose?: () => void;
    /**
     * The header of the banner alert.
     *
     * @required
     */
    header: string;
    /**
     * The children of the banner alert.
     *
     * @type multiline
     * @required
     */
    children: string;
    /**
     * This property may be undefined or an object containing required CallToActionButton properties.
     *
     * @type CallToActionButton
     */
    callToAction?: CallToActionButton;
    /**
     * Is the alert elevated. If true a drop shadow is added.
     *
     * @default false
     */
    elevated?: boolean;
};

/**
 * A visual and contextual message used to communicate an important message or notification to users relating to a
 * status or the body content of a page.
 *
 * @name BannerAlert
 */
function BannerAlert({
    variant = 'informational',
    onClose,
    header,
    callToAction,
    children,
    elevated = false,
}: ElementProps<BannerAlertProps, 'div'>) {
    return (
        <article css={style} data-banner-alert data-elevated={elevated || undefined} data-variant={variant}>
            <div data-icon-bar>
                {variant === 'error' && <SvgErrorFill />}
                {variant === 'informational' && <SvgInfoFill />}
                {variant === 'success' && <SvgCheckCircleFill />}
                {variant === 'warning' && <SvgWarningFill />}
            </div>
            <div data-content>
                {(header || onClose) && (
                    <header>
                        <span>{header}</span>
                        {typeof onClose === 'function' && (
                            <button aria-label="Close" onClick={onClose} type="button">
                                <SvgClose />
                            </button>
                        )}
                    </header>
                )}
                <div data-body>
                    <span>{children}</span>
                    {callToAction?.label && callToAction?.onClick && (
                        <button onClick={callToAction.onClick}>{callToAction.label}</button>
                    )}
                </div>
            </div>
        </article>
    );
}

BannerAlert.bspkName = 'BannerAlert';

export { BannerAlert };

export const style = css`
    --color: var(--status-information);
    --on-color: var(--status-on-information);
    display: flex;
    flex-direction: row;
    border: 2px solid var(--color);
    border-radius: var(--radius-medium);
    box-sizing: border-box;
    background-color: var(--surface-neutral-t1-base);
    width: 100%;

    &[data-variant='error'] {
        --color: var(--status-error);
        --on-color: var(--status-on-error);
    }

    &[data-variant='success'] {
        --color: var(--status-success);
        --on-color: var(--status-on-success);
    }

    &[data-variant='warning'] {
        --color: var(--status-warning);
        --on-color: var(--status-on-warning);
    }

    &[data-elevated] {
        box-shadow: var(--drop-shadow-raise);
    }

    [data-icon-bar] {
        flex: 1;
        padding: var(--spacing-sizing-04) var(--spacing-sizing-03);
        background: var(--color);
        color: var(--on-color);
        svg {
            width: var(--spacing-sizing-06);
            height: var(--spacing-sizing-06);
        }
    }

    [data-content] {
        flex: 100%;
        display: flex;
        flex-direction: column;
        padding: var(--spacing-sizing-02) var(--spacing-sizing-02) var(--spacing-sizing-02) var(--spacing-sizing-04);

        header {
            display: flex;
            flex-direction: row;
            gap: var(--spacing-sizing-03);
            height: var(--spacing-sizing-12);
            align-items: center;

            span {
                flex: 1;
                display: flex;
                align-items: center;
                color: var(--foreground-neutral-on-surface);
                font: var(--heading-h6);

                @media (any-pointer: coarse) {
                    font: var(--heading-h6);
                }
            }

            // close button
            button {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                margin: 0 0 0 auto;
                color: var(--foreground-neutral-on-surface-variant-01);

                height: var(--spacing-sizing-08);
                width: var(--spacing-sizing-08);

                @media (any-pointer: coarse) {
                    height: var(--spacing-sizing-12);
                    width: var(--spacing-sizing-12);
                }

                svg {
                    width: var(--spacing-sizing-04);
                    height: var(--spacing-sizing-04);
                }
            }
        }

        [data-body] {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sizing-02);
            padding: 0 var(--spacing-sizing-02) var(--spacing-sizing-02) 0;

            span {
                font: var(--body-base);
            }

            button {
                margin-left: auto;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0 var(--spacing-sizing-03);
                height: var(--spacing-sizing-12);
                font: var(--labels-small);
            }
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
