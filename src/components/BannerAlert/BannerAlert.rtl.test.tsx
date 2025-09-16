import { BannerAlert } from './BannerAlert';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <BannerAlert
        body="There was an error processing your request."
        callToAction={{
            label: 'Click me',
            onClick: () => {},
        }}
        header="Error"
        onClose={() => {}}
        variant="error"
    />
);

describe('BannerAlert', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders its child content ', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Click me')).toBeInTheDocument();
    });
});
