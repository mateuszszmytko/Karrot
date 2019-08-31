"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Addon = /** @class */ (function () {
    function Addon() {
    }
    Addon.prototype.appendSettings = function (settings) {
        this.settings = Object.assign({}, settings, this.settings);
        return this.settings;
    };
    Addon.prototype.kOnInit = function (capsule) {
        this.element = capsule.element;
        this.hooks = capsule.hooks;
        this.settings = capsule.settings;
    };
    return Addon;
}());
exports.Addon = Addon;
//# sourceMappingURL=addon.js.map