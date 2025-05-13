import { css } from '@emotion/react';

export type AccordionProps = {
    /**
     * The content of the accordion.
     *
     * @required
     */
    children: any;
};

/**
 * Component description coming soon.
 *
 * @name Accordion
 */
function Accordion({ children }: AccordionProps) {
    return (
        <div css={style} data-accordion>
            {children}
        </div>
    );
}

Accordion.bspkName = 'Accordion';

export { Accordion };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
