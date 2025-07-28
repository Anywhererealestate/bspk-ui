import { SvgVolumeUpFill } from '@bspk/icons/VolumeUpFill';
import { VerticalSliderProps } from '.';
import { ComponentExampleFn } from '-/utils/demo';

export const VerticalSliderExample: ComponentExampleFn<VerticalSliderProps> = () => ({
    render: ({ props, Component }) => {
        return <Component {...props} icon={props.icon ? <SvgVolumeUpFill /> : undefined} />;
    },
    hideVariants: true,
});
