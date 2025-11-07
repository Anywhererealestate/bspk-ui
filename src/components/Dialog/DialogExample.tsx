import { DialogProps } from '.';
import { Button } from '-/components/Button';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<DialogProps>[] = [];

export const DialogExample: ComponentExample<DialogProps> = {
    scope: { Button },
    render: ({ props, setState, Component }) => {
        const label = 'Open Dialog';
        return (
            <>
                <Button label={label} onClick={() => setState({ open: true })} />
                <Component data-example-component {...props} id="exampleId" onClose={() => setState({ open: false })}>
                    <div style={{ padding: 'var(--spacing-sizing-04)' }}>Hello, I am a ({props.placement}) dialog!</div>
                </Component>
            </>
        );
    },
    variants: false,
    presets,
};
