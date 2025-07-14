import { TableProps } from './Table';
import { ComponentExample } from '-/utils/demo';

type ExampleRow = {
    id: number;
    name: string;
    age: number;
};

export const TableExample: ComponentExample<TableProps<ExampleRow>> = {
    render: ({ Component, props }) => {
        return (
            <Component
                {...props}
                columns={[
                    { key: 'id', label: 'ID', width: '100px' },
                    { key: 'name', label: 'Name', width: '1fr' },
                    { key: 'age', label: 'Age', width: '1fr' },
                ]}
                rows={[
                    { id: 1, name: 'Alice', age: 19 },
                    { id: 2, name: 'Bob', age: 30 },
                    { id: 3, name: 'Charlie', age: 74 },
                ]}
            />
        );
    },
};
