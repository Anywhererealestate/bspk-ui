import { ComponentExample, createUid } from '../utils';

export const RadioExample: ComponentExample = {
    render: ({ props, Component }) => <Component {...props} name={createUid('radio')} />,
};

export const RadioOptionExample = RadioExample;

export const RadioGroupExample = RadioExample;
