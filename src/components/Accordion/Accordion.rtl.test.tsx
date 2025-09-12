import { Accordion } from './Accordion';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Accordion
        items={[
            { title: 'Item 1', id: '1', children: 'Content 1' },
            { title: 'Item 2', id: '2', children: 'Content 2' },
            { title: 'Item 3', id: '3', children: 'Content 3' },
        ]}
    />
);

describe('Accordion (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders its sections', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Item 1')).toBeInTheDocument();
        expect(getByText('Item 2')).toBeInTheDocument();
        expect(getByText('Item 3')).toBeInTheDocument();
    });
});
