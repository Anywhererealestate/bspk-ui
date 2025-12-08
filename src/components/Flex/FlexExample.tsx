import { Flex, FlexProps } from './Flex';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<FlexProps>[] = [];

export const FlexExample: ComponentExample<FlexProps> = {
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

export const Usage = () => {
    return (
        <Flex gap="24" justify="center" style={{ width: '100%' }}>
            <div>Alpha</div>
            <div>Beta</div>
            <div>Gamma</div>
        </Flex>
    );
};
