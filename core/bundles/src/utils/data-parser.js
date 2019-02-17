"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataParser = /** @class */ (function () {
    function DataParser() {
    }
    DataParser.parse = function (element) {
        var settings = {};
        var dataSettings = element.dataset;
        for (var key in dataSettings) {
            if (!key || !dataSettings.hasOwnProperty(key)) {
                continue;
            }
            var value = dataSettings[key];
            if (!value) {
                continue;
            }
            // trying to parse array-line strings
            // like "item1; item2" or "item1: value1; item2: value2"
            if (value.indexOf(';') > 0 && !settings.skipArrayParsing) {
                var valueArr = value.replace(/\;+\s+/g, ';').split(';');
                var newVal = value;
                var isObject = false;
                for (var _i = 0, valueArr_1 = valueArr; _i < valueArr_1.length; _i++) {
                    var valueChild = valueArr_1[_i];
                    if (valueChild.indexOf(':') > 0) {
                        isObject = true;
                        break;
                    }
                }
                newVal = isObject ? '{' : '[';
                for (var _a = 0, valueArr_2 = valueArr; _a < valueArr_2.length; _a++) {
                    var valueChild = valueArr_2[_a];
                    if (valueChild === '') {
                        continue;
                    }
                    if (isObject) {
                        var valueChildArr = valueChild.replace(/\:+\s+/g, ':').split(':');
                        newVal += "\"" + valueChildArr[0] + "\": ";
                        try {
                            JSON.parse(valueChildArr[1] || valueChildArr[0]);
                            newVal += valueChildArr[1] + ',';
                        }
                        catch (e) {
                            newVal += "\"" + (valueChildArr[1] || valueChildArr[0]) + "\",";
                        }
                        //
                    }
                    else {
                        try {
                            JSON.parse(valueChild);
                            newVal += valueChild + ',';
                        }
                        catch (e) {
                            newVal += "\"" + valueChild + "\",";
                        }
                    }
                }
                newVal = newVal.substr(0, newVal.length - 1);
                newVal += isObject ? '}' : ']';
                value = newVal;
            }
            try {
                var val = value
                    .replace(/\'/g, "\"");
                if (!val) {
                    throw new Error();
                }
                value = JSON.parse(val);
            }
            catch (e) {
                //
            }
            settings[key] = value;
        }
        return settings;
    };
    return DataParser;
}());
exports.DataParser = DataParser;
//# sourceMappingURL=data-parser.js.map