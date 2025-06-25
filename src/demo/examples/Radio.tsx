import { ComponentExample, createUid } from '../utils';

export const RadioExample: ComponentExample = {
    render: ({ props, Component }) => <Component {...props} name={createUid('radio')} />,
};
