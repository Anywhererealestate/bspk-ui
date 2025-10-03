import { TooltipProps } from './Tooltip';
import { Button } from '-/components/Button';
import { ComponentExample } from '-/utils/demo';

export const TooltipExample: ComponentExample<TooltipProps> = {
    render: ({ props: state, Component }) => {
        return (
            <>
                <Component
                    {...state}
                    label={`Hover over me ${state.label || ''}`}
                    placement={[state.placement].flat()[0] || 'top'}
                >
                    {(triggerProps) => <Button {...triggerProps} label="Hover over me" variant="secondary" />}
                </Component>
            </>
        );
    },
};
