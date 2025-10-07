import { ExamplePlaceholder } from '-/components/ExamplePlaceholder';
import { ComponentExample } from '-/utils/demo';

export const CardExample: ComponentExample = {
    render: ({ props, Component }) => (
        <Component {...props}>
            <ExamplePlaceholder
                style={{
                    height: '200px',
                    width: '100%',
                    minWidth: '250px',
                    backgroundColor: 'unset',
                }}
            />
        </Component>
    ),
};
