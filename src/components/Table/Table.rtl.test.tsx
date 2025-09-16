import { Table } from './Table';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Table
        columns={[
            { key: 'state', label: 'State', width: '100px' },
            { key: 'capital', label: 'Capital', width: '1fr' },
        ]}
        data={[
            { state: 'New Jersey', capital: 'Trenton', id: '1' },
            { state: 'New York', capital: 'Albany', id: '2' },
            { state: 'California', capital: 'Sacramento', id: '3' },
        ]}
        title="State Capitals"
    />
);

describe('Table (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('State Capitals')).toBeInTheDocument();
    });
});
