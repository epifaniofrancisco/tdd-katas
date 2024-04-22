import { describe, expect, test } from 'vitest';
import { add } from '.';

describe('string calculator', () => {
    const result = (stringNumber: string) => {
        return add(stringNumber);
    };

    test('should return 0 for an empty string', () => {
        const stringNumber = '';

        expect(result(stringNumber)).toBe(0);
    });

    test('should return the number if a single number is passed', () => {
        const stringNumber = '3';

        expect(result(stringNumber)).toBe(3);
    });

    test('should return the sum of two numbers', () => {
        const stringNumber = '1,2';

        expect(result(stringNumber)).toBe(3);
    });

    test('should return the sum of all numbers in string', () => {
        const stringNumber = '1,2,3,4,5';

        expect(result(stringNumber)).toBe(15);
    });

    test('should return the sum of numbers separated by "\n" or ","', () => {
        const stringNumber = '1\n2,3';

        expect(result(stringNumber)).toBe(6);
    });

    test('should return an exception for duplicate delimiter', () => {
        const stringNumber = '1\n,';

        expect(result(stringNumber)).toThrowError;
    });

    test('should return the sum of numbers with a new delimiter', () => {
        const stringNumber = '//;\n1;2';

        expect(result(stringNumber)).toBe(3);
    });
});
