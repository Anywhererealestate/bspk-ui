import { Button } from '../../Button';
import { DialogProps } from '../../Dialog';
import { ComponentExample } from '../utils';

export const DialogExample: ComponentExample<DialogProps> = {
    render: ({ props, setState, Component }) => {
        const label = 'Open Dialog';

        const { children, ...modalProps } = props;

        return (
            <>
                <Button label={label} onClick={() => setState({ open: true })} />
                <Component
                    data-example-component
                    id="exampleId"
                    {...modalProps}
                    onClose={() => setState({ open: false })}
                >
                    {children}
                </Component>
            </>
        );
    },
    hideVariants: true,
};
