import './empty-state.scss';
import { ReactNode } from 'react';
import { Button } from '-/components/Button';
import { Txt } from '-/components/Txt';
import { CallToActionButton } from '-/types/common';

export type EmptyStateProps = {
    /** The image or icon to display in the empty state. */
    children?: ReactNode;
    /**
     * The header of the empty state.
     *
     * @required
     */
    header: string;
    /**
     * The body of the empty state.
     *
     * @type multiline
     * @required
     */
    body: string;
    /**
     * The text alignment of the body.
     *
     * @default center
     */
    bodyAlign?: 'center' | 'left';
    /**
     * Optional CallToActionButton properties.
     *
     * @type CallToActionButton
     */
    callToAction?: CallToActionButton;
};

/**
 * A design pattern component that indicates to users that system has no content to display.
 *
 * @example
 *     import { EmptyState } from '@bspk/ui/EmptyState';
 *
 *     export function Example() {
 *         return (
 *             <EmptyState body="Example body" header="Example header">
 *                 Example EmptyState
 *             </EmptyState>
 *         );
 *     }
 *
 * @name EmptyState
 * @phase UXReview
 */
export function EmptyState({ children, header, body, callToAction, bodyAlign = 'center' }: EmptyStateProps) {
    return (
        <div data-bspk="empty-state">
            {children}
            <div data-body>
                <Txt as="header" variant="heading-h5">
                    {header}
                </Txt>
                <Txt as="p" style={{ textAlign: bodyAlign }} variant="body-base">
                    {body}
                </Txt>
            </div>
            {callToAction && (
                <Button
                    label={callToAction.label}
                    onClick={callToAction.onClick}
                    size={callToAction.size || 'medium'}
                    variant="primary"
                />
            )}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
