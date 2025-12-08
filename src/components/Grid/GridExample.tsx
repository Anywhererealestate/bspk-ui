import { GridProps } from '.';
import { ExamplePlaceholder } from '-/components/ExamplePlaceholder';
import { ComponentExample } from '-/utils/demo';

export const GridExample: ComponentExample<GridProps> = {
    defaultState: {
        children: (
            <>
                <div>Cell 1</div>
                <div>Cell 2</div>
            </>
        ),
        columns: [1, 2],
    },
    render: ({ Component, props }) => {
        const columns = convertColumns(`${props.columns}`);

        return (
            <Component {...props} columns={columns.value}>
                {[...Array(columns.count)].map((_, index) => (
                    <ExamplePlaceholder key={index}>Cell {index + 1}</ExamplePlaceholder>
                ))}
            </Component>
        );
    },
};

const convertColumns = (columns: string): { value: (number | string)[] | number; count: number } => {
    let value: (number | string)[] | number = 1;

    if (columns.includes(','))
        value = columns
            .split(',')
            .filter((col) => !!col.trim())
            .map((col) => {
                if (/^\d+$/.test(col.trim())) return parseInt(col.trim(), 10) || 1;
                return col.trim();
            });
    else value = parseInt(columns, 10) || 1;

    return { value, count: Array.isArray(value) ? value.length : value };
};
