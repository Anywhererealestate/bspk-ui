import { ComponentExample } from '@utils';

import { CheckboxGroupProps } from '../../CheckboxGroup';

export const CheckboxGroupExample: ComponentExample<CheckboxGroupProps> = {
    presets: [
        {
            label: 'With Descriptions',
            propState: {
                options: [
                    { label: 'Option 1', value: 'option1', description: 'Description for option 1' },
                    { label: 'Option 2', value: 'option2', description: 'Description for option 2' },
                    { label: 'Option 3', value: 'option3', description: 'Description for option 3' },
                ],
            },
        },
        {
            label: 'Long labels',
            propState: {
                options: [
                    { label: 'This is a very long label for option 1 that never seems to end', value: 'option1' },
                    { label: 'This is a very long label for option 2 that never seems to end', value: 'option2' },
                    { label: 'This is a very long label for option 3', value: 'option3' },
                ],
            },
        },
    ],
};
