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
                {
                    id: '1',
                    firstName: 'James',
                    lastName: 'Kirk',
                    email: 'james.kirk@starfleet.gov',
                    serviceYears: 5,
                },
                {
                    id: '2',
                    firstName: 'Jean-Luc',
                    lastName: 'Picard',
                    email: 'jean-luc.picard@starfleet.gov',
                    serviceYears: 9,
                },
                {
                    id: '3',
                    firstName: 'Benjamin',
                    lastName: 'Sisko',
                    email: 'benjamin.sisko@starfleet.gov',
                    serviceYears: 6,
                },
                {
                    id: '4',
                    firstName: 'Kathryn',
                    lastName: 'Janeway',
                    email: 'kathryn.janeway@starfleet.gov',
                    serviceYears: 7,
                },
            ],
            columns: [
                {
                    key: 'firstName',
                    label: 'First Name',
                    width: '1fr',
                    sort: 'string',
                },
                {
                    key: 'lastName',
                    label: 'Last Name',
                    width: '1fr',
                    sort: 'string',
                },
                {
                    key: 'email',
                    label: 'Email',
                    width: '1fr',
                },
                {
                    key: 'serviceYears',
                    label: 'Service Years',
                    align: 'right',
                    width: '1fr',
                    sort: 'number',
                },
            ],
        },
        presets: [
            {
                label: 'Large data set',
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
