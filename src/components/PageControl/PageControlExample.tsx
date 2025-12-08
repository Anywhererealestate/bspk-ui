import { PageControlProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<PageControlProps>[] = [
    {
        label: '6 pages, on page 2',
        propState: {
            numPages: 6,
            currentPage: 2,
        },
    },
    {
        label: '5 pages, on page 1',
        propState: {
            numPages: 5,
            currentPage: 1,
        },
    },
    {
        label: '10 pages, on page 10',
        propState: {
            numPages: 10,
            currentPage: 10,
        },
    },
];

export const PageControlExample: ComponentExample<PageControlProps> = {
    defaultState: {},
    disableProps: [],
    presets,
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
    variants: {},
};
