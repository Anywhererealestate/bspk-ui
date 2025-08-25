import { TooltipProps } from './Tooltip';
import { Button } from '-/components/Button';
import { ComponentExample } from '-/utils/demo';

export const TooltipExample: ComponentExample<TooltipProps> = {
    render: ({ props: state, Component }) => {
        return (
            <>
                <Component {...state} placement={[state.placement].flat()[0] || 'top'}>
                    {(triggerProps) => (
                        <Button
                            label={`Hover over me ${'data-variant-value' in state ? `(${state['data-variant-value']})` : ''}`}
                            variant="secondary"
                            {...triggerProps}
                        />
                    )}
                </Component>
            </>
        );
    },
};
