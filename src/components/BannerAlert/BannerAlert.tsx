import './banner-alert.scss';
import { SvgCheckCircleFill } from '@bspk/icons/CheckCircleFill';
import { SvgClose } from '@bspk/icons/Close';
import { SvgErrorFill } from '@bspk/icons/ErrorFill';
import { SvgInfoFill } from '@bspk/icons/InfoFill';
import { SvgWarningFill } from '@bspk/icons/WarningFill';
import { Button } from '-/components/Button';
import { ElementProps, AlertVariant, CallToActionButton } from '-/types/common';

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
 *             callToAction={{
 *                 label = 'Click me',
 *                 onClick = () => action('Call to action clicked!'),
 *             }}
 *         />;
 *     }
 *
 * @exampleDescription This example shows how to use the BannerAlert component with an error variant, a header, and a body message.
 *
 * @name BannerAlert
 *
 * @phase UXReview
 */
export function BannerAlert({
    variant = 'informational',
    onClose,
    header,
    callToAction,
    body,
    elevated = false,
}: ElementProps<BannerAlertProps, 'div'>) {
    return (
        <div data-bspk="banner-alert" data-elevated={elevated || undefined} data-variant={variant} role="alert">
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
                            <Button
                                icon={<SvgClose />}
                                iconOnly
                                label="Close"
                                onClick={onClose}
                                size="small"
                                variant="tertiary"
                            />
                        )}
                    </header>
                )}
                <div data-body>
                    <span>{body}</span>
                    {callToAction?.label && callToAction?.onClick && (
                        <Button
                            label={callToAction.label}
                            onClick={callToAction.onClick}
                            size="small"
                            variant="tertiary"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
