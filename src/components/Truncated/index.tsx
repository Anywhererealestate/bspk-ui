import { ElementType } from 'react';

import { Tooltip } from './Tooltip';
import { useTruncatedText } from './hooks/useTruncatedText';

import { ElementConstructorProps } from '@index';

export type TruncatedProps<As extends ElementType = 'span'> = ElementConstructorProps<'span', 'children'> & {
    /**
     * The element type to render as.
     *
     * @default span
     */
    as?: As;
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
};

/**
 * A utility component that displays a tooltip with the full text when hovered when text is truncated.
 *
 * @name Truncated
 * @phase WorkInProgress
 */
function Truncated({ children, label, ...props }: TruncatedProps) {
    const { setElement, isTruncated } = useTruncatedText();

    const span = (
        <span
            {...props}
            data-bspk="truncated"
            ref={(node) => setElement(node)}
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
            {children}
        </span>
    );

    return isTruncated ? <Tooltip label={label || children}>{span}</Tooltip> : span;
}

Truncated.bspkName = 'Truncated';

export { Truncated };
