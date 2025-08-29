import { Drawer, DrawerProps } from '.';
import { Button } from '-/components/Button';
import { ComponentExample } from '-/utils/demo';

// export const DrawerExample: ComponentExampleFn<DrawerProps> = ({ action }) => ({
export const DrawerExample: ComponentExample<DrawerProps> = {
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
        // const state = preset.open;
        if (!preset) return null;
        const label = 'Open Drawer';
        // const handleOnClose = () => {
        //     action('Drawer closed');
        //     setState({ open: false });
        // };

        switch (preset.label) {
            // case 'Default Modal':
            //     return (
            //         <>
            //             <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-sizing-04)' }}>
            //                 <Button label={label} onClick={() => setState({ open: true })} />
            //             </div>
            //             <Drawer {...props} onClose={() => setState({ open: false })}>
            //                 <div style={{ padding: 'var(--spacing-sizing-04)' }}>
            //                     Hello, I am a ({props.placement}) drawer!
            //                 </div>
            //             </Drawer>
            //         </>
            //     );
            case 'Left Responsive':
                return (
                    <>
                        <Drawer {...props} onClose={() => setState({ open: false })}>
                            <div style={{ padding: 'var(--spacing-sizing-04)', width: '280px' }}>
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
                        <Drawer {...props} onClose={() => setState({ open: false })}>
                            <div style={{ padding: 'var(--spacing-sizing-04)', width: '280px' }}>
                                Hello, <br /> I am a {props.placement}, responsive drawer!
                            </div>
                        </Drawer>
                    </>
                );
            default:
                // return null;
                return (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-sizing-04)' }}>
                            <Button label={label} onClick={() => setState({ open: true })} />
                        </div>
                        <Component {...props} onClose={() => setState({ open: false })}>
                            <div style={{ padding: 'var(--spacing-sizing-04)' }}>
                                Hello, I am a ({props.placement}) drawer!
                            </div>
                        </Component>
                    </>
                );
        }
    },
    // defaultState: {},
    disableProps: [],
    sections: [],
    variants: false,
};
