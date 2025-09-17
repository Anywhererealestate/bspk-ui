import { Slider } from './Slider';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';

const TestBed = () => <Slider label="Slider Example" max={100} min={0} name="Slider" onChange={() => {}} value={5} />;

describe('Slider (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));
});
