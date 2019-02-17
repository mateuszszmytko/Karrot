"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemsManager = /** @class */ (function () {
    function ItemsManager(_storage) {
        this._storage = _storage;
    }
    // tslint:disable-next-line:no-any
    ItemsManager.prototype.get = function (name, type, context) {
        var items = [];
        if (name instanceof HTMLElement) {
            var nItem = this._storage.getItemByElement(name);
            if (!nItem) {
                return [];
            }
            items = [nItem];
        }
        else {
            items = this._storage.getItemsByName(name, context);
        }
        var returnVal = [];
        // tslint:disable-next-line:no-any
        if (type === HTMLElement) {
            // tslint:disable-next-line:no-any
            returnVal.push.apply(returnVal, items.map(function (i) { return i.element; }));
        }
        else {
            var attachs = [];
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                attachs.push.apply(attachs, item.attached);
            }
            for (var _a = 0, attachs_1 = attachs; _a < attachs_1.length; _a++) {
                var attach = attachs_1[_a];
                if (attach instanceof type) {
                    returnVal.push(attach);
                }
            }
        }
        return returnVal;
    };
    ItemsManager.prototype.attach = function (name) {
        var attached = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            attached[_i - 1] = arguments[_i];
        }
        var items = this._storage.getItemsByName(name);
        for (var _a = 0, attached_1 = attached; _a < attached_1.length; _a++) {
            var attach = attached_1[_a];
            for (var _b = 0, items_2 = items; _b < items_2.length; _b++) {
                var item = items_2[_b];
                // tslint:disable-next-line:no-any
                var instance = (new attach(item.element));
                if (instance.kOnInit && typeof instance.kOnInit === 'function') {
                    instance.kOnInit();
                }
                item.attached.push(instance);
            }
        }
    };
    return ItemsManager;
}());
exports.ItemsManager = ItemsManager;
//# sourceMappingURL=items-manager.js.map