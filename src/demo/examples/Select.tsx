import { AvatarProps, Avatar } from '../../Avatar';
import { RenderListItemParams } from '../../Menu';
import { SelectProps, SelectOption } from '../../Select';
import { Tag } from '../../Tag';
import { Txt } from '../../Txt';
import { ColorVariant } from '../../utils/colorVariants';
import { ComponentExample } from '../utils';

export const SelectExample: ComponentExample<SelectProps> = {
    presets: [
        {
            label: 'Simple',
            state: {
                isMulti: false,
            },
        },
        {
            label: 'Multi',
            state: { isMulti: true },
        },
        {
            label: 'Trailing Tags',
            state: {
                isMulti: false,
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
                renderListItem: (
                    props: RenderListItemParams<
                        SelectOption & {
                            tag?: string;
                            tagColor?: ColorVariant;
                        }
                    >,
                ) => {
                    return {
                        trailing:
                            props.item.tag && props.item.tagColor ? (
                                <Tag color={props.item.tagColor!} size="x-small">
                                    {props.item.tag}
                                </Tag>
                            ) : null,
                    };
                },
            } as Partial<SelectProps<SelectOption & { tag?: string; tagColor?: ColorVariant }>>,
        },
        {
            label: 'Trailing Text',
            state: {
                isMulti: false,
                options: [
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
            } as Partial<SelectProps<SelectOption & { price: number }>>,
        },
        {
            label: 'Leading Avatar',
            state: {
                isMulti: false,
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
            } as Partial<SelectProps<SelectOption & { profile: AvatarProps }>>,
        },
    ],
};
