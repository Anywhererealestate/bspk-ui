import { TableProps } from './Table';
import { ComponentExample } from '-/utils/demo';

type ExampleRow = {
    id: number;
    name: string;
    age: number;
};

export const TableExample: ComponentExample<TableProps<ExampleRow>> = {
    defaultState: {
        columns: [
            { key: 'id', label: 'ID', width: '50px', align: 'center' },
            { key: 'name', label: 'Name', width: '1fr', align: 'left', enableSorting: true },
            { key: 'age', label: 'Age', width: '1fr', align: 'right', enableSorting: true },
        ],
        rows: [
            { id: 1, name: 'Alice', age: 74 },
            { id: 2, name: 'Bob', age: 30 },
            { id: 3, name: 'Charlie', age: 19 },
            { id: 4, name: 'Diana', age: 45 },
            { id: 5, name: 'Ethan', age: 22 },
            { id: 6, name: 'Fiona', age: 29 },
            { id: 7, name: 'George', age: 35 },
            { id: 8, name: 'Hannah', age: 50 },
        ],
        title: 'Example Table',
    },
};
