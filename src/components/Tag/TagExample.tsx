import { TagProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const TagExample: ComponentExample<TagProps> = {
    presets: [
        {
            label: 'Long Label',
            propState: {
                label: 'Hello, this is a very long tag label that should be truncated if it exceeds the container width.',
                color: 'purple',
                size: 'small',
                variant: 'flat',
            },
        },
    ],
};
