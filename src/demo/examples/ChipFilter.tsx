import { ChipFilterProps } from '../../ChipFilter';
import { ComponentExampleFn } from '../utils';

export const ChipFilterExample: ComponentExampleFn<ChipFilterProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    render: ({ props, Component }) => {
        return <Component {...props} onClick={() => action('ChipFilter clicked!')} />;
    },
    presets: [
        {
            label: 'basic ChipFilter',
            propState: {
                label: 'chip option',
            },
        },
        {
            label: 'with leading icon',
            propState: {
                label: 'chip option',
                leadingIcon: 'SignLanguage',
            },
        },
        {
            label: 'with close icon',
            propState: {
                label: 'chip option',
                trailingIcon: 'SvgClose',
            },
        },
        {
            label: 'with chevron right icon',
            propState: {
                label: 'chip option',
                trailingIcon: 'SvgChevronRight',
            },
        },
        {
            label: 'with keyboard arrow down icon',
            propState: {
                label: 'chip option',
                trailingIcon: 'SvgKeyboardArrowDown',
            },
        },
        {
            label: 'with Badge',
            propState: {
                label: 'chip option',
                trailingBadgeCount: 3,
            },
        },
        {
            label: 'disabled',
            propState: {
                label: 'chip option',
                trailingBadgeCount: 3,
                disabled: true,
            },
        },
    ],
});
