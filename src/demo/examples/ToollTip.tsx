import { Button } from '../../Button';
import { ComponentExample } from '../utils';

export const ToolTipExample: ComponentExample = {
    render: ({ props: state, Component }) => {
        return (
            <>
                <Component label="Tooltip text" {...state} placement={[state.placement].flat()[0] || 'top'}>
                    <Button
                        label={`Hover over me ${'data-variant-value' in state ? `(${state['data-variant-value']})` : ''}`}
                        variant="secondary"
                    />
                </Component>
            </>
        );
    },
};
