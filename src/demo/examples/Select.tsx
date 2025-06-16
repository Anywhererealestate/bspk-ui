import { AvatarProps, Avatar } from '../../Avatar';
import { MenuItem } from '../../Menu';
import { SelectProps, SelectOption } from '../../Select';
import { Tag } from '../../Tag';
import { Txt } from '../../Txt';
import { ColorVariant } from '../../utils/colorVariants';
import { asProps, ComponentExample } from '../utils';

export const SelectExample: ComponentExample<SelectProps> = {
    presets: [
        {
            label: 'Simple',
            state: {},
        },
        {
            label: 'Multi',
            state: { isMulti: true },
        },
        {
            label: 'Trailing Tags',
            state: asProps<
                SelectProps<
                    SelectOption & {
                        tag?: string;
                        tagColor?: ColorVariant;
                    }
                >
            >({
                options: [
                    //
                    {
                        value: 'a',
                        label: 'Package A',
                        tag: 'Recommended',
                        tagColor: 'blue',
                    },
                    {
                        value: 'b',
                        label: 'Package B',
                        tag: 'Best Value',
                        tagColor: 'green',
                    },
                    { value: 'c', label: 'Package C' },
                    { value: 'd', label: 'Package D' },
                ],
                renderListItem: (props) => {
                    return {
                        trailing:
                            props.item.tag && props.item.tagColor ? (
                                <Tag color={props.item.tagColor!} size="x-small">
                                    {props.item.tag}
                                </Tag>
                            ) : null,
                    };
                },
            }),
        },
        {
            label: 'Trailing Text',
            state: asProps<SelectProps<SelectOption & { price: number }>>({
                options: [
                    //
                    { value: '1', label: 'Option A', price: 400 },
                    { value: '2', label: 'Option B', price: 1000 },
                    { value: '3', label: 'Option C', price: 1600 },
                    { value: '4', label: 'Option D', price: 2000 },
                ],
                renderListItem: (props) => {
                    return {
                        trailing: (
                            <Txt>{`${new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(props.item.price / 100)}`}</Txt>
                        ),
                    };
                },
            }),
        },
        {
            label: 'Leading Avatar',
            state: asProps<
                SelectProps<
                    MenuItem & {
                        profile: AvatarProps;
                    }
                >
            >({
                options: [
                    //
                    {
                        value: 'Jessica',
                        label: 'Jessica P.',
                        profile: { name: 'Jessica P.' },
                    },
                    {
                        value: 'Louis',
                        label: 'Louis L.',
                        profile: { name: 'Louis L.' },
                    },
                    {
                        value: 'Harvey',
                        label: 'Harvey S.',
                        profile: { name: 'Harvey S.' },
                    },
                    {
                        value: 'Mike',
                        label: 'Mike R.',
                        profile: { name: 'Mike R.' },
                    },
                ],
                renderListItem: (props) => {
                    return {
                        leading: <Avatar size="small" {...props.item.profile} />,
                    };
                },
            }),
        },
    ],
};
