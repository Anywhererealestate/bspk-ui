import { useRef } from 'react';

import { Txt } from '-/components/Txt';
import { ElementProps } from '-/types/common';

const dimension = (value: number | string) => (typeof value === 'number' ? `${value}px` : `${value}`);

export type ExamplePlaceholderProps = {
    /**
     * Whether to hide the size text.
     *
     * @default false
     */
    hideSize?: boolean;
    /**
     * The height of the placeholder.
     *
     * @default 100
     * @type string
     */
    height?: number | string;
    /**
     * The width of the placeholder.
     *
     * @default 100%
     * @type string
     */
    width?: number | string;
    /**
     * The direction of the placeholder.
     *
     * @default 'row'
     */
    direction?: 'column' | 'row';
};

/**
 * A utility component that serves as a placeholder for examples.
 *
 * @name ExamplePlaceholder
 * @phase Utility
 */
export function ExamplePlaceholder({
    hideSize = false,
    height = 100,
    width = '100%',
    direction = 'row',
    ...props
}: ElementProps<ExamplePlaceholderProps, 'div'>) {
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <div
            {...props}
            data-bspk-utility="example-placeholder"
            data-example-placeholder
            ref={ref}
            style={{
                ...props.style,
                width: dimension(width),
                height: dimension(height),
                flexDirection: direction,
            }}
        >
            {!hideSize && (
                <>
                    <Txt variant="labels-large">{dimension(width)}</Txt>
                    <Txt>&times;</Txt>
                    <Txt variant="labels-large">{dimension(height)}</Txt>
                </>
            )}
        </div>
    );
}
