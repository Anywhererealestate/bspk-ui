import { SelectProps } from '.';
import { Avatar } from '-/components/Avatar';
import { Tag } from '-/components/Tag';
import { Txt } from '-/components/Txt';
import { ComponentExample, Preset } from '-/utils/demo';

const trailingPrice = (price: number) => (
    <Txt>{`${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price / 100)}`}</Txt>
);
const DEFAULT_OPTIONS = [
    { id: '1', label: 'Option 1' },
    { id: '2', label: 'Option 2' },
    { id: '3', label: 'Option 3' },
    { id: '4', label: 'Option 4' },
    { id: '5', label: 'Option 5' },
    { id: '6', label: 'Option 6' },
    { id: '7', label: 'Option 7' },
    { id: '8', label: 'Option 8' },
    { id: '9', label: 'Option 9' },
    { id: '10', label: 'Option 10' },
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
                { id: '1', label: 'This is a very long option that should truncate' },
                { id: '2', label: 'This is another long option that should truncate' },
                { id: '3', label: 'Short option' },
                { id: '4', label: 'Another short option' },
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
                    id: 'a',
                    label: 'Package A',
                    trailing: <Tag color="blue" label="Recommended" size="x-small" />,
                },
                {
                    id: 'b',
                    label: 'Package B',
                    trailing: <Tag color="green" label="Best Value" size="x-small" />,
                },
                { id: 'c', label: 'Package C' },
                { id: 'd', label: 'Package D' },
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
                    id: '1',
                    label: 'Option A',
                    trailing: trailingPrice(400),
                },
                { id: '2', label: 'Option B', trailing: trailingPrice(1000) },
                { id: '3', label: 'Option C', trailing: trailingPrice(1600) },
                { id: '4', label: 'Option D', trailing: trailingPrice(2000) },
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
                    id: 'Jessica',
                    label: 'Jessica P.',
                    leading: <Avatar name="Jessica P." size="small" />,
                },
                {
                    id: 'Louis',
                    label: 'Louis L.',
                    leading: <Avatar name="Louis L." size="small" />,
                },
                {
                    id: 'Harvey',
                    label: 'Harvey S.',
                    leading: <Avatar name="Harvey S." size="small" />,
                },
                {
                    id: 'Mike',
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
