import { useRef } from 'react';

import { ElementProps } from '-';
import { Txt } from '-/components/Txt';

const dimension = (value: number | string) => (typeof value === 'number' ? `${value}px` : `${value}`);

/**
 * A utility component that serves as a placeholder for examples.
 *
 * @name ExamplePlaceholder
 * @phase Utility
 */
function ExamplePlaceholder({
    hideSize = false,
    height = 100,
    width = '100%',
    direction = 'row',
    ...props
}: ElementProps<
    {
        hideSize?: boolean;
        height?: number | string;
        width?: number | string;
        direction?: 'column' | 'row';
    },
    'div'
>) {
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <div
            {...props}
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

ExamplePlaceholder.bspkName = 'ExamplePlaceholder';

export { ExamplePlaceholder };
