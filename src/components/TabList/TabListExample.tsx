import { TabListProps } from './TabList';
import { ComponentExample } from '-/utils/demo';

export const TabListExample: ComponentExample<TabListProps> = {
    containerStyle: { width: '100%' },
    render: ({ props, Component }) => <Component {...props} />,
};
