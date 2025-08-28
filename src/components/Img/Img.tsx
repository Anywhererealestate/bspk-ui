import { ElementAttributes } from '-/types/common';

export type ImgProps = ElementAttributes<
    'img',
    {
        /**
         * The URL of the image.
         *
         * @required
         */
        src: string;
        /**
         * The alternative text for the image.
         *
         * @required
         */
        alt: string;
    }
>;

/**
 * The Img component is used to display images on the page.
 *
 * @example
 *     import { Img } from '@bspk/ui/Img';
 *
 *     export function Example() {
 *         return <Img alt="Example alt" src="Example src" />;
 *     }
 *
 * @name Img
 * @phase Backlog
 */
export function Img({ alt, src, attr }: ImgProps) {
    return <img {...attr} alt={alt} data-bspk="img" src={src} />;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
