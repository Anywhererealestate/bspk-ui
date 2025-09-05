import { ElementProps } from '-/types/common';

export type ImgProps = {
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
};

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
export function Img({ alt, ...props }: ElementProps<ImgProps, 'img'>) {
    return <img {...props} alt={alt} data-bspk="img" />;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
