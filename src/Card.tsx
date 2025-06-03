import './card.scss';
import { ReactNode } from 'react';

export type CardProps = {
    /**
     * The content of the card.
     *
     * @required
     */
    children: ReactNode;
    /**
     * Determines if the padding should be hidden.
     *
     * @default true
     */
    showPadding?: boolean;
    /**
     * Determines how the card border will appear.
     *
     * @default elevated
     */
    variant?: 'elevated' | 'filled' | 'outlined';
};

/**
 * Cards are often rectangular and contain various content, such as text, images, icons, multimedia, and interactive
 * elements.
 *
 * They are similar in size and shape to playing cards and are intended to encourage users to click or tap to view more
 * details.
 *
 * @example
 *     import { Card } from '@bspk/ui/card';
 *
 *     export function Example() {
 *         return (
 *             <Card variant="elevated" showPadding={false}>
 *                 <h3>Card Title</h3>
 *                 <p>This is some content inside the card.</p>
 *             </Card>
 *         );
 *     }
 *
 * @name Card
 */
function Card({ children, showPadding, variant = 'elevated' }: CardProps) {
    return (
        <div data-bspk="card" data-hide-padding={showPadding === false || undefined} data-variant={variant}>
            {children}
        </div>
    );
}

Card.bspkName = 'Card';

export { Card };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
