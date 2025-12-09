import { useState } from 'react';
import { Drawer, DrawerProps } from '.';
import { Button } from '-/components/Button';
import { ExamplePlaceholder } from '-/components/ExamplePlaceholder';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<DrawerProps>[] = [
    {
        label: 'Left Responsive',
        propState: { closeButton: true, modal: false, placement: 'left', children: null },
    },
    {
        label: 'Right Responsive',
        propState: { closeButton: true, modal: false, placement: 'right', children: null },
    },
];

export const DrawerExample: ComponentExampleFn<DrawerProps> = ({ action }) => ({
    containerStyle: {
        height: '300px',
        width: '100%',
        padding: 0,
        overflow: 'hidden', // hides box-shadow of drawer
    },
    presets,
    render: ({ props, preset, setState, Component }) => {
        if (!preset) return null;
        const handleOnClose = () => {
            action('Drawer closed');
            setState({ open: false });
        };

        const toggleButton = <Button label="Toggle Drawer" onClick={() => setState({ open: !props.open })} />;

        switch (preset.label) {
            case 'Left Responsive':
                return (
                    <>
                        <Drawer {...props} onClose={handleOnClose}>
                            <div style={{ width: '280px' }}>
                                Hello, <br /> I am a {props.placement}, responsive drawer!
                            </div>
                        </Drawer>

                        <div
                            style={{
                                transition: 'margin 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                marginLeft: props.open ? `280px` : 0,
                            }}
                        >
                            {toggleButton}
                        </div>
                    </>
                );
            case 'Right Responsive':
                return (
                    <>
                        <div
                            style={{
                                transition: 'margin 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                marginRight: props.open ? `280px` : 0,
                            }}
                        >
                            {toggleButton}
                        </div>
                        <Drawer {...props} onClose={handleOnClose}>
                            <div style={{ width: '280px' }}>
                                Hello, <br /> I am a {props.placement}, responsive drawer!
                            </div>
                        </Drawer>
                    </>
                );
            default:
                return (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-sizing-04)' }}>
                            {toggleButton}
                        </div>
                        <Component
                            data-example-component
                            {...props}
                            closeButton={props.closeButton ?? false}
                            id="exampleId"
                            modal={props.modal ?? true}
                            onClose={handleOnClose}
                            open={props.open ?? false}
                            placement={props.placement ?? 'right'}
                        >
                            <div style={{}}>Hello, I am a ({props.placement}) drawer!</div>
                        </Component>
                    </>
                );
        }
    },
    variants: false,
});

export const Usage = () => {
    const [open, setOpen] = useState(false);

    return (
        <div style={{ width: '100%', height: 180 }}>
            <Button label="Toggle Drawer" onClick={() => setOpen(!open)} />
            <Drawer
                closeButton={true}
                header="Example Drawer"
                id="exampleId"
                modal={false}
                onClose={() => setOpen(false)}
                open={open}
                placement="right"
            >
                <ExamplePlaceholder label="Drawer Content" style={{ flexGrow: 1 }} />
            </Drawer>
        </div>
    );
};
