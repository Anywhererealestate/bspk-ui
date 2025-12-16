import { blocks } from './PageHeaderBlock';
import { PageHeaderProps } from '.';
import { ExamplePlaceholder } from '-/components/ExamplePlaceholder';
import { ComponentExample } from '-/utils/demo';

export const PageHeaderExample: ComponentExample<PageHeaderProps> = {
    defaultState: {
        title: 'Page Title',
        actions: <ExamplePlaceholder height={32} label="Page actions slot" width={372} />,
    },
    disableProps: [],
    render: ({ props, Component }) => <Component {...props} />,
    variants: false,
    fullPage: true,
    hideDemo: true,
    hideUsage: true,
    presets: [],
    blocks,
};
