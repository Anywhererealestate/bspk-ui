import { TableProps } from './Table';
import { TableRow, TableSize } from './utils';
import { Tag, TagProps } from '-/components/Tag';
import { Truncated } from '-/components/Truncated';
import { COMPONENT_PHASE_COLORS } from '-/constants/phases';
import { ComponentPhase } from '-/types/meta';
import { ComponentExample, ComponentExampleFn } from '-/utils/demo';

const tableSizeToTagSize: Record<TableSize, TagProps['size']> = {
    large: 'small',
    medium: 'x-small',
    small: 'x-small',
    'x-large': 'small',
};

export const TableExample: ComponentExampleFn<TableProps<TableRow>> = ({
    componentsMeta,
}): ComponentExample<TableProps<TableRow & { phase: ComponentPhase; description: string }>> => {
    return {
        containerStyle: { width: '100%' },
        defaultState: {
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
                        <Tag color={COMPONENT_PHASE_COLORS[phase]} label={phase} size={tableSizeToTagSize[size]} />
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
                    width: '2fr',
                    formatter: (row) => <Truncated>{row.description}</Truncated>,
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
    };
};
