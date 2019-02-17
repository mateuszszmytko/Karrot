"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_parser_1 = require("../utils/data-parser");
var hooks_1 = require("./hooks");
// tslint:disable-next-line
var KarrotController = /** @class */ (function () {
    function KarrotController(element) {
        this.element = element;
        this.hooks = new hooks_1.Hooks();
        this._settings = {};
        this.parseSettings();
    }
    Object.defineProperty(KarrotController.prototype, "settings", {
        get: function () {
            return this._settings;
        },
        set: function (val) {
            this._settings = Object.assign(this._settings, val);
        },
        enumerable: true,
        configurable: true
    });
    KarrotController.prototype.addAction = function (actionName, action, index) {
        if (index === void 0) { index = 100; }
        this.hooks.addAction(actionName, action, index);
    };
    KarrotController.prototype.addFilter = function (filterName, filter, index) {
        if (index === void 0) { index = 100; }
        this.hooks.addFilter(filterName, filter, index);
    };
    KarrotController.prototype.parseSettings = function () {
        this.settings = data_parser_1.DataParser.parse(this.element);
    };
    return KarrotController;
}());
exports.KarrotController = KarrotController;
/*
1. settings (from element) done
2. hooks (with proteced methods)
*/
//# sourceMappingURL=controller.js.map