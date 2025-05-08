import { css } from '@emotion/react';

export type ImageProps = {
    /**
     * The content of the image.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name Image
 */
function Image({ children }: ImageProps) {
    return (
        <div css={style} data-image>
            {children}
        </div>
    );
}

Image.bspkName = 'Image';

export { Image };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
