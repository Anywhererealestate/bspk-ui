/* eslint-disable @cspell/spellchecker */
import { kebabCase, titleCase, camelCase } from './utils';

describe('kebabCase', () => {
    const testCases = [
        {
            input: 'OTPInput',
            expected: 'otp-input',
        },
        {
            input: 'CallToActionButton',
            expected: 'call-to-action-button',
        },
        { input: 'hello world', expected: 'hello-world' },
        { input: 'Hello World', expected: 'hello-world' },
        { input: 'helloWorld', expected: 'hello-world' },
        { input: 'HelloWorld', expected: 'hello-world' },
        { input: 'hello_world', expected: 'hello-world' },
        { input: 'Hello_World', expected: 'hello-world' },
        { input: 'hello-world', expected: 'hello-world' },
        { input: 'Hello-World', expected: 'hello-world' },
        { input: 'co-operate', expected: 'co-operate' },
        { input: "O'Neill", expected: 'o-neill' },
        { input: 'naïve', expected: 'naive' },
        { input: 'résumé', expected: 'resume' },
        { input: 'crème brûlée', expected: 'creme-brulee' },
        { input: 'fiancé(e)', expected: 'fiancee' },
        { input: 'Smith-Jones', expected: 'smith-jones' },
        { input: 'rock&roll', expected: 'rockroll' },
        { input: 'AT&T', expected: 'att' },
        { input: 'e-mail', expected: 'e-mail' },
        { input: '123abc', expected: '123abc' },
        { input: 'foo_bar-baz', expected: 'foo-bar-baz' },
        { input: 'multi_word-string', expected: 'multi-word-string' },
        { input: 'non-standard.characters!', expected: 'non-standard-characters' },
        { input: 'spaces  and  tabs', expected: 'spaces-and-tabs' },
    ];

    for (const { input, expected } of testCases) {
        it(`should convert "${input}" to "${expected}"`, () => {
            expect(kebabCase(input)).toBe(expected);
        });
    }
});

describe('titleCase', () => {
    it('should convert a string to Title Case', () => {
        expect(titleCase('hello world')).toBe('Hello World');
    });

    it('should handle empty strings', () => {
        expect(titleCase('')).toBe('');
    });
});

describe('camelCase', () => {
    const testCases = [
        { input: 'hello world', expected: 'HelloWorld', lowerFirst: false },
        { input: 'Hello World', expected: 'HelloWorld', lowerFirst: false },
        { input: 'hello_world', expected: 'HelloWorld', lowerFirst: false },
        { input: 'Hello_World', expected: 'HelloWorld', lowerFirst: false },
        { input: 'hello-world', expected: 'HelloWorld', lowerFirst: false },
        { input: 'Hello-World', expected: 'HelloWorld', lowerFirst: false },
        { input: 'hello world', expected: 'helloWorld', lowerFirst: true },
        { input: 'Hello World', expected: 'helloWorld', lowerFirst: true },
        { input: 'hello_world', expected: 'helloWorld', lowerFirst: true },
        { input: 'Hello_World', expected: 'helloWorld', lowerFirst: true },
        { input: 'hello-world', expected: 'helloWorld', lowerFirst: true },
        { input: 'Hello-World', expected: 'helloWorld', lowerFirst: true },
    ];

    for (const { input, expected, lowerFirst } of testCases) {
        it(`should convert "${input}" to "${expected}" with lowerFirst=${lowerFirst}`, () => {
            expect(camelCase(input, lowerFirst)).toBe(expected);
        });
    }
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */