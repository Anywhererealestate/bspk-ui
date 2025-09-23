import './button-dock.scss';
import { Button, ButtonProps } from '-/components/Button/Button';

export type ButtonDockProps = {
    /**
     * The buttons in the dock. NOTE: only for use with two or fewer buttons.
     *
     * @required
     */
    buttonData: { id: string; props: ButtonProps }[];
    /**
     * If more than one button is provided defines how the buttons should be arranged.
     *
     * @default: fill
     */
    arrangement?: 'fill' | 'spread';
    /**
     * If the dock should be render inline or fixed to the bottom of the viewport.
     *
     * @default: inline
     */
    mode?: 'fixed' | 'inline';
};

/**
 * A sticky or fixed bar containing action buttons that are to remain on the screen while the page scrolls. Alternative
 * option to house the bar within the bottom of a page’s body content.
 *
 * @example
 *     import { ButtonDock } from '@bspk/ui/ButtonDock';
 *
 *     function Example() {
 *         return (
 *             <ButtonDock
 *                 buttonData={[
 *                     {
 *                         id: '1',
 *                         props: {
 *                             children: 'Cancel',
 *                             label: 'cancel',
 *                             variant: 'secondary',
 *                         },
 *                     },
 *                     {
 *                         id: '2',
 *                         props: {
 *                             children: 'Send',
 *                             label: 'send',
 *                         },
 *                     },
 *                 ]}
 *             />
 *         );
 *     }
 *
 * @name ButtonDock
 * @phase Dev
 */
export function ButtonDock({ buttonData, arrangement = 'fill', mode = 'inline' }: ButtonDockProps) {
    const finalArrangement = buttonData.length > 1 ? arrangement : 'fill';

    return (
        <span data-arrangement={finalArrangement} data-bspk="button-dock" data-mode={mode}>
            {buttonData.map(({ id, props }) => (
                <Button key={id} {...props} />
            ))}
        </span>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
