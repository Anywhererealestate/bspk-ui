import { IconName } from '@bspk/icons';
import { clearSnackbar, sendSnackbar } from './Manager';
import { Snackbar, SnackbarProps } from './Snackbar';
import { Button } from '-/components/Button';
import { ComponentExample } from '-/utils/demo';

export const SnackbarExample: ComponentExample<SnackbarProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props, setState }) => {
        return (
            <>
                <Snackbar {...props} onClose={() => setState({ open: false })} />
                <Button
                    label="Launch Inline Snackbar"
                    onClick={() => setState({ open: true })}
                    size="medium"
                    title="Snackbar"
                />
                <br />
                <Button
                    label="Launch Managed Snackbar"
                    onClick={() =>
                        sendSnackbar({
                            ...props,
                            text: `Managed: ${props.text}`,
                            icon: 'icon:icon-name' in props ? (props['icon:icon-name'] as IconName) : undefined,
                        })
                    }
                />
                <br />
                <Button label="Clear Managed Snackbar" onClick={() => clearSnackbar()} />
            </>
        );
    },
    sections: [],
    variants: false,
};
