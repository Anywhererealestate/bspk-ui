import { Drawer, DrawerProps } from '.';
import { Button } from '-/components/Button';
import { ComponentExampleFn } from '-/utils/demo';

export const DrawerExample: ComponentExampleFn<DrawerProps> = ({ action }) => ({
    // export const DrawerExample: ComponentExample<DrawerProps> = {
    containerStyle: {
        height: '300px',
        width: '100%',
        padding: 0,
        overflow: 'hidden', // hides box-shadow of drawer
    },
    presets: [
        { label: 'Left Responsive', propState: { placement: 'left', variant: 'temporary' } },
        { label: 'Right Responsive', propState: { placement: 'right', variant: 'temporary' } },
    ],

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
                            id="exampleId"
                            onClose={handleOnClose}
                            open={props.open ?? false}
                            placement={props.placement ?? 'right'}
                            variant={props.variant ?? 'modal'}
                        >
                            <div style={{}}>Hello, I am a ({props.placement}) drawer!</div>
                        </Component>
                    </>
                );
        }
    },
    // defaultState: {},
    disableProps: [],
    sections: [],
    variants: false,
});
