import { Drawer, DrawerProps } from '.';
import { Button } from '-/components/Button';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<DrawerProps>[] = [
    {
        label: 'Left Responsive',
        propState: { closeButton: true, modal: false, placement: 'left', children: <></> },
    },
    {
        label: 'Right Responsive',
        propState: { closeButton: true, modal: false, placement: 'right', children: <></> },
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
        const label = 'Open Drawer';
        const handleOnClose = () => {
            action('Drawer closed');
            setState({ open: false });
        };

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
                            <Button label={label} onClick={() => setState({ open: true })} />
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
                            <Button label={label} onClick={() => setState({ open: true })} />
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
                            <Button label={label} onClick={() => setState({ open: true })} />
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
