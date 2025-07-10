import { SvgCheckCircleFill } from '@bspk/icons/CheckCircleFill';
import { SvgClose } from '@bspk/icons/Close';
import { SvgErrorFill } from '@bspk/icons/ErrorFill';
import { SvgInfoFill } from '@bspk/icons/InfoFill';
import { SvgWarningFill } from '@bspk/icons/WarningFill';

import { ElementProps, AlertVariant, CallToActionButton } from '-/types/common';
import './banner-alert.scss';

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
     * The body of the banner alert.
     *
     * @type multiline
     * @required
     */
    body: string;
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
 * @example
 *     import { BannerAlert } from '@bspk/ui/BannerAlert';
 *
 *     function Example() {
 *         <BannerAlert
 *             variant="error"
 *             header="Error"
 *             body="There was an error processing your request."
 *             onClose={() => console.log('Alert closed')}
 *         />;
 *     }
 *
 * @exampleDescription This example shows how to use the BannerAlert component with an error variant, a header, and a body message.
 *
 *
 *
 *
 * @name BannerAlert
 * @phase DesignReview
 */
function BannerAlert({
    variant = 'informational',
    onClose,
    header,
    callToAction,
    body,
    elevated = false,
}: ElementProps<BannerAlertProps, 'div'>) {
    return (
        <article data-bspk="banner-alert" data-elevated={elevated || undefined} data-variant={variant}>
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
                    <span>{body}</span>
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
