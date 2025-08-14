import { useRef } from 'react';
import { DialogProps } from '.';
import { Button } from '-/components/Button';
import { ComponentExample } from '-/utils/demo';

export const DialogExample: ComponentExample<DialogProps> = {
    render: ({ props, setState, Component }) => {
        const DialogExampleInner = () => {
            const label = 'Open Dialog';
            const buttonRef = useRef<HTMLButtonElement | null>(null);

            return (
                <>
                    <Button
                        id="anchor portal here"
                        innerRef={(instance) => {
                            buttonRef.current = instance;
                        }}
                        label={label}
                        onClick={() => setState({ open: true })}
                    />
                    <Component
                        data-example-component
                        {...props}
                        container={buttonRef.current ?? undefined}
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
