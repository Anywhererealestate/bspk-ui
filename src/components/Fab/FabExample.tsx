import { SvgMenuBook } from '@bspk/icons/MenuBook';
import { FabProps } from './Fab';
import { ButtonExample } from '-/components/Button/ButtonExample';
import { ComponentExample } from '-/utils/demo';

export const presets = ButtonExample.presets || [];

export const FabExample: ComponentExample<FabProps> = {
    containerStyle: { display: 'block', height: '152px', width: '100%' },
    presets: ButtonExample.presets?.map((preset) => ({
        ...preset,
        propState: {
            ...preset.propState,
            size: undefined,
            variant: undefined,
        },
    })),
    defaultState: {
        container: 'local',
        placement: 'bottom-right',
    },
    variants: {
        container: false,
        placement: false,
        iconOnly: {
            icon: <SvgMenuBook />,
            label: 'Menu Book',
        },
    },
};
