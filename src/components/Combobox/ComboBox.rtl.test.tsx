import { Combobox } from './Combobox';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Combobox description="A combobox" label="Combobox Example" onChange={() => {}}>
        {() => <div>foo</div>}
    </Combobox>
);

describe('Combobox', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('foo')).toBeInTheDocument();
    });
});
