"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControllerLifecycle = /** @class */ (function () {
    function ControllerLifecycle(_controller) {
        this._controller = _controller;
    }
    ControllerLifecycle.prototype.execute = function (event) {
        if (typeof this._controller[event] === "function") {
            this._controller[event]();
        }
    };
    return ControllerLifecycle;
}());
exports.ControllerLifecycle = ControllerLifecycle;
//# sourceMappingURL=controller-lifecycle.js.map