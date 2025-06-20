import { Avatar } from '../../Avatar';
import { SelectProps } from '../../Select';
import { Tag } from '../../Tag';
import { Txt } from '../../Txt';
import { ComponentExample } from '../utils';

const trailingPrice = (price: number) => (
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

export const SelectExample: ComponentExample<SelectProps> = {
    defaultState: {
        'aria-label': 'Demo Select',
        options: DEFAULT_OPTIONS,
    },
    presets: [
        {
            label: 'Simple',
            propState: { isMulti: false },
        },
        {
            label: 'Multi',
            propState: { isMulti: true },
        },
        {
            label: 'Trailing Tags',
            propState: {
                isMulti: false,
                options: [
                    //
                    {
                        value: 'a',
                        label: 'Package A',
                        trailing: (
                            <Tag color="blue" size="x-small">
                                Recommended
                            </Tag>
                        ),
                    },
                    {
                        value: 'b',
                        label: 'Package B',
                        trailing: (
                            <Tag color="green" size="x-small">
                                Best Value
                            </Tag>
                        ),
                    },
                    { value: 'c', label: 'Package C' },
                    { value: 'd', label: 'Package D' },
                ],
            },
        },
        {
            label: 'Trailing Text',
            propState: {
                isMulti: false,
                options: [
                    {
                        value: '1',
                        label: 'Option A',
                        trailing: trailingPrice(400),
                    },
                    { value: '2', label: 'Option B', trailing: trailingPrice(1000) },
                    { value: '3', label: 'Option C', trailing: trailingPrice(1600) },
                    { value: '4', label: 'Option D', trailing: trailingPrice(2000) },
                ],
            },
        },
        {
            label: 'Leading Avatar',
            propState: {
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
            },
        },
    ],
};
