"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var to_camel_case_1 = require("./to-camel-case");
describe('toCamelCase function', function () {
    it('"simple-text" to "simpleText', function () {
        expect(to_camel_case_1.toCamelCase('simple-text')).toBe('simpleText');
    });
    it('"longer-simple-text" to "longerSimpleText', function () {
        expect(to_camel_case_1.toCamelCase('longer-simple-text')).toBe('longerSimpleText');
    });
    it('"longer Simple text" to "longerSimpleText', function () {
        expect(to_camel_case_1.toCamelCase('longer Simple text')).toBe('longerSimpleText');
    });
    it('"longer_simple_text" to "longerSimpleText', function () {
        expect(to_camel_case_1.toCamelCase('longer_simple_text')).toBe('longerSimpleText');
    });
});
//# sourceMappingURL=to-camel-case.spec.js.map