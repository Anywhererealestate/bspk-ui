import { LayoutProps } from './Layout';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<LayoutProps>[] = [];

export const LayoutExample: ComponentExample<LayoutProps> = {
    render: ({ props, Component }) => {
        return (
            <Component {...props}>
                <div>Alpha</div>
                <div>Beta</div>
                <div>Gamma</div>
            </Component>
        );
    },
    presets,
};
