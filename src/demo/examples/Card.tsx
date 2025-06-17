import { ComponentExample, ExamplePlaceholder } from '../utils';

export const CardExample: ComponentExample = {
    render: ({ props, Component }) => (
        <Component {...props}>
            <ExamplePlaceholder
                style={{
                    height: '200px',
                    width: '100%',
                    minWidth: '250px',
                }}
            />
        </Component>
    ),
};
