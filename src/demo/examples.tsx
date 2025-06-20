import { AvatarExample as Avatar } from './examples/Avatar';
import { BadgeExample as Badge } from './examples/Badge';
import { BannerAlertExample as BannerAlert } from './examples/BannerAlert';
import { ButtonExample as Button } from './examples/Button';
import { CardExample as Card } from './examples/Card';
import { DividerExample as Divider } from './examples/Divider';
import { EmptyStateExample as EmptyState } from './examples/EmptyState';
import { FabExample as Fab } from './examples/Fab';
import { LinkExample as Link } from './examples/Link';
import { ListItemExample as ListItem } from './examples/ListItem';
import { MenuExample as Menu } from './examples/Menu';
import { ModalExample as Modal } from './examples/Modal';
import { PopoverExample as Popover } from './examples/Popover';
import { ProgressionStepperExample as ProgressionStepper } from './examples/ProgressionStepper';
import {
    RadioExample as Radio,
    RadioGroupExample as RadioGroup,
    RadioOptionExample as RadioOption,
} from './examples/Radio';
import { SearchBarExample as SearchBar } from './examples/SearchBar';
import { SegmentedControlExample as SegmentedControl } from './examples/SegmentedControl';
import { SelectExample as Select } from './examples/Select';
import { TabGroupExample as TabGroup } from './examples/TabGroup';
import { TextInputExample as TextInput } from './examples/TextInput';
import { ToolTipExample as ToolTip } from './examples/ToollTip';
import { ComponentExample, ComponentExampleFn } from './utils';

const ProgressBar = {
    containerStyle: { width: '80%' },
};

export const examples: Record<string, ComponentExample | ComponentExampleFn> = {
    Avatar,
    Badge,
    BannerAlert,
    Button,
    Card,
    Divider,
    EmptyState,
    Fab,
    Link,
    ListItem,
    Menu,
    Modal,
    NumberInput: {
        hideVariants: true,
        render: ({ props, Component }) => {
            // console.log({ props });
            return <Component {...props} />;
        },
    },
    Popover,
    ProgressBar,
    ProgressionStepper,
    Radio,
    RadioGroup,
    RadioOption,
    SearchBar,
    SegmentedControl,
    Select,
    TabGroup,
    TextInput,
    ToolTip,
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
