import { ComponentExample, ExamplePlaceholder } from '../utils';

export const CardExample: ComponentExample = {
    propRenderOverrides: (state) => ({
        ...state,
        children: (
            <ExamplePlaceholder
                style={{
                    height: '200px',
                    width: '100%',
                    minWidth: '250px',
                }}
            />
        ),
    }),
};
