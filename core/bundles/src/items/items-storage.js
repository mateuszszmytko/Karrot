"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var to_camel_case_1 = require("../utils/to-camel-case");
var karrot_item_1 = require("../karrot-item");
var ItemsStorage = /** @class */ (function () {
    function ItemsStorage() {
        this._items = [];
    }
    Object.defineProperty(ItemsStorage.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    ItemsStorage.prototype.init = function () {
        this.parse();
    };
    ItemsStorage.prototype.getItemsByName = function (name, context) {
        var items = this.items.filter(function (item) { return item.names.indexOf(name) > -1; });
        if (context) {
            items = items.filter(function (i) { return context.contains(i.element); });
        }
        return items;
    };
    ItemsStorage.prototype.getItemsByContext = function (context) {
        var items = this.items.filter(function (i) { return context.contains(i.element); });
        return items;
    };
    ItemsStorage.prototype.getItemByElement = function (element) {
        return this.items.find(function (item) { return item.element === element; });
    };
    ItemsStorage.prototype.parse = function (clear, context) {
        var _a;
        if (clear === void 0) { clear = true; }
        if (context === void 0) { context = document; }
        if (clear) {
            this._items = [];
        }
        var elements = Array.from(context.querySelectorAll('[k-item]'));
        if (context !== document) {
            elements.push(context);
        }
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            if (this.getItemByElement(element)) {
                continue;
            }
            var kNameValue = element.getAttribute('k-item');
            var kNames = kNameValue.replace(/\s+/g, '').split(';');
            for (var _b = 0, _c = kNames.slice(); _b < _c.length; _b++) {
                var kName = _c[_b];
                var camelKName = to_camel_case_1.toCamelCase(kName);
                if (kName !== camelKName) {
                    kNames.push(camelKName);
                }
            }
            var karrotInstance = new karrot_item_1.KarrotItem(element);
            (_a = karrotInstance.names).push.apply(_a, kNames);
            this.items.push(karrotInstance);
        }
    };
    return ItemsStorage;
}());
exports.ItemsStorage = ItemsStorage;
//# sourceMappingURL=items-storage.js.map