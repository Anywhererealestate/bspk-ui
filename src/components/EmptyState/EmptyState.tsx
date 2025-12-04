import { ReactNode } from 'react';

import { Button } from '-/components/Button';
import { Flex } from '-/components/Flex';
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
 *     <EmptyState body="Example body" header="Example header">
 *         <ExamplePlaceholder height="200px" width="200px" label="Illustration slot or icon slot" />
 *     </EmptyState>;
 *
 * @name EmptyState
 * @phase Stable
 */
export function EmptyState({ children, header, body, callToAction, bodyAlign = 'center' }: EmptyStateProps) {
    return (
        <Flex align="center" data-bspk="empty-state" direction="column" gap="16">
            {children}
            <Flex align="center" direction="column" gap="4">
                <Txt style={{ textAlign: bodyAlign }} variant="heading-h5">
                    {header}
                </Txt>
                <Txt style={{ textAlign: bodyAlign }} variant="body-base">
                    {body}
                </Txt>
            </Flex>
            {callToAction && (
                <Button
                    label={callToAction.label}
                    onClick={callToAction.onClick}
                    size={callToAction.size || 'medium'}
                    variant="primary"
                />
            )}
        </Flex>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
