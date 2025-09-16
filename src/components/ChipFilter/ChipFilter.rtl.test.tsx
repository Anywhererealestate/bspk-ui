import { ChipFilter } from './ChipFilter';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => <ChipFilter label="FilterChip" onClick={() => {}} trailingIcon="SvgChevronRight" />;

describe('ChipFilter', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('FilterChip')).toBeInTheDocument();
    });
});
