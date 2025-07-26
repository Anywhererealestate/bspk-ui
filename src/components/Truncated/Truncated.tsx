import { Tooltip } from '-/components/Tooltip';
import { useTruncatedText } from '-/hooks/useTruncatedText';
import { ElementProps, SetRef } from '-/types/common';

export type TruncatedProps = {
    /**
     * The content to render.
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
    /**
     * Bspk data attribute override.
     *
     * @default truncated
     */
    'data-bspk'?: string;
    /** A ref to the truncated element. */
    innerRef?: SetRef<HTMLSpanElement>;
};

/**
 * A utility component that displays a tooltip with the full text when hovered when text is truncated.
 *
 * @name Truncated
 * @phase Utility
 */
function Truncated({
    children,
    label,
    'data-bspk': dataBspk = 'truncated',
    innerRef,
    ...props
}: ElementProps<TruncatedProps, 'span'>) {
    const { setElement, isTruncated } = useTruncatedText();

    const span = (
        <span
            {...props}
            data-bspk={dataBspk}
            ref={(node: HTMLElement | null) => {
                setElement(node);
                innerRef?.(node);
            }}
            style={{ ...props.style, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
            {children}
        </span>
    );

    return isTruncated ? <Tooltip label={label || children}>{span}</Tooltip> : span;
}

Truncated.bspkName = 'Truncated';

export { Truncated };
