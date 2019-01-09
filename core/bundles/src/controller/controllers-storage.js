"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControllersStorage = /** @class */ (function () {
    function ControllersStorage(_controllersConstructors) {
        this._controllersConstructors = _controllersConstructors;
        this._controllers = [];
        //
    }
    Object.defineProperty(ControllersStorage.prototype, "controllers", {
        get: function () {
            return this._controllers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllersStorage.prototype, "controllersConstructors", {
        get: function () {
            return this._controllersConstructors;
        },
        enumerable: true,
        configurable: true
    });
    return ControllersStorage;
}());
exports.ControllersStorage = ControllersStorage;
//# sourceMappingURL=controllers-storage.js.map