import { ComponentExample, createUid } from '-/utils/demo';

export const presets = [];

export const RadioExample: ComponentExample = {
    render: ({ props, Component }) => <Component {...props} name={createUid('radio')} />,
    presets,
};
