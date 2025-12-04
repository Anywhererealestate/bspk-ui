import { useRef } from 'react';

import { Txt } from '-/components/Txt';
import { ElementProps } from '-/types/common';

const dimension = (value: number | string) => (typeof value === 'number' ? `${value}px` : `${value}`);

export type ExamplePlaceholderProps = {
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
    /** An optional label for the placeholder. */
    label?: string;
};

/**
 * A utility component that serves as a placeholder for examples.
 *
 * @name ExamplePlaceholder
 * @phase Utility
 */
export function ExamplePlaceholder({
    height = 100,
    width = '100%',
    label,
    ...props
}: ElementProps<ExamplePlaceholderProps, 'div'>) {
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <div
            {...props}
            data-bspk-utility="example-placeholder"
            ref={ref}
            style={{
                flexDirection: 'column',
                gap: 'var(--spacing-sizing-01)',
                width: dimension(width),
                height: dimension(height),
                border: 'var(--spacing-sizing-01) dashed var(--foreground-neutral-disabled-on-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                ...props.style,
            }}
        >
            {label ? (
                <Txt variant="body-large">{label}</Txt>
            ) : (
                <>
                    <Txt variant="labels-large">{dimension(width)}</Txt>
                    <Txt>&times;</Txt>
                    <Txt variant="labels-large">{dimension(height)}</Txt>
                </>
            )}
        </div>
    );
}
