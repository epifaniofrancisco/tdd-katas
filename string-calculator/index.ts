const DEFAULT_DELIMITER = ',';
const CUSTOM_DELIMITER_REGEX = /^\/\/(.+)\n/;
const INVALID_INPUT_ERROR_MESSAGE = 'Invalid input detected';

export function add(input: string): number | Error {
    if (input.length === 0) {
        return 0;
    }

    try {
        const numbers = extractNumbers(input);
        return sumNumbers(numbers);
    } catch (error) {
        if (error instanceof InputError) {
            throw new Error(INVALID_INPUT_ERROR_MESSAGE);
        } else {
            throw error;
        }
    }
}

function extractNumbers(input: string): number[] {
    const delimiterMatch = RegExp(CUSTOM_DELIMITER_REGEX).exec(input);
    let delimiter = DEFAULT_DELIMITER;

    if (delimiterMatch) {
        delimiter = delimiterMatch[1];
        input = input.slice(delimiterMatch[0].length);
    }

    const numberStrings = parseNumberStrings(input, delimiter);
    return convertStringsToNumbers(numberStrings);
}

function parseNumberStrings(input: string, delimiter: string): string[] {
    const escapedDelimiter = escapeRegExp(delimiter);
    const regex = new RegExp(
        `(?:^|[^\\\\])((?:\\\\${escapedDelimiter})*)\\\\[${delimiter}\\n]+`
    );
    if (regex.test(input)) {
        throw new InputError();
    }
    return input.split(new RegExp(`[${delimiter}\\n]+`));
}

function convertStringsToNumbers(strings: string[]): number[] {
    return strings.map((str) => {
        const number = Number(str.trim());
        if (isNaN(number)) {
            throw new Error('Invalid number detected');
        }
        return number;
    });
}

function sumNumbers(numbers: number[]): number {
    return numbers.reduce((sum, number) => sum + number, 0);
}

function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class InputError extends Error {}
