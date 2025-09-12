import { Img } from './Img';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => <Img alt="Example alt" src="Example src" />;

describe('Img (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByAltText } = render(<TestBed />);

        expect(getByAltText('Example alt')).toBeInTheDocument();
    });
});
