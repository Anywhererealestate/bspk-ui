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
                    { id: 1, name: 'Bob', age: 74 },
                    { id: 2, name: 'Charlie', age: 19 },
                    { id: 3, name: 'Alice', age: 30 },
                ]}
                title="Example Table"
            />
        );
    },
};
