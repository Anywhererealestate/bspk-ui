import { ElementType } from 'react';

import { Tooltip, TooltipTriggerProps } from '-/components/Tooltip';
import { useTruncatedText } from '-/hooks/useTruncatedText';
import { CommonProps, ElementAttributes } from '-/types/common';

export type TruncatedProps<As extends ElementType = 'span'> = ElementAttributes<
    As,
    CommonProps<'style'> & {
        /**
         * The element type to render as.
         *
         * @default span
         */
        as?: As;
        /**
         * The content to render.
         *
         * @example
         *     Some really long text that might be truncated when displayed in a small container.
         *
         * @type string
         * @required
         */
        children: string;
        /**
         * The label to display in the tooltip when the text is truncated.
         *
         * If not provided, the children will be used as the label.
         */
        label?: string;
    }
>;

/**
 * A utility component that displays a tooltip with the full text when hovered when text is truncated.
 *
 * @name Truncated
 * @phase Utility
 */
export function Truncated<As extends ElementType = 'span'>({
    children,
    label,
    as,
    elementAttributes,
    style,
}: TruncatedProps<As>) {
    const { setElement, isTruncated } = useTruncatedText();
    const As: ElementType = as || 'span';
    const span = (triggerProps: TooltipTriggerProps) => (
        <As
            {...elementAttributes}
            data-bspk-utility="truncated"
            ref={(node: HTMLElement) => setElement(node)}
            style={{
                ...style,
                maxWidth: '100%',
                display: 'inline-block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }}
            {...triggerProps}
        >
            {children}
        </As>
    );

    return isTruncated ? <Tooltip label={label || children}>{span}</Tooltip> : span({});
}
