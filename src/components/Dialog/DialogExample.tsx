import { useRef } from 'react';
import { DialogProps } from '.';
import { Button } from '-/components/Button';
import { ComponentExample } from '-/utils/demo';

export const DialogExample: ComponentExample<DialogProps> = {
    render: ({ props, setState, Component }) => {
        const DialogExampleInner = () => {
            const label = 'Open Dialog';
            return (
                <>
                    <Button id="anchor portal here" label={label} onClick={() => setState({ open: true })} />
                    <Component
                        data-example-component
                        {...props}
                        id="exampleId"
                        onClose={() => setState({ open: false })}
                    >
                        <div style={{ padding: 'var(--spacing-sizing-04)' }}>Hello, I am a dialog!</div>
                    </Component>
                </>
            );
        };

        return <DialogExampleInner />;
    },
    variants: false,
};
