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
                { id: '1', state: 'Alabama', capital: 'Montgomery', abbreviation: 'AL', population: 198525 },
                { id: '2', state: 'Alaska', capital: 'Juneau', abbreviation: 'AK', population: 32756 },
                { id: '3', state: 'Arizona', capital: 'Phoenix', abbreviation: 'AZ', population: 1680992 },
                { id: '4', state: 'Arkansas', capital: 'Little Rock', abbreviation: 'AR', population: 197312 },
                { id: '5', state: 'California', capital: 'Sacramento', abbreviation: 'CA', population: 524943 },
                { id: '6', state: 'Colorado', capital: 'Denver', abbreviation: 'CO', population: 715522 },
                { id: '7', state: 'Connecticut', capital: 'Hartford', abbreviation: 'CT', population: 121054 },
                { id: '8', state: 'Delaware', capital: 'Dover', abbreviation: 'DE', population: 38158 },
                { id: '9', state: 'Florida', capital: 'Tallahassee', abbreviation: 'FL', population: 196169 },
                { id: '10', state: 'Georgia', capital: 'Atlanta', abbreviation: 'GA', population: 506811 },
                { id: '11', state: 'Hawaii', capital: 'Honolulu', abbreviation: 'HI', population: 345064 },
                { id: '12', state: 'Idaho', capital: 'Boise', abbreviation: 'ID', population: 235829 },
                { id: '13', state: 'Illinois', capital: 'Springfield', abbreviation: 'IL', population: 114694 },
                { id: '14', state: 'Indiana', capital: 'Indianapolis', abbreviation: 'IN', population: 876384 },
                { id: '15', state: 'Iowa', capital: 'Des Moines', abbreviation: 'IA', population: 214133 },
                { id: '16', state: 'Kansas', capital: 'Topeka', abbreviation: 'KS', population: 125310 },
                { id: '17', state: 'Kentucky', capital: 'Frankfort', abbreviation: 'KY', population: 27749 },
                { id: '18', state: 'Louisiana', capital: 'Baton Rouge', abbreviation: 'LA', population: 221599 },
                { id: '19', state: 'Maine', capital: 'Augusta', abbreviation: 'ME', population: 18807 },
                { id: '20', state: 'Maryland', capital: 'Annapolis', abbreviation: 'MD', population: 39774 },
                { id: '21', state: 'Massachusetts', capital: 'Boston', abbreviation: 'MA', population: 675647 },
                { id: '22', state: 'Michigan', capital: 'Lansing', abbreviation: 'MI', population: 112644 },
                { id: '23', state: 'Minnesota', capital: 'Saint Paul', abbreviation: 'MN', population: 311527 },
                { id: '24', state: 'Mississippi', capital: 'Jackson', abbreviation: 'MS', population: 153701 },
                { id: '25', state: 'Missouri', capital: 'Jefferson City', abbreviation: 'MO', population: 43079 },
                { id: '26', state: 'Montana', capital: 'Helena', abbreviation: 'MT', population: 32815 },
                { id: '27', state: 'Nebraska', capital: 'Lincoln', abbreviation: 'NE', population: 289102 },
                { id: '28', state: 'Nevada', capital: 'Carson City', abbreviation: 'NV', population: 57826 },
                { id: '29', state: 'New Hampshire', capital: 'Concord', abbreviation: 'NH', population: 43627 },
                { id: '30', state: 'New Jersey', capital: 'Trenton', abbreviation: 'NJ', population: 87937 },
                { id: '31', state: 'New Mexico', capital: 'Santa Fe', abbreviation: 'NM', population: 84683 },
                { id: '32', state: 'New York', capital: 'Albany', abbreviation: 'NY', population: 96460 },
                { id: '33', state: 'North Carolina', capital: 'Raleigh', abbreviation: 'NC', population: 474069 },
                { id: '34', state: 'North Dakota', capital: 'Bismarck', abbreviation: 'ND', population: 73335 },
                { id: '35', state: 'Ohio', capital: 'Columbus', abbreviation: 'OH', population: 903852 },
                { id: '36', state: 'Oklahoma', capital: 'Oklahoma City', abbreviation: 'OK', population: 655057 },
                { id: '37', state: 'Oregon', capital: 'Salem', abbreviation: 'OR', population: 175535 },
                { id: '38', state: 'Pennsylvania', capital: 'Harrisburg', abbreviation: 'PA', population: 49528 },
                { id: '39', state: 'Rhode Island', capital: 'Providence', abbreviation: 'RI', population: 190934 },
                { id: '40', state: 'South Carolina', capital: 'Columbia', abbreviation: 'SC', population: 137541 },
                { id: '41', state: 'South Dakota', capital: 'Pierre', abbreviation: 'SD', population: 13946 },
                { id: '42', state: 'Tennessee', capital: 'Nashville', abbreviation: 'TN', population: 670820 },
                { id: '43', state: 'Texas', capital: 'Austin', abbreviation: 'TX', population: 964254 },
                { id: '44', state: 'Utah', capital: 'Salt Lake City', abbreviation: 'UT', population: 200567 },
                { id: '45', state: 'Vermont', capital: 'Montpelier', abbreviation: 'VT', population: 7919 },
                { id: '46', state: 'Virginia', capital: 'Richmond', abbreviation: 'VA', population: 226610 },
                { id: '47', state: 'Washington', capital: 'Olympia', abbreviation: 'WA', population: 52434 },
                { id: '48', state: 'West Virginia', capital: 'Charleston', abbreviation: 'WV', population: 45756 },
                { id: '49', state: 'Wisconsin', capital: 'Madison', abbreviation: 'WI', population: 269840 },
                { id: '50', state: 'Wyoming', capital: 'Cheyenne', abbreviation: 'WY', population: 64235 },
            ],
            columns: [
                { key: 'state', label: 'State', width: '1fr', sort: 'string' },
                { key: 'capital', label: 'Capital', width: '1fr', sort: 'string' },
                { key: 'abbreviation', label: 'Abbrev', width: '1fr', align: 'center' },
                { key: 'population', label: 'Population', align: 'right', width: '1fr', sort: 'number' },
            ],
            pageSize: 5,
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
