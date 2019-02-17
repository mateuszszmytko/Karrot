"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var items_storage_1 = require("./items/items-storage");
var karrot_1 = require("./karrot");
// tslint:disable:no-any
var KarrotImp = /** @class */ (function () {
    function KarrotImp() {
        this._itemsStorage = new items_storage_1.ItemsStorage();
    }
    Object.defineProperty(KarrotImp.prototype, "storage", {
        get: function () {
            return this._itemsStorage;
        },
        enumerable: true,
        configurable: true
    });
    KarrotImp.prototype.onInit = function () {
        this._itemsStorage.init();
    };
    KarrotImp.prototype.attach = function (name) {
        var attachments = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            attachments[_i - 1] = arguments[_i];
        }
        var items = this.getMany(name);
        for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
            var item = items_1[_a];
            item.attach.apply(item, attachments);
        }
    };
    KarrotImp.prototype.getMany = function (name) {
        var typeOrContexts = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            typeOrContexts[_i - 1] = arguments[_i];
        }
        var items = [];
        var type = karrot_1.Karrot;
        var context;
        for (var _a = 0, typeOrContexts_1 = typeOrContexts; _a < typeOrContexts_1.length; _a++) {
            var typeOrContext = typeOrContexts_1[_a];
            if (typeof typeOrContext === 'function') {
                type = typeOrContext;
            }
            if (typeOrContext instanceof HTMLElement) {
                context = typeOrContext;
            }
        }
        if (name instanceof HTMLElement) {
            var item = this.storage.getItemByElement(name);
            if (item) {
                items.push(item);
            }
        }
        else {
            items = this.storage.getItemsByName(name, context);
        }
        var returnVal = [];
        if (type === karrot_1.Karrot) {
            returnVal.push.apply(returnVal, items);
        }
        else if (type === HTMLElement) {
            // tslint:disable-next-line:no-any
            returnVal.push.apply(returnVal, items.map(function (i) { return i.element; }));
        }
        else {
            var attachments = [];
            for (var _b = 0, items_2 = items; _b < items_2.length; _b++) {
                var item = items_2[_b];
                attachments.push.apply(attachments, item.attachments);
            }
            for (var _c = 0, attachments_1 = attachments; _c < attachments_1.length; _c++) {
                var attach = attachments_1[_c];
                if (attach instanceof type) {
                    returnVal.push(attach);
                }
            }
        }
        return returnVal;
    };
    KarrotImp.prototype.get = function (name) {
        var typeOrContexts = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            typeOrContexts[_i - 1] = arguments[_i];
        }
        var get = this.getMany.apply(this, [name].concat(typeOrContexts));
        return get && get.length > 0 ? get[0] : undefined;
    };
    return KarrotImp;
}());
exports.KarrotImp = KarrotImp;
//# sourceMappingURL=karrot-imp.js.map