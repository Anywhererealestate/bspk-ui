import { ButtonProps, Button } from '-/components/Button';

// A button that can be used as a trailing element in a ListItem.
function ListItemButton({ label, icon, ...buttonProps }: Pick<ButtonProps, 'icon' | 'label' | 'onClick'>) {
    return <Button icon={icon} iconOnly label={label} {...buttonProps} size="large" variant="tertiary" />;
}
ListItemButton.bspkName = 'ListItemButton';

export { ListItemButton };
