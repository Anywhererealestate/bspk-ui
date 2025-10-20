import { stringValueToParts, Minute, Hour, Meridiem, partsToStringValue } from './utils';

const FIXTURES: {
    input: string;
    expected: {
        hours: Hour;
        minutes: Minute;
        meridiem: Meridiem;
    };
}[] = [
    {
        input: '00:00',
        expected: { hours: '12', minutes: '00', meridiem: 'AM' },
    },
    {
        input: '12:00',
        expected: { hours: '12', minutes: '00', meridiem: 'PM' },
    },
    {
        input: '01:05',
        expected: { hours: '01', minutes: '05', meridiem: 'AM' },
    },
    {
        input: '11:59',
        expected: { hours: '11', minutes: '59', meridiem: 'AM' },
    },
    {
        input: '13:10',
        expected: { hours: '01', minutes: '10', meridiem: 'PM' },
    },
    {
        input: '23:55',
        expected: { hours: '11', minutes: '55', meridiem: 'PM' },
    },
];

describe('stringValueToParts', () => {
    FIXTURES.forEach(({ input, expected }) => {
        it(`should parse "${input}" correctly`, () => {
            expect(stringValueToParts(input)).toEqual(expected);
        });

        it(`should unParse "${JSON.stringify(expected)}" correctly`, () => {
            expect(partsToStringValue(expected.hours, expected.minutes, expected.meridiem)).toEqual(input);
        });
    });
});
