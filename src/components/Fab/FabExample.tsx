import { ButtonExample } from '-/components/Button/ButtonExample';
import { ComponentExample } from '-/utils/demo';

export const presets = ButtonExample.presets || [];

export const FabExample: ComponentExample = {
    containerStyle: { display: 'block', height: '152px', width: '100%' },
    presets,
    variants: false,
};
