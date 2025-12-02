import { TableProps } from './Table';
import { TableRow, TableSize } from './utils';
import { Tag, TagProps } from '-/components/Tag';
import { Truncated } from '-/components/Truncated';
import { COMPONENT_PHASE_COLORS } from '-/constants/phases';
import { ComponentPhase } from '-/types/meta';
import { ComponentExample, ComponentExampleFn, Preset } from '-/utils/demo';

const tableSizeToTagSize: Record<TableSize, TagProps['size']> = {
    large: 'small',
    medium: 'x-small',
    small: 'x-small',
    'x-large': 'small',
};

export const TableExample: ComponentExampleFn<TableProps<TableRow>> = ({
    componentsMeta,
}): ComponentExample<TableProps<TableRow>> => {
    return {
        containerStyle: { width: '100%' },
        defaultState: {
            data: [
                { id: '1', firstName: 'Alex', lastName: 'Mason', email: 'alex.mason@example.com', yearsEmployed: 2 },
                { id: '2', firstName: 'Sam', lastName: 'Reed', email: 'sam.reed@example.com', yearsEmployed: 4 },
                { id: '3', firstName: 'Jordan', lastName: 'Lee', email: 'jordan.lee@example.com', yearsEmployed: 1 },
                {
                    id: '4',
                    firstName: 'Taylor',
                    lastName: 'Nguyen',
                    email: 'taylor.nguyen@example.com',
                    yearsEmployed: 6,
                },
                { id: '5', firstName: 'Riley', lastName: 'Patel', email: 'riley.patel@example.com', yearsEmployed: 3 },
                {
                    id: '6',
                    firstName: 'Casey',
                    lastName: 'Garcia',
                    email: 'casey.garcia@example.com',
                    yearsEmployed: 8,
                },
                { id: '7', firstName: 'Morgan', lastName: 'Kim', email: 'morgan.kim@example.com', yearsEmployed: 5 },
                { id: '8', firstName: 'Avery', lastName: 'Singh', email: 'avery.singh@example.com', yearsEmployed: 7 },
                { id: '9', firstName: 'Drew', lastName: 'Lopez', email: 'drew.lopez@example.com', yearsEmployed: 10 },
                { id: '10', firstName: 'Parker', lastName: 'Chen', email: 'parker.chen@example.com', yearsEmployed: 0 },

                // 20 more rows (includes a couple duplicate first names)
                {
                    id: '11',
                    firstName: 'Alex',
                    lastName: 'Hendrix',
                    email: 'alex.hendrix@example.com',
                    yearsEmployed: 9,
                },
                { id: '12', firstName: 'Sam', lastName: 'Potter', email: 'sam.potter@example.com', yearsEmployed: 2 },
                {
                    id: '13',
                    firstName: 'Jordan',
                    lastName: 'Frost',
                    email: 'jordan.frost@example.com',
                    yearsEmployed: 4,
                },
                { id: '14', firstName: 'Taylor', lastName: 'Vega', email: 'taylor.vega@example.com', yearsEmployed: 1 },
                {
                    id: '15',
                    firstName: 'Morgan',
                    lastName: 'Klein',
                    email: 'morgan.klein@example.com',
                    yearsEmployed: 6,
                },
                { id: '16', firstName: 'Riley', lastName: 'Hayes', email: 'riley.hayes@example.com', yearsEmployed: 3 },
                {
                    id: '17',
                    firstName: 'Casey',
                    lastName: 'Ortiz',
                    email: 'casey.ortiz@example.com',
                    yearsEmployed: 11,
                },
                { id: '18', firstName: 'Alex', lastName: 'Baker', email: 'alex.baker@example.com', yearsEmployed: 0 },
                { id: '19', firstName: 'Sam', lastName: 'Walsh', email: 'sam.walsh@example.com', yearsEmployed: 7 },
                {
                    id: '20',
                    firstName: 'Avery',
                    lastName: 'Morris',
                    email: 'avery.morris@example.com',
                    yearsEmployed: 5,
                },
                { id: '21', firstName: 'Drew', lastName: 'Nolan', email: 'drew.nolan@example.com', yearsEmployed: 12 },
                { id: '22', firstName: 'Parker', lastName: 'Rowe', email: 'parker.rowe@example.com', yearsEmployed: 2 },
                { id: '23', firstName: 'Jamie', lastName: 'Stone', email: 'jamie.stone@example.com', yearsEmployed: 4 },
                { id: '24', firstName: 'Chris', lastName: 'Doyle', email: 'chris.doyle@example.com', yearsEmployed: 6 },
                { id: '25', firstName: 'Pat', lastName: 'Ng', email: 'pat.ng@example.com', yearsEmployed: 1 },
                {
                    id: '26',
                    firstName: 'Lee',
                    lastName: 'Marshall',
                    email: 'lee.marshall@example.com',
                    yearsEmployed: 8,
                },
                {
                    id: '27',
                    firstName: 'Cameron',
                    lastName: 'Bennett',
                    email: 'cameron.bennett@example.com',
                    yearsEmployed: 3,
                },
                {
                    id: '28',
                    firstName: 'Jessie',
                    lastName: 'Bloom',
                    email: 'jessie.bloom@example.com',
                    yearsEmployed: 9,
                },
                { id: '29', firstName: 'Robin', lastName: 'Payne', email: 'robin.payne@example.com', yearsEmployed: 0 },
                {
                    id: '30',
                    firstName: 'Sidney',
                    lastName: 'Quinn',
                    email: 'sidney.quinn@example.com',
                    yearsEmployed: 5,
                },
            ],
            columns: [
                { key: 'firstName', label: 'First Name', width: '1fr', sort: 'string' },
                { key: 'lastName', label: 'Last Name', width: '1fr', sort: 'string' },
                { key: 'email', label: 'Email', width: '1fr' },
                { key: 'yearsEmployed', label: 'Years Employed', align: 'right', width: '1fr', sort: 'number' },
            ],
        },
        presets: [
            {
                label: 'Large dataset',
                propState: {
                    title: 'Components',
                    columns: [
                        {
                            key: 'name',
                            label: 'Name',
                            width: '1fr',
                            sort: 'string',
                        },
                        {
                            key: 'phase',
                            label: 'Phase',
                            width: '1fr',
                            align: 'center',
                            sort: 'string',
                            formatter: ({ phase }, size) => (
                                <Tag
                                    color={COMPONENT_PHASE_COLORS[phase]}
                                    label={phase}
                                    size={tableSizeToTagSize[size]}
                                />
                            ),
                        },
                        {
                            key: 'cssLines',
                            label: 'CSS Lines',
                            width: '1fr',
                            sort: 'number',
                            align: 'right',
                        },
                        {
                            key: 'dependencies',
                            label: 'Dependencies',
                            width: '1fr',
                        },
                        {
                            key: 'description',
                            label: 'Description',
                            width: 'auto',
                            formatter: (row) => <Truncated style={{ maxWidth: '200px' }}>{row.description}</Truncated>,
                        },
                    ],
                    data: componentsMeta
                        .filter((c) => c.phase !== 'Utility')
                        .map((c) => ({
                            id: c.slug,
                            name: c.name,
                            phase: c.phase,
                            dependencies: c.dependencies,
                            description: c.description || '',
                            cssLines: c.css.split('\n').length - 1,
                        })),
                },
            } as Preset<TableProps<TableRow & { phase: ComponentPhase; description: string }>>,
        ],
    };
};
