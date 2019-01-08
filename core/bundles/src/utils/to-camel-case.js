"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toCamelCase(text) {
    return text.replace(/([\-|\_|\s]\w)/g, function (matches) {
        return matches[1].toUpperCase();
    });
}
exports.toCamelCase = toCamelCase;
//# sourceMappingURL=to-camel-case.js.map