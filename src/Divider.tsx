import { css } from '@emotion/react';

import { ElementProps } from './';

export type DividerProps = {
    /**
     * The orientation of the divider.
     *
     * @default horizontal
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The thickness of the divider.
     *
     * @default light
     */
    thickness?: 'heavy' | 'light';
    /**
     * If the divider padding is shown.
     *
     * @default true
     */
    padding?: boolean;
    /**
     * The inset (margin) of the divider. The value is a number between 0 and 12, which corresponds to the spacing
     * sizing variables defined in the theme. The inset is applied to the left and right sides of the divider when the
     * orientation is horizontal, and to the top and bottom when the orientation is vertical.
     *
     * @default 0
     */
    inset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

const insetToVariable = (insetProp: number | string) => {
    const inset = Number(insetProp);
    if (inset === undefined || inset === null || inset < 1 || inset > 12) return '0px';
    return `var(--spacing-sizing-${inset.toString().padStart(2, '0')})`;
};

/**
 * Horizontal thin lines that separates grouped content in a list or other containers with an optional section/group
 * label.
 *
 * Vertical thin lines that separates grouped content or other visual elements within a container.
 *
 * @name Divider
 */
function Divider({
    padding = true,
    orientation = 'horizontal',
    thickness = 'light',
    inset = 0,
    ...props
}: ElementProps<DividerProps, 'div'>) {
    return (
        <div
            {...props}
            aria-orientation={orientation}
            css={style}
            data-divider
            data-hide-padding={!padding || undefined}
            data-orientation={orientation}
            data-thickness={thickness}
            role="separator"
            style={
                {
                    ...props.style,
                    '--inset': insetToVariable(inset),
                } as React.CSSProperties
            }
        />
    );
}

Divider.bspkName = 'Divider';

export { Divider };

export const style = css`
    display: flex;
    background-color: var(--stroke-neutral-low);
    align-self: stretch;
    justify-content: stretch;
    margin: 0;
    padding: 0;
    align-content: stretch;
    content: 'hello';

    --length: calc(100% - var(--inset) * 2);

    &, // default
  &[data-thickness='light'] {
        --line-thickness: 1px;
        --padding: var(--spacing-sizing-02);
    }

    &[data-thickness='heavy'] {
        --line-thickness: 2px;
        --padding: var(--spacing-sizing-04);
    }

    &, // default
  &[data-orientation='horizontal'] {
        width: unset;
        min-height: unset;

        height: var(--line-thickness);
        min-width: var(--length);

        margin: var(--padding) var(--inset);
    }

    &[data-orientation='vertical'] {
        height: unset;
        min-width: unset;

        width: var(--line-thickness);
        min-height: var(--length);

        margin: var(--inset) var(--padding);
    }

    &[data-hide-padding] {
        //
        --padding: 0;
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
