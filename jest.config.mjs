/** @type {import('ts-jest').JestConfigWithTsJest} * */
const config = {
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', 'tests'],
};
export default config;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
