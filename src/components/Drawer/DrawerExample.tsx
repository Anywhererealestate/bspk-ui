import { DrawerProps } from '.';
import { Button } from '-/components/Button';
import { ComponentExample } from '-/utils/demo';

export const DrawerExample: ComponentExample<DrawerProps> = {
    containerStyle: {
        height: '300px',
        width: '100%',
        padding: 0,
        overflow: 'hidden', // hides box-shadow of drawer
    },
    render: ({ props, setState, Component }) => {
        const label = 'Open Drawer';
        return (
            <>
                <Button label={label} onClick={() => setState({ open: true })} />
                <Component {...props} onClose={() => setState({ open: false })}>
                    <div style={{ padding: 'var(--spacing-sizing-04)' }}>Hello, I am a ({props.placement}) drawer!</div>
                </Component>
            </>
        );
    },
    defaultState: {},
    disableProps: [],
    presets: [],
    sections: [],
    variants: false,
};
