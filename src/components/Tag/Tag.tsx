import { Truncated } from '-/components/Truncated';

import { ColorVariant } from '-/utils/colorVariants';

import './tag.scss';

export type TagProps = {
    /**
     * The label of the tag.
     *
     * @required
     */
    label: string;
    /**
     * The size of the tag.
     *
     * @default small
     */
    size?: 'small' | 'x-small';
    /**
     * The color of the tag.
     *
     * @default grey
     */
    color?: ColorVariant;
    /**
     * The display variant of the tag.
     *
     * @default flat
     */
    variant?: 'corner-wrap' | 'flat' | 'pill';
};

/**
 * A non-interactive visual indicators to draw attention or categorization of a component.
 *
 * @example
 *     import { Tag } from '@bspk/ui/Tag';
 *
 *     export function Example() {
 *         return <Tag label="Example Tag" variant="flat" color="primary" />;
 *     }
 *
 * @name Tag
 * @phase UXReview
 */
function Tag({ label, color = 'white', size = 'small', variant = 'flat' }: TagProps) {
    return (
        <div data-bspk="tag" data-color={color} data-size={size} data-variant={variant}>
            {label && <Truncated>{label}</Truncated>}
            {variant === 'corner-wrap' && <div data-triangle />}
        </div>
    );
}

Tag.bspkName = 'Tag';

export { Tag };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
