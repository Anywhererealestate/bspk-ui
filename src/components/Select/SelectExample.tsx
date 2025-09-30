import { SelectProps } from '.';
import { Avatar } from '-/components/Avatar';
import { Tag } from '-/components/Tag';
import { Txt } from '-/components/Txt';
import { ComponentExample, Preset } from '-/utils/demo';

const TrailingPrice = ({ price }: { price: number }) => (
    <Txt>{`${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price / 100)}`}</Txt>
);
const DEFAULT_OPTIONS = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
    { value: '9', label: 'Option 9' },
    { value: '10', label: 'Option 10' },
];

export const presets: Preset<SelectProps>[] = [
    {
        label: 'Simple',
        propState: {
            label: 'Demo Select',
            options: DEFAULT_OPTIONS,
            isMulti: false,
            name: 'demo-select',
        },
    },
    {
        label: 'Multi',
        propState: {
            label: 'Demo Select Multi',
            options: DEFAULT_OPTIONS,
            isMulti: true,
            name: 'demo-select-multi',
        },
    },
    {
        label: 'Long text',
        propState: {
            label: 'Demo Select',
            isMulti: false,
            options: [
                { value: '1', label: 'This is a very long option that should truncate' },
                { value: '2', label: 'This is another long option that should truncate' },
                { value: '3', label: 'Short option' },
                { value: '4', label: 'Another short option' },
            ],
            name: 'demo-select-long',
        },
    },
    {
        label: 'Trailing Tags',
        propState: {
            label: 'Demo Select',
            isMulti: false,
            options: [
                //
                {
                    value: 'a',
                    label: 'Package A',
                    trailing: <Tag color="blue" label="Recommended" size="x-small" />,
                },
                {
                    value: 'b',
                    label: 'Package B',
                    trailing: <Tag color="green" label="Best Value" size="x-small" />,
                },
                { value: 'c', label: 'Package C' },
                { value: 'd', label: 'Package D' },
            ],
            name: 'demo-select-tags',
        },
    },
    {
        label: 'Trailing Text',
        propState: {
            label: 'Demo Select',
            isMulti: false,
            options: [
                {
                    value: '1',
                    label: 'Option A',
                    trailing: <TrailingPrice price={400} />,
                },
                { value: '2', label: 'Option B', trailing: <TrailingPrice price={1000} /> },
                { value: '3', label: 'Option C', trailing: <TrailingPrice price={1600} /> },
                { value: '4', label: 'Option D', trailing: <TrailingPrice price={2000} /> },
            ],
            name: 'demo-select-trailing',
        },
    },
    {
        label: 'Leading Avatar',
        propState: {
            label: 'Select user',
            isMulti: false,
            options: [
                //
                {
                    value: 'Jessica',
                    label: 'Jessica P.',
                    leading: <Avatar name="Jessica P." size="small" />,
                },
                {
                    value: 'Louis',
                    label: 'Louis L.',
                    leading: <Avatar name="Louis L." size="small" />,
                },
                {
                    value: 'Harvey',
                    label: 'Harvey S.',
                    leading: <Avatar name="Harvey S." size="small" />,
                },
                {
                    value: 'Mike',
                    label: 'Mike R.',
                    leading: <Avatar name="Mike R." size="small" />,
                },
            ],
            name: 'demo-select-avatar',
        },
    },
];

export const SelectExample: ComponentExample<SelectProps> = {
    defaultState: {
        label: 'Demo Select',
        options: DEFAULT_OPTIONS,
    },
    presets,
    variants: false,
};
