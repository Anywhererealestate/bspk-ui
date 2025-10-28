import { ComponentExample, createUid } from '-/utils/demo';

export const RadioExample: ComponentExample = {
    render: ({ props, Component }) => (
        <Component {...props} aria-label={props['aria-label'] || 'radio aria-label'} name={createUid('radio')} />
    ),
};
