import { ComponentExample, createUid } from '-/utils/demo';

export const RadioExample: ComponentExample = {
    defaultState: {
        'aria-label': 'radio aria-label',
    },
    render: ({ props, Component }) => <Component {...props} name={createUid('radio')} />,
};
