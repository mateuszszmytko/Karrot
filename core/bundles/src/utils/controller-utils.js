"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-any */
var ControllerUtils = /** @class */ (function () {
    function ControllerUtils() {
    }
    ControllerUtils.getControllerId = function () {
        ControllerUtils._currentControllerId++;
        return 'k_' + ControllerUtils._currentControllerId;
    };
    ControllerUtils.getControllerMeta = function (target) {
        if (!target.prototype || !target.prototype.constructor) {
            target = Object.getPrototypeOf(target).constructor;
        }
        var meta = {};
        for (var _i = 0, _a = Reflect.getMetadataKeys(target); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key.indexOf('Controller:') !== 0) {
                continue;
            }
            var truncKey = key.replace('Controller:', '');
            var metaValue = Reflect.getMetadata(key, target);
            meta[truncKey] = metaValue;
        }
        return meta;
    };
    ControllerUtils._currentControllerId = 0;
    ControllerUtils._conntrollers = [];
    return ControllerUtils;
}());
exports.ControllerUtils = ControllerUtils;
//# sourceMappingURL=controller-utils.js.map