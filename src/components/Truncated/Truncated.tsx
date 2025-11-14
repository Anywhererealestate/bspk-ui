import { ElementType } from 'react';
import { Tooltip, TooltipTriggerProps } from '-/components/Tooltip';
import { useTruncatedText } from '-/hooks/useTruncatedText';
import { ElementConstructorProps } from '-/types/common';

export type TruncatedProps<As extends ElementType = ElementType> = {
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
};

/**
 * A utility component that displays a tooltip with the full text when hovered when text is truncated.
 *
 * @name Truncated
 * @phase Utility
 */
export function Truncated<As extends ElementType = ElementType>({
    children,
    label,
    ...props
}: ElementConstructorProps<As, 'children'> & TruncatedProps<As>) {
    const { setElement, isTruncated } = useTruncatedText();

    const span = (triggerProps: TooltipTriggerProps) => (
        <span
            {...props}
            data-truncated
            ref={(node) => setElement(node)}
            {...triggerProps}
            role={isTruncated ? 'note' : props.role}
        >
            {children}
        </span>
    );

    return isTruncated ? <Tooltip label={label || children}>{span}</Tooltip> : span({});
}
