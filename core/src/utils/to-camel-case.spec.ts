import { toCamelCase } from "./to-camel-case";

describe('toCamelCase function', () => {
	it('"simple-text" to "simpleText', () => {
        expect(toCamelCase('simple-text')).toBe('simpleText');
    });

    it('"longer-simple-text" to "longerSimpleText', () => {
        expect(toCamelCase('longer-simple-text')).toBe('longerSimpleText');
    });

    it('"longer Simple text" to "longerSimpleText', () => {
        expect(toCamelCase('longer Simple text')).toBe('longerSimpleText');
    });

    it('"longer_simple_text" to "longerSimpleText', () => {
        expect(toCamelCase('longer_simple_text')).toBe('longerSimpleText');
    });

});
