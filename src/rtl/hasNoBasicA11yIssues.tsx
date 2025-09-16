import { axe } from 'jest-axe';
import { ReactElement } from 'react';
import { render } from '-/rtl/util';

/**
 * A utility function to test for basic accessibility issues using jest-axe.
 *
 * @example
 *     import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
 *     import { MyComponent } from './MyComponent';
 *
 *     const TestBed = () => <MyComponent />;
 *
 *     describe('MyComponent', () => {
 *         it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));
 *     });
 *
 * @param TestBed - A React element representing the component to be tested.
 * @returns An async function that performs the accessibility test.
 */
export const hasNoBasicA11yIssues = (TestBed: ReactElement) => {
    return async () => {
        const { container } = render(TestBed);
        expect(await axe(container)).toHaveNoViolations();
    };
};
