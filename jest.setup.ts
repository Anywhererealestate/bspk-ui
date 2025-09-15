import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import jestAxe from 'jest-axe';

const { toHaveNoViolations } = jestAxe;
expect.extend(toHaveNoViolations);

afterEach(cleanup);
