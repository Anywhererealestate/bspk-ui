import { LayoutProps } from './Layout';
import { ComponentExample } from '-/utils/demo';

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
};
