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
     * Determines how the card border will appear.
     *
     * @default elevated
     */
    variant?: 'elevated' | 'outlined';
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
 *     function Example() {
 *         return (
 *             <Card variant="elevated" showPadding={false}>
 *                 <h3>Card Title</h3>
 *                 <p>This is some content inside the card.</p>
 *             </Card>
 *         );
 *     }
 *
 * @name Card
 *
 * @phase UXReview
 */
export function Card({ children, variant = 'elevated' }: CardProps) {
    return (
        <div data-bspk="card" data-variant={variant}>
            {children}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
