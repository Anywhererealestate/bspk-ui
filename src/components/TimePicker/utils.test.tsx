import { stringValueToParts, Meridiem, partsToStringValue } from './utils';

const FIXTURES: {
    hours: string;
    minutes: string;
    meridiem: Meridiem;
    str: string;
}[] = [
    { hours: '12', minutes: '00', meridiem: 'AM', str: '00:00' },
    { hours: '01', minutes: '15', meridiem: 'AM', str: '01:15' },
    { hours: '12', minutes: '30', meridiem: 'PM', str: '12:30' },
    { hours: '03', minutes: '45', meridiem: 'PM', str: '15:45' },
    { hours: '11', minutes: '59', meridiem: 'PM', str: '23:59' },
];

describe('stringValueToParts', () => {
    FIXTURES.forEach(({ str, hours, minutes, meridiem }) => {
        it(`should parse "${str}" correctly`, () => {
            expect(stringValueToParts(str)).toEqual({ hours, minutes, meridiem, str });
        });

        it(`should unParse "${JSON.stringify({ hours, minutes, meridiem })}" correctly`, () => {
            expect(partsToStringValue(hours, minutes, meridiem)).toEqual(str);
        });
    });
});
