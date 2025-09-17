import React from 'react';
import { Toast, ToastProps, useToast } from '.';
import { Button } from '-/components/Button';
import { ComponentExample } from '-/utils/demo';

export const ToastExample: ComponentExample<ToastProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props }) => (
        <Toast defaultTimeout={props.defaultTimeout || 5000} maxToasts={props.maxToasts}>
            <ExampleForm />
        </Toast>
    ),
    sections: [],
    variants: {},
};

function ExampleForm() {
    const { showToast } = useToast();

    return (
        <div data-button-wrapper="">
            <Button
                label="Open Toast!"
                onClick={() =>
                    showToast({
                        message: 'This is an accessible toast!',
                        actionLabel: 'Undo',
                        // onAction: () => console.log('Undo!'),
                    })
                }
                size="medium"
                title="Snackbar"
            />
        </div>
    );
}
