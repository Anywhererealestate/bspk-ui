import { AccordionExample as Accordion } from '@bspk/ui/Accordion/AccordionExample';
import { AvatarExample as Avatar } from '@bspk/ui/Avatar/AvatarExample';
import { AvatarGroupExample as AvatarGroup } from '@bspk/ui/AvatarGroup/AvatarGroupExample';
import { BadgeExample as Badge } from '@bspk/ui/Badge/BadgeExample';
import { BadgeDotExample as BadgeDot } from '@bspk/ui/BadgeDot/BadgeDotExample';
import { BannerAlertExample as BannerAlert } from '@bspk/ui/BannerAlert/BannerAlertExample';
import { BottomNavigationExample as BottomNavigation } from '@bspk/ui/BottomNavigation/BottomNavigationExample';
import { BreadcrumbExample as Breadcrumb } from '@bspk/ui/Breadcrumb/BreadcrumbExample';
import { ButtonExample as Button } from '@bspk/ui/Button/ButtonExample';
import { ButtonDockExample as ButtonDock } from '@bspk/ui/ButtonDock/ButtonDockExample';
import { CalendarExample as Calendar } from '@bspk/ui/Calendar/CalendarExample';
import { CardExample as Card } from '@bspk/ui/Card/CardExample';
import { CarouselExample as Carousel } from '@bspk/ui/Carousel/CarouselExample';
import { CheckboxGroupExample as CheckboxGroup } from '@bspk/ui/CheckboxGroup/CheckboxGroupExample';
import { ChipExample as Chip } from '@bspk/ui/Chip/ChipExample';
import { ChipGroupExample as ChipGroup } from '@bspk/ui/ChipGroup/ChipGroupExample';
import { DatePickerExample as DatePicker } from '@bspk/ui/DatePicker/DatePickerExample';
import { DialogExample as Dialog } from '@bspk/ui/Dialog/DialogExample';
import { DividerExample as Divider } from '@bspk/ui/Divider/DividerExample';
import { DrawerExample as Drawer } from '@bspk/ui/Drawer/DrawerExample';
import { EmptyStateExample as EmptyState } from '@bspk/ui/EmptyState/EmptyStateExample';
import { FabExample as Fab } from '@bspk/ui/Fab/FabExample';
import { FieldExample as Field } from '@bspk/ui/Field/FieldExample';
import { FileUploadExample as FileUpload } from '@bspk/ui/FileUpload/FileUploadExample';
import { FileUploadItemExample as FileUploadItem } from '@bspk/ui/FileUploadItem/FileUploadItemExample';
import { FormFieldExample as FormField } from '@bspk/ui/FormField/FormFieldExample';
import { InputExample as Input } from '@bspk/ui/Input/InputExample';
import { InputNumberExample as InputNumber } from '@bspk/ui/InputNumber/InputNumberExample';
import { InputPhoneExample as InputPhone } from '@bspk/ui/InputPhone/InputPhoneExample';
import { LayoutExample as Layout } from '@bspk/ui/Layout/LayoutExample';
import { LinkExample as Link } from '@bspk/ui/Link/LinkExample';
import { ListItemExample as ListItem } from '@bspk/ui/ListItem/ListItemExample';
import { MenuExample as Menu } from '@bspk/ui/Menu/MenuExample';
import { ModalExample as Modal } from '@bspk/ui/Modal/ModalExample';
import { OTPInputExample as OTPInput } from '@bspk/ui/OTPInput/OTPInputExample';
import { PageControlExample as PageControl } from '@bspk/ui/PageControl/PageControlExample';
import { PopoverExample as Popover } from '@bspk/ui/Popover/PopoverExample';
import { ProgressionStepperExample as ProgressionStepper } from '@bspk/ui/ProgressionStepper/ProgressionStepperExample';
import { RadioExample as Radio } from '@bspk/ui/Radio/RadioExample';
import { RadioGroupExample as RadioGroup } from '@bspk/ui/RadioGroup/RadioGroupExample';
import { RadioOptionExample as RadioOption } from '@bspk/ui/RadioOption/RadioOptionExample';
import { RatingExample as Rating } from '@bspk/ui/Rating/RatingExample';
import { SearchBarExample as SearchBar } from '@bspk/ui/SearchBar/SearchBarExample';
import { SegmentedControlExample as SegmentedControl } from '@bspk/ui/SegmentedControl/SegmentedControlExample';
import { SelectExample as Select } from '@bspk/ui/Select/SelectExample';
import { SkeletonExample as Skeleton } from '@bspk/ui/Skeleton/SkeletonExample';
import { SkeletonTextExample as SkeletonText } from '@bspk/ui/SkeletonText/SkeletonTextExample';
import { SliderExample as Slider } from '@bspk/ui/Slider/SliderExample';
import { SnackbarExample as Snackbar } from '@bspk/ui/Snackbar/SnackbarExample';
import { TabGroupExample as TabGroup } from '@bspk/ui/TabGroup/TabGroupExample';
import { TabListExample as TabList } from '@bspk/ui/TabList/TabListExample';
import { TableExample as Table } from '@bspk/ui/Table/TableExample';
import { TagExample as Tag } from '@bspk/ui/Tag/TagExample';
import { TextareaExample as Textarea } from '@bspk/ui/Textarea/TextareaExample';
import { TimePickerExample as TimePicker } from '@bspk/ui/TimePicker/TimePickerExample';
import { TooltipExample as Tooltip } from '@bspk/ui/Tooltip/TooltipExample';
import { UIProviderExample as UIProvider } from '@bspk/ui/UIProvider/UIProviderExample';
import { ComponentExample, ComponentExampleFn } from '@bspk/ui/utils/demo';
import { MetaComponentName } from 'src/meta';

export const examples: Partial<Record<MetaComponentName, ComponentExample<any> | ComponentExampleFn<any>>> = {
    Accordion,
    Avatar,
    AvatarGroup,
    Badge,
    BadgeDot,
    BannerAlert,
    BottomNavigation,
    Breadcrumb,
    Button,
    ButtonDock,
    Calendar,
    Card,
    Carousel,
    CheckboxGroup,
    Chip,
    ChipGroup,
    DatePicker,
    Dialog,
    Divider,
    Drawer,
    EmptyState,
    Fab,
    Field,
    FileUpload,
    FileUploadItem,
    FormField,
    Input,
    InputNumber,
    InputPhone,
    Layout,
    Link,
    ListItem,
    Menu,
    Modal,
    OTPInput,
    PageControl,
    Popover,
    ProgressionStepper,
    Radio,
    RadioGroup,
    RadioOption,
    Rating,
    SearchBar,
    SegmentedControl,
    Select,
    Skeleton,
    SkeletonText,
    Slider,
    Snackbar,
    TabGroup,
    TabList,
    Table,
    Tag,
    Textarea,
    TimePicker,
    Tooltip,
    UIProvider,
};
